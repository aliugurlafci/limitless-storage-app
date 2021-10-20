import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import { PopoverStyles as styles, theme } from '../../Styles';
import { Icon } from 'galio-framework';

export const Popover = ({
    show,
    setShow,
    from,
    to,
    duration,
    useNativeDriver,
    details
}) => {
    const [iconSettings, setIconSettings] = useState({ name: '', family: '' });
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    const moveAnimation = animatedHeight.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [from, to, from]
    });
    const showAnimation = Animated.sequence([
        Animated.timing(animatedHeight, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver
        }),
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: duration / 3,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver
        })
    ]);
    const hideAnimation = Animated.sequence([
        Animated.timing(textOpacity, {
            toValue: 0,
            duration: duration / 3,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver
        }),
        Animated.timing(animatedHeight, {
            toValue: 2,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: useNativeDriver
        })
    ]);
    const handleAnimation = (action) => {
        switch (action) {
            case "start": {
                showAnimation.start();
            }; break;
            case "hide": {
                hideAnimation.start();
                setShow({ show: !show });
            }; break;
        }
    }
    useEffect(() => {
        if (show) {
            handleAnimation("start");
            setTimeout(() => { hideAnimation.start() }, 1750)
        }
    }, [show]);
    useEffect(() => {
        switch (details.icon) {
            case "info": setIconSettings({ name: 'infocirlceo', family: 'AntDesign' }); break;
            case "warning": setIconSettings({ name: 'exclamationcircleo', family: 'AntDesign' }); break;
            case "error": setIconSettings({ name: 'closecircleo', family: 'AntDesign' }); break;
            case "success": setIconSettings({ name: 'checkcircleo', family: 'AntDesign' }); break;
        }
    }, [details]);
    return (
        <>
            <TouchableOpacity activeOpacity={1} style={[styles.outside, { display: show === true ? "flex" : "none" }]} onPress={() => handleAnimation("hide")}></TouchableOpacity>
            <Animated.View style={[styles.body, { bottom: moveAnimation }]}>
                <View style={styles.bottom}>
                    <Icon name={iconSettings.name} family={iconSettings.family} size={30} color={theme.backgroundColor} />
                </View>
                <View style={styles.top}>
                    <Animated.Text style={[styles.topText, { opacity: textOpacity }]}>{details.message}</Animated.Text>
                </View>
            </Animated.View>

        </>
    );
}