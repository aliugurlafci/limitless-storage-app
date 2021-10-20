import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'galio-framework';
import { FileDownloaderStyles as styles, theme } from '../../Styles';

export function Navbar({ config, setConfig, setPopover }) {
    const [selectedAction, setSelectedAction] = useState(-1);

    const handleActionPress = (index) => {
        if (index === 0) {
            setConfig({ view: config.view, multiselect: !config.multiselect });
            if (!config.multiselect) {
                setPopover({ show: true, icon: 'success', message: 'Çoklu seçim modu etkinleştirildi.' });
                setSelectedAction(selectedAction === index ? -1 : index);
            }
            else {
                setPopover({ show: true, icon: 'success', message: 'Çoklu seçim modu kapatıldı.' })
                setSelectedAction(selectedAction === index ? -1 : index);
            }
        }
        if (index === 1) {
            setSelectedAction(selectedAction === index ? -1 : index);
        }
        if (index === 2) {
            setConfig({ view: config.view === 'single' ? 'list' : 'single', multiselect: config.multiselect });
            setSelectedAction(selectedAction === index ? -1 : index);
        }
    }
    return (
        <View style={styles.navbar}>
            <TouchableOpacity>
                <Text style={styles.navText}>File System Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActionPress(0)}>
                <Icon name="page-multiple" family="Foundation" size={25} color={selectedAction === 0 ? theme.accent : theme.textColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActionPress(1)}>
                <Icon name="Safety" family="AntDesign" size={25} color={selectedAction === 1 ? theme.accent : theme.textColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActionPress(2)}>
                <Icon name="layout" family="AntDesign" size={25} color={selectedAction === 2 ? theme.accent : theme.textColor} />
            </TouchableOpacity>
        </View>
    );
}