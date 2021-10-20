import React, { useState } from 'react';
import { View } from 'react-native';
import { Overlay, Input, Button, Text } from 'react-native-elements';
import { RenameModalStyles as styles } from '../../Styles';

export function RenameModal({
    visible,
    actionType,
    setFolderName,
    handleSubmit,
    onBackdrop
}) {
    return (
        <Overlay visible={visible} overlayStyle={styles.overlay} onBackdropPress={() => onBackdrop({ nameModal: !visible })}>
            <View style={styles.headerView}>
                <Text style={styles.headerViewText}> Create New Folder </Text>
            </View>
            <View style={styles.overlayBody}>
                <Input
                    blurOnSubmit={true}
                    clearButtonMode="while-editing"
                    placeholder="Write the folder name"
                    numberOfLines={1}
                    inputStyle={{ textAlign: 'center' }}
                    onChangeText={text => setFolderName({ name: text, destination: '' })}
                    inputContainerStyle={styles.input}
                />
                <Button
                    style={styles.button}
                    buttonStyle={styles.button}
                    onPress={() => actionType ? onBackdrop({ nameModal: !visible, miniFileModal: false, renameModal: false }) : handleSubmit(true)}
                    title={actionType ? "Rename Folder" : "Create Folder"}
                    titleStyle={{ fontSize: 14 }} />
            </View>
        </Overlay>
    );
}