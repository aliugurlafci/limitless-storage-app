import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { LottieAnimation } from '../global/LottieAnimation';
import { Actions } from 'react-native-router-flux';
import { SplashStyles as styles } from '../Styles';

export const Splash = () => {
    const [finish, setFinish] = useState(false);
    useEffect(() => {
        if (finish) {
            Actions.opening();
        }
    }, [finish]);

    return (
        <SafeAreaView style={styles.container}>
            <LottieAnimation
                autoPlay={true}
                duration={3000}
                loop={false}
                speed={100}
                url="system"
                style={styles.lottie}
                key="splash-lottie"
                state={setFinish}
            />
        </SafeAreaView>
    );
}