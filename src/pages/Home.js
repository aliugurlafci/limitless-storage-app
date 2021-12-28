import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { FileDownloaderStyles as styles, platform } from '../Styles';
import { FileManager } from '../file-system/FileManager';
import { EntryRejected } from '../file-system/index';
import * as Autentication from 'expo-local-authentication';
import RNExitApp from 'react-native-exit-app';

export const Home = ({ uuid }) => {

  const [isAutenticated, setIsAutenticated] = useState(false);


  const exitApplication = () => {
    if (platform) {
      BackHandler.exitApp();
    }
    else {
      RNExitApp.exitApp();
    }
  }
  const hasHardware = async () => {
    try {
      const hardware = await Autentication.hasHardwareAsync();
      if (hardware) {
        if (platform) {
          const response = await Autentication.authenticateAsync({ promptMessage: "Finger", cancelLabel: 'Cancel', disableDeviceFallback: false });
          if (response.success) {
            setIsAutenticated(true);
          }
          else {
            exitApplication();
          }
        }
        else {
          const response = await Autentication.authenticateAsync({ promptMessage: "Finger", fallbackLabel: 'Use Password', cancelLabel: 'Cancel', disableDeviceFallback: false });
          if (response.success) {
            setIsAutenticated(true);
          }
          else {
            exitApplication();
          }
        }
      }
      else {
        alert("Not supported.Use app security instead.");
      }
    }
    catch { }
  }
  useEffect(() => {
    console.log(uuid);
    /*if (uuid.register) {
      alert("You have succesfull");
    }
    else {
      alert("You have error");
    }*/
  }, []);
  if (isAutenticated) {
    return (
      <View style={styles.container}>
        <FileManager />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <EntryRejected tryAgain={hasHardware} />
      </View>
    );
  }
};


/*

const [path,setPath] = useState("");
    const [arr,setArr] = useState([])
    const start=async()=>{

        const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            console.log(progress)
          };

        const downloadResumable = FileSystems.createDownloadResumable(
            "https://i.ytimg.com/vi/J68tZ3Du7uY/maxresdefault.jpg",
            FileSystem.documentDirectory + "temporary-file",
            {},
            callback
          );
          try {
            const { uri } = await downloadResumable.downloadAsync().then((item) => {
              return item;
            });
            setPath(uri)
            arrayCheck(arr,uri)
          } catch (e) {
            console.error(e);
          }
    }
    const arrayCheck=(array,obj)=>{
        const arrayList = [...array];
        if(arrayList.length > 0){
            if(!arrayList.includes(obj)){
                setArr([...arrayList,obj]);
            }
        }
        else{
            setArr([...arrayList,obj]);
        }
    }
    useEffect(()=>{
        console.log(arr);
    },[arr])
    useEffect(()=>{
        start()
    },[])



    <CircularProgress
  value={85}
  inActiveStrokeColor={'#2ecc71'}
  inActiveStrokeOpacity={0.2}
  textColor={'#fff'}
  valueSuffix={'%'}
/>
*/