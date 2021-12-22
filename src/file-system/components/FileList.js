import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { Icon, Button } from 'galio-framework';
import { Tooltip, Text } from 'react-native-elements';
import * as FileSystems from 'expo-file-system';
import * as MediaLibrry from 'expo-media-library';
import * as ext from '../../global/Extensions';
import { FileDownloaderStyles as styles, width, height, theme } from '../../Styles';

export function FileList({
    selectedFileList,
    selectedFile,
    selectedFilePath,
    setDisabledProp,
    fileArray,
    refreshFileList,
    setRefreshFileList,
    formatText,
    goBackHandler,
    fileExplorer,
    viewMode,
    filesInfo
}) {
    const [tooltipData, setTooltipData] = useState('');
    const animatedBottomValue = useRef(new Animated.Value(0)).current;
    const clearTooltip = useRef(null);
    const fileTooltips = useRef(new Array());
    const countPerRow = Math.floor((width - 50) / 60);

    const show = Animated.timing(animatedBottomValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bounce
    });

    const hide = Animated.timing(animatedBottomValue, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bounce
    });

    const showValue = animatedBottomValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [height, height * 0.75, height]
    })
    const constValue = animatedBottomValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width / 8, width / 8]
    })
    const animatedBtn = {
        transform: [
            { translateY: showValue },
            { translateX: constValue }
        ]
    };
    const onFileSelectedHandler = (index, item) => {
        selectedFile(index, item);
        setDisabledProp({ disabled: false })
        show.start();
    }
    const onFileReset = () => {
        selectedFile(-1, "Delete all files");
        setDisabledProp({ disabled: true })
        hide.start();
    }
    const showDetails = (index) => {
        const response = filesInfo[index];
        setTooltipData(`
             Adı: ${fileArray[index]} 
             Türü:  ${response.isDirectory ? "Klasör" : "Dosya"} 
             Md5:   ${response.md5}
             Tarih: ${response.modificationTime} 
             Boyut: ${response.size}`
        );
        fileTooltips.current[index].toggleTooltip();
    }
    const extensionHandler = (extension) => {
        switch (fileExtension) {
            case '.txt':
                return ext.txtBase64;
            case '.rtf':
                return ext.rftBase64;
            case '.xml':
                return ext.xmlBase64;
            case '.pdf':
                return ext.pdfBase64;
            case '.pptx':
                return ext.pptxBase256;
            case '.js':
                return ext.jsBase64;
            case '.rar':
                return ext.rarBase64;
            case '.zip':
                return ext.rarBase64;
            case '.xlxs':
                return ext.excelBase64;
            case '.docx':
                return ext.docBase64;
            case '.md':
                return ext.txtBase64;
            case '.exe':
                return ext.exeBase64;
            default:
                return ext.unknownFileBase64;
        }
    }
    useEffect(() => {
        if (fileArray.length === 0 || selectedFileList.length === 0) {
            hide.start();
        }
    }, [fileArray]);
    useEffect(() => {
        if (selectedFileList.length === 0) {
            hide.start();
        }
    }, [selectedFileList]);

    const renderFileItems = ({ item }) => {
        const index = fileArray.indexOf(item);

        if (viewMode === 'single') {
            return (
                <View style={[styles.folderListItem, { width: width / countPerRow, marginRight: -countPerRow }, selectedFileList.includes(index) ? styles.selectedListItem : null]} key={"object-" + index}>
                    <Tooltip
                        ref={element => fileTooltips.current.push(element)}
                        popover={<Text style={{ color: theme.white, fontSize: 14, textAlign: 'left', marginLeft: -30, marginTop: -5 }}>{tooltipData}</Text>}
                        backgroundColor={theme.backgroundColor}
                        width={235}
                        height={110}
                        containerStyle={{ margin: 0, padding: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <TouchableOpacity style={{ alignItems: "center" }} activeOpacity={1} onPress={() => item === "Go back" ? goBackHandler() : onFileSelectedHandler(index, item)} onLongPress={() => showDetails(index)}>
                            <Icon
                                name={item === "Go back" ? "arrowleft" : "folder1"}
                                family="AntDesign"
                                size={35}
                                color={selectedFileList.includes(index) ? theme.folderOutlineSelected : theme.folderOutline}
                            />
                            <Text style={[styles.folderDescriptionText, { color: selectedFileList.includes(index) ? theme.folderOutlineSelected : theme.folderOutline }]}>{item}</Text>
                        </TouchableOpacity>
                    </Tooltip>
                </View>
            );
        }
        else {
            return (
                <View style={[styles.folderListed, selectedFileList.includes(index) ? styles.listSelected : null]} key={"object-" + index}>
                    <TouchableOpacity
                        onPress={() => item === "Go back" ? goBackHandler() : onFileSelectedHandler(index, item)}
                        activeOpacity={0.7}>
                        <View style={styles.oriented}>
                            <Icon
                                name={item === "Go back" ? "arrowleft" : "folder1"}
                                family="AntDesign"
                                size={25}
                                color={selectedFileList.includes(index) ? theme.folderOutlineSelected : theme.folderOutline}
                            />
                            <Text style={styles.listText, { width: width / 2, color: selectedFileList.includes(index) ? theme.folderOutlineSelected : theme.folderOutline }}>{item}</Text>
                            <Text style={styles.listText, { color: selectedFileList.includes(index) ? theme.folderOutlineSelected : theme.folderOutline }}>{filesInfo[index].isDirectory ? 'Folder' : 'File'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    return (
        <>
            <View style={styles.body}>
                <View style={styles.bodyPathSection}>
                    <Text style={styles.pathSectionText} onPress={() => alert(selectedFilePath)}>{formatText(1, selectedFilePath)}</Text>
                </View>
                {
                    viewMode === "single" ? null :
                        <View style={styles.oriented}>
                            <Text style={styles.listText}>#</Text>
                            <Text style={styles.listText, { width: width / 2 }}>Name</Text>
                            <Text style={styles.listText}>Type</Text>
                        </View>
                }
                <FlatList
                    key={viewMode === 'single' ? "no-rendering" : "re-rendering"}
                    data={fileArray}
                    style={{ paddingLeft: 1 }}
                    contentContainerStyle={styles.bodyListSection}
                    renderItem={renderFileItems}
                    numColumns={viewMode === 'single' ? countPerRow : 1}
                    keyExtractor={(item) => "item-" + fileArray.indexOf(item)}
                    extraData={fileArray}
                    refreshControl={
                        <RefreshControl
                            key={"refresh-control"}
                            refreshing={refreshFileList}
                            onRefresh={() => setRefreshFileList(!refreshFileList)}
                            colors={[theme.refreshCircle, theme.refreshCircle]}
                            tintColor={theme.refreshText}
                            title="Files loading..."
                        />
                    }
                />
            </View>
            <Animated.View style={[styles.floatingButtonContainer, animatedBtn]} >
                <Tooltip
                    ref={clearTooltip}
                    popover={<Text style={{ color: theme.white, fontSize: 14, textAlign: 'left' }}>It clear all the selection on file list</Text>}
                    backgroundColor={theme.accent}
                    height={50}
                    containerStyle={{ marginLeft: (width - 250) / 2 }}
                    width={250}>
                    <Button
                        style={styles.floatingButton}
                        onlyIcon
                        icon="close"
                        iconFamily="EvilIcons"
                        iconSize={30}
                        onPress={() => onFileReset()}
                        onLongPress={() => clearTooltip.current.toggleTooltip()} />
                </Tooltip>
            </Animated.View>
        </>
    );
}

const saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        let fileUri = FileSystem.documentDirectory + "text.txt";
        await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}