import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'galio-framework';
import { EntryRejectedStyles as styles, theme } from '../../Styles';

export function EntryRejected({ tryAgain }) {
    const [password, setPassword] = useState('');
    const padNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'fingerprint', 0, 'erase'];

    const handlePressEvent = (index) => {
        if (index === -1) {
            if (password.length > 0) {
                setPassword(password.substring(0, password.length - 1));
            }
        }
        else {
            setPassword(password + index);
        }
    }
    const renderListItem = ({ item }) => {
        if (item === 'fingerprint') {
            return (
                <View style={styles.numbers}>
                    <TouchableOpacity onPress={() => tryAgain()} style={styles.touchable}>
                        <Icon name={item} family='Entypo' size={30} color={theme.accent} />
                    </TouchableOpacity>
                </View>
            );
        }
        else if (item === 'erase') {
            return (
                <View style={styles.numbers}>
                    <TouchableOpacity onPress={() => handlePressEvent(-1)} style={styles.touchable}>
                        <Icon name={item} family='Entypo' size={30} color={theme.accent} />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.numbers}>
                    <TouchableOpacity onPress={() => handlePressEvent(item)} style={styles.touchable}>
                        <Text style={styles.numberText}>{item}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    useEffect(() => {
        if (password.length === 6) {
            alert("Your password is " + password);
            setPassword('');
        }
    }, [password])
    return (
        <View style={styles.container}>
            <View style={styles.top}>

            </View>
            <View style={styles.bottom}>
                <View style={styles.visualPassword}>
                    <Text style={styles.text}>Touch ID or enter pin code</Text>
                    <View style={styles.row}>
                        <Text style={[styles.dots, { color: password.length >= 1 ? theme.textColor : theme.shadowColor }]}>.</Text>
                        <Text style={[styles.dots, { color: password.length >= 2 ? theme.textColor : theme.shadowColor }]}>.</Text>
                        <Text style={[styles.dots, { color: password.length >= 3 ? theme.textColor : theme.shadowColor }]}>.</Text>
                        <Text style={[styles.dots, { color: password.length >= 4 ? theme.textColor : theme.shadowColor }]}>.</Text>
                        <Text style={[styles.dots, { color: password.length >= 5 ? theme.textColor : theme.shadowColor }]}>.</Text>
                        <Text style={[styles.dots, { color: password.length >= 6 ? theme.textColor : theme.shadowColor }]}>.</Text>
                    </View>
                </View>
                <View style={styles.numberPad}>
                    <FlatList
                        data={padNumbers}
                        renderItem={renderListItem}
                        keyExtractor={item => 'number-' + item}
                        numColumns={3}
                    />
                </View>
            </View>
        </View>
    );
}
