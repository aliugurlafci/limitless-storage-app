import React, { useState, useRef, useEffect, useReducer } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { Icon } from 'galio-framework';
import { FileDownloaderStyles as styles, theme } from '../../Styles';

export function LeftActionBar({ leftMenuClickHandler, disabledProp }) {

    const [leftMenuAction, setLeftMenuAction] = useState(false);
    const animatedLeftValue = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const animatedPanelOpacity = useRef(new Animated.Value(0)).current;

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const leftMargin = animatedLeftValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, -50, 0]
    });
    const actionMargin = animatedLeftValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [50, 0, 50]
    });
    const panelOpacity = animatedPanelOpacity.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 0.4, 1]
    });

    const hideAnimation = Animated.parallel([
        Animated.timing(animatedLeftValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: false
        }),
        Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }),
        Animated.timing(animatedPanelOpacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        })
    ]);
    const showAnimation = Animated.parallel([
        Animated.timing(animatedLeftValue, {
            toValue: 2,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: false
        }),
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false
        }),
        Animated.timing(animatedPanelOpacity, {
            toValue: 2,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        })
    ]);
    useEffect(() => {
        if (leftMenuAction) {
            hideAnimation.start();
        }
        else {
            showAnimation.start();
        }
    }, [leftMenuAction]);
    return (
        <>
            <Animated.View style={[styles.leftMenu, { left: leftMargin, marginRight: leftMargin }]}>
                <AnimatedTouchableOpacity style={[styles.menuItems, { opacity: animatedOpacity }]} onPress={() => leftMenuClickHandler(0)}>
                    <Icon name="addfolder" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Add Folder</Text>
                </AnimatedTouchableOpacity>
                <AnimatedTouchableOpacity style={[styles.menuItems, { opacity: animatedOpacity }]} onPress={() => leftMenuClickHandler(1)}>
                    <Icon name="addfile" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Add File</Text>
                </AnimatedTouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(2)} {...disabledProp}>
                    <Icon name="edit" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(3)} {...disabledProp}>
                    <Icon name="copy" family="Entypo" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Move</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(4)} {...disabledProp}>
                    <Icon name="delete" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(5)} {...disabledProp}>
                    <Icon name="save" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(6)} {...disabledProp}>
                    <Icon name="setting" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(7)} {...disabledProp}>
                    <Icon name="download" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disabledProp.disabled ? [styles.menuItems, styles.disabled] : styles.menuItems} onPress={() => leftMenuClickHandler(8)} {...disabledProp}>
                    <Icon name="upload" family="AntDesign" size={25} color={theme.textColor} />
                    <Text style={styles.menuText}>Upload</Text>
                </TouchableOpacity>
            </Animated.View>
            <AnimatedTouchableOpacity style={[styles.actionBar, { left: actionMargin, opacity: panelOpacity }]} activeOpacity={1} onPress={() => setLeftMenuAction(!leftMenuAction)}>
                <Icon name={leftMenuAction ? "arrowright" : "arrowleft"} family='AntDesign' size={25} color={theme.accent} />
            </AnimatedTouchableOpacity>
        </>
    );
}