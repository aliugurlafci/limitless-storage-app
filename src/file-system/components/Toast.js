import React from 'react';
import Constants from 'expo-constants';
import { Toast as Toaster } from 'galio-framework';

export const Toast = ({
    isShow,
    positionIndicator,
    color,
    textColor,
    message
}) => {
    return <Toaster
        isShow={isShow}
        useNativeDriver={true}
        positionIndicator={positionIndicator}
        color="theme"
        positionOffset={Constants.statusBarHeight}
        fadeInDuration={1000}
        fadeOutDuration={1500}
        style={{ backgroundColor: color }}
        textStyle={{ color: textColor }}
    >{message}</Toaster>
}
const childTree = [{
    name: 'file-x64',
    type: 'file',
    size: '1024'
}]
const fileTree = {
    name: 'root',
    type: 'folder',
    size: 1024,
    childs: [
        {
            name: 'file',
            type: 'file',
            size: '1024'
        },
        {
            name: 'constants-files',
            type: 'folder',
            size: 2048,
            childs: childTree
        }
    ]
}