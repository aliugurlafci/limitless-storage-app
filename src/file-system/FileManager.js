import React, { useState, useEffect, useReducer } from "react";
import { View, Alert } from "react-native";
import { FileDownloaderStyles as styles, height } from "../Styles";
import { Navbar, LeftActionBar, FileList, Popover, RenameModal, MiniFileModal, SettingsModal } from './index';
import * as FileSystems from 'expo-file-system';
import * as Permissions from 'expo-media-library';
import CircularProgress from "react-native-circular-progress-indicator";

export function FileManager() {
  const [permissionState, setPermissionState] = useState(false);
  const [popover, setPopover] = useState({ show: false, icon: '', message: '' });
  const [config, setConfig] = useState({ multiselect: false, view: 'single' });
  const [fileExplorer, setFileExplorer] = useState([]);
  const [refreshFileList, setRefreshFileList] = useState(false);
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState(" >> ");
  const [disabledProp, setDisabledProp] = useState({ disabled: true })
  const [fileArray, setFileArray] = useState([]);
  const [fileInfoArray, setFileInfoArray] = useState([]);
  const [showModal, setShowModal] = useState({ nameModal: false, miniFileModal: false, renameModal: false, settingModal: false });
  const [toasthower, setToastShower] = useState(false);
  const [folderConfig, setFolderConfig] = useState({ name: '', destination: '' });

  const rootPath = FileSystems.documentDirectory + "secure_files/";

  const selectedFile = (selectedIndex, selectedFilePth) => {
    if (config.multiselect) {
      onMultipleCheck(selectedIndex, selectedFilePth);
    }
    else {
      onSingleCheck(selectedIndex, selectedFilePth);
    }
  };
  const onMultipleCheck = (selectedIndex, selectedFilePth) => {
    if (selectedIndex === -1) {
      setSelectedFilePath(" >>");
      setSelectedFileList([]);
    }
    else {
      if (!selectedFileList.includes(selectedIndex)) {
        setSelectedFileList(arrayCheck(selectedFileList, selectedIndex));
        setSelectedFilePath(fileExplorer[fileExplorer.length - 1] + "//" + selectedFilePth);
      }
    }
  }
  const onSingleCheck = (selectedIndex, selectedFilePth) => {
    if (!selectedFileList.includes(selectedIndex)) {
      setSelectedFilePath(fileExplorer[fileExplorer.length - 1] + "//" + selectedFilePth);
      setSelectedFileList([selectedIndex]);
    }
    else {
      let destinationPath = fileExplorer[fileExplorer.length - 1] + "//" + selectedFilePth;
      setSelectedFileList([]);
      setFileArray([]);
      loadFileArray(destinationPath);
      fileExplorer.push(destinationPath.replace("Go back", ""));
    }
  }
  const formatText = (number, text) => { // All the formatted text cames here to render again
    switch (number) {
      case 1: //Long path strings turning into smaller part
        return text.length > 25 ? text.substring(0, 18) + "..." + text.substring(text.length - 19, text.length) : text
    }
  }
  const rootConstructor = async () => {
    fileExplorer.includes(rootPath) ? null : fileExplorer.push(rootPath);
    const response = await FileSystems.getInfoAsync(rootPath);

    if (!response.exists) {
      FileSystems.makeDirectoryAsync(rootPath, { intermediates: true });
    }
  }
  const getFilesInfo = () => {
    fileArray.map((value, index) => {
      if (value !== "Go back") {
        FileSystems.getInfoAsync(fileExplorer[fileExplorer.length - 1] + "//" + fileArray[index]).then(response => {
          fileInfoArray.push(response);
        });
      }
    });
  }
  const loadFileArray = async (root) => {
    try {
      if (!permissionState) {
        const result = await Permissions.requestPermissionsAsync()
        if (result.granted) {
          setPermissionState(true);
          if (root === rootPath) {
            let list = await FileSystems.readDirectoryAsync(rootPath);
            setFileArray(list);
          }
          else {
            let list = await FileSystems.readDirectoryAsync(root);
            setFileArray(["Go back", ...sortArray(list)]);
          }
        }
      }
      else {
        if (root === rootPath) {
          let list = await FileSystems.readDirectoryAsync(root);
          setFileArray(sortArray(list));
        }
        else {
          let list = await FileSystems.readDirectoryAsync(root);
          setFileArray(["Go back", ...sortArray(list)]);
        }
      }
    }
    catch (ex) { }
  }
  const sortArray = (array) => {
    const sorted = array.sort((a, b) => a.localeCompare(b));
    return sorted;
  }
  const goBackHandler = () => {
    const target = fileExplorer[fileExplorer.length - 1];
    if (fileExplorer.length > 1) {
      setFileExplorer(fileExplorer.filter(item => item != target));
      loadFileArray(fileExplorer[fileExplorer.length - 2]);
      setSelectedFilePath(fileExplorer[fileExplorer.length - 2]);
      setSelectedFileList([]);
    }
  }
  const arrayCheck = (array, obj) => {
    const arrayList = [...array];
    if (arrayList.length > 0) {
      if (!arrayList.includes(obj)) {
        arrayList.push(obj);
        return arrayList
      }
    } else {
      arrayList.push(obj);
      return arrayList
    }
  };
  const leftMenuClickHandler = (index) => {
    switch (index) {
      case 0: { setShowModal({ nameModal: !showModal.nameModal, miniFileModal: false, renameModal: false, settingModal: false }); } break;
      case 1: { alert("1") } break;
      case 2: {
        setShowModal({ nameModal: false, miniFileModal: false, renameModal: true, settingModal: false });
      } break;
      case 3: {
        setShowModal({ nameModal: showModal.nameModal, miniFileModal: !showModal.miniFileModal, renameModal: false, settingModal: false })
      } break;
      case 4: {
        if (selectedFileList.length > 0) {
          Alert.alert(
            "User Check",
            "Bu dosya/dosyaları silmek istediğinize emin misini?",
            [
              {
                text: "Don't delete",
                style: 'default',
                onPress: () => setSelectedFileList([])
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteSelectedFile(true)
              },
            ]
          )
        }
        else {
          setPopover({ show: true, icon: 'warning', message: 'Please choose file/files .' })
        }
      } break;
      case 5: { alert("5") } break;
      case 6: {
        setShowModal({ nameModal: false, miniFileModal: false, renameModal: false, settingModal: true });
      } break;
      case 7: { alert("7") } break;
      case 8: { alert("8") } break;
    }
  };
  const createFolderHandleSumbit = (showInformation) => {
    let fullPath = fileExplorer[fileExplorer.length - 1] + "//" + folderConfig.name;
    FileSystems.getInfoAsync(fullPath)
      .then((response) => {
        if (!response.exists) {
          FileSystems.makeDirectoryAsync(fullPath, { intermediates: false }).then((response) => {
            if (showInformation) {
              setPopover({ show: true, icon: 'success', message: 'Dosya başarıyla oluşturuldu.' })
            }
            setShowModal({ nameModal: false, miniFileModal: false, renameModal: false });
            setFileArray([...sortArray(fileArray), folderConfig.name])
            setFolderConfig({ name: '', destination: '' });
          }).catch();
        }
        else {
          setShowModal({ nameModal: false, miniFileModal: false, renameModal: false });
          if (showInformation) {
            setPopover({ show: true, icon: 'success', message: 'Dosya zaten hedefte mevcut.' })
          }
        }
      })
      .catch((ex) => showInformation ? setPopover({ show: true, icon: 'error', message: 'Dosya oluşturulamadı.' + ex }) : null);
  }
  const deleteSelectedFile = (showInformation) => {
    let root = fileExplorer[fileExplorer.length - 1];
    if (selectedFileList.length > 1) {
      selectedFileList.map(val => {
        let path = root + "//" + fileArray[val];
        FileSystems.deleteAsync(path, true)
          .then(() => {
            if (showInformation) {
              setPopover({ show: true, icon: 'success', message: 'Dosyalar başarıyle silindi' })
            }
            setFileArray(fileArray.filter(i => path !== i));
          })
          .catch(() => showInformation ? setPopover({ show: true, icon: 'error', message: 'Dosyalar silinemedi.Lütfen tekrar deneyiniz.' }) : null)
      })
      loadFileArray(root);
    }
    else {
      FileSystems.deleteAsync(selectedFilePath, false)
        .then(() => {
          if (showInformation) {
            setPopover({ show: true, icon: 'success', message: 'Dosya başarıyle silindi' })
          }
          setFileArray(fileArray.filter(i => root + "//" + i !== selectedFilePath));
        })
        .catch()
    }
  }
  const copyFile = () => {
    try {
      if (selectedFileList.length > 1) {
        selectedFileList.map(index => {
          let root = fileExplorer[fileExplorer.length - 1] + "//" + fileArray[index];
          let target = folderConfig.destination + "//" + fileArray[index]; 7

          FileSystems.moveAsync({ from: root, to: target }).then(() => {
            if (index === selectedFileList.length - 1) {
              loadFileArray(rootPath);
              setPopover({ show: true, icon: 'success', message: 'Folders successfully copied.' });
            }
          }).catch(ex => console.log(ex));
        });
      }
      else {
        let root = fileExplorer[fileExplorer.length - 1] + "//" + fileArray[selectedFileList[0]];
        let target = folderConfig.destination + "//" + fileArray[selectedFileList[0]];
        FileSystems.moveAsync({ from: root, to: target }).then(() => {
          loadFileArray(rootPath);
          setPopover({ show: true, icon: 'success', message: 'Folder successfully copied.' });
        }).catch(ex => console.log(ex));
      }
    }
    catch (ex) {
      console.log(ex);
    }
  }
  const renameFile = () => {
    let root = fileExplorer[fileExplorer.length - 1] + "//" + fileArray[selectedFileList[0]];
    let target = fileExplorer[fileExplorer.length - 1] + "//" + folderConfig.name;
    FileSystems.moveAsync({ from: root, to: target }).then(() => {
      loadFileArray(rootPath);
      setPopover({ show: true, icon: 'success', message: 'Folder successfully renamed.' });
    }).catch(ex => console.log(ex));
  }
  useEffect(() => {
    rootConstructor();
    loadFileArray(rootPath);
  }, []);
  useEffect(() => {
    getFilesInfo();
  }, [fileArray]);
  useEffect(() => {
    if (refreshFileList) {
      loadFileArray(fileExplorer[fileExplorer.length - 1]);
      getFilesInfo();
      setTimeout(() =>
        setRefreshFileList(!refreshFileList)
        , 1000);
    }
  }, [refreshFileList])
  useEffect(() => {
    if (toasthower) {
      setTimeout(() => {
        setToastShower(!toasthower);
      }, 1500);
    }
  }, [toasthower])
  useEffect(() => {
    if (!showModal.miniFileModal) {
      setSelectedFileList([]);
    }
  }, [showModal.miniFileModal])
  useEffect(() => {
    if (folderConfig.destination != '') {
      copyFile();
    }
  }, [folderConfig.destination])
  useEffect(() => {
    if (showModal.renameModal) {
      renameFile();
    }
  }, [folderConfig.name])
  return (
    <>
      <Navbar config={config} setConfig={setConfig} setPopover={setPopover} />
      <View style={styles.row}>
        <LeftActionBar disabledProp={disabledProp} leftMenuClickHandler={leftMenuClickHandler} />
        <FileList
          fileArray={fileArray}
          selectedFileList={selectedFileList}
          selectedFile={selectedFile}
          selectedFilePath={selectedFilePath}
          setDisabledProp={setDisabledProp}
          refreshFileList={refreshFileList}
          setRefreshFileList={setRefreshFileList}
          formatText={formatText}
          goBackHandler={goBackHandler}
          fileExplorer={fileExplorer}
          viewMode={config.view}
          filesInfo={fileInfoArray}
        />
      </View>
      {
        popover.show ?
          <Popover
            duration={500}
            from={-100}
            to={height * 0.07}
            show={popover.show}
            setShow={setPopover}
            useNativeDriver={false}
            details={popover}
          /> : null
      }
      {
        showModal.nameModal || showModal.renameModal ?
          <RenameModal
            visible={showModal.nameModal || showModal.renameModal}
            onBackdrop={setShowModal}
            handleSubmit={createFolderHandleSumbit}
            setFolderName={setFolderConfig}
            actionType={showModal.renameModal}
          /> : null
      }
      {
        showModal.miniFileModal ?
          <MiniFileModal
            showModal={showModal.miniFileModal}
            setShowModal={setShowModal}
            setDestination={setFolderConfig}
            sortArray={sortArray}
          /> : null
      }
      {
        showModal.settingModal ?
          <SettingsModal /> : null
      }
    </>
  );
}