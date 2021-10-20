import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, RefreshControl, TouchableOpacity } from 'react-native';
import * as FileSystems from 'expo-file-system';
import { Overlay, Button } from 'react-native-elements';
import { Icon } from 'galio-framework';
import { MiniFileModal as styles, FileDownloaderStyles as styless, theme, width } from '../../Styles';

export const MiniFileModal = ({
    showModal,
    setShowModal,
    setDestination,
    sortArray
}) => {
    const rootPath = FileSystems.documentDirectory + "secure_files/";
    const [path, setPath] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState({ index: -1, value: '' });
    const countPerRow = Math.floor((width * 0.8) / 60);

    const handleSelection = (index, paths) => {
        if (selectedFile === index) {
            if (paths !== 'Go back') {
                setPath([...path, path[path.length - 1] + "//" + paths])
                setSelectedFile({ index: index, value: paths });
            }
        }
        else {
            if (paths !== "Go back") {
                setPath([...path, path[path.length - 1] + "//" + paths])
                setSelectedFile({ index: index, value: paths });
            }
        }
    }
    const handleCopy = async (action) => {
        if (action === 0) {
            setShowModal({ miniFileModal: false, nameModal: false, renameModal: 'false' });
        }
        else {
            setDestination({ name: '', destination: path[path.length - 1], rename: '' });
            setShowModal({ miniFileModal: false, nameModal: false });
        }
    }
    const loadFiles = async () => {
        const target = path[path.length - 1];
        const fileArray = await FileSystems.readDirectoryAsync(target);
        if (target === rootPath) {
            setFiles(sortArray(fileArray));
            setSelectedFile({ index: -1, value: '' });
        }
        else {
            setFiles(["Go back", ...sortArray(fileArray)]);
            setSelectedFile({ index: -1, value: '' });
        }
    }
    const goBack = () => {
        setPath(path.filter(item => item !== path[path.length - 1]));
    }
    const renderItem = ({ item }) => {
        const index = files.indexOf(item);
        return (
            <View style={[styless.folderListItem, { width: (width * 0.9) / countPerRow, marginRight: -countPerRow / 2 }, selectedFile === index ? styless.selectedListItem : null]} key={"object-" + index}>
                <TouchableOpacity style={{ alignItems: "center" }} activeOpacity={1} onPress={() => item === "Go back" ? goBack() : handleSelection(index, item)}>
                    <Icon
                        name={item === "Go back" ? "arrowleft" : "folder1"}
                        family="AntDesign"
                        size={35}
                        color={selectedFile === index ? theme.folderOutlineSelected : theme.folderOutline}
                    />
                    <Text style={[styless.folderDescriptionText, { color: selectedFile === index ? theme.folderOutlineSelected : theme.folderOutline }]}>{item}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    useEffect(() => {
        path.push(rootPath);
    }, []);
    useEffect(() => {
        loadFiles();
    }, [path])

    return (
        <Overlay
            onBackdropPress={() => setShowModal({ miniFileModal: !showModal, nameModal: false, renameModal: false })}
            visible={showModal}
            overlayStyle={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Choose destination</Text>
                </View>
                <View style={styles.body}>
                    <FlatList
                        key="mini-flat-file-list"
                        keyExtractor={item => "item-" + item}
                        data={files}
                        extraData={files}
                        renderItem={renderItem}
                        numColumns={countPerRow}
                        contentContainerStyle={styles.flatList}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={() => handleCopy(0)}
                        title="Cancel"
                        activeOpacity={0.6}
                        buttonStyle={[styles.button, { backgroundColor: theme.error }]}
                    />
                    <Button
                        onPress={() => handleCopy(1)}
                        title="Copy"
                        activeOpacity={0.6}
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        </Overlay>
    );
}
