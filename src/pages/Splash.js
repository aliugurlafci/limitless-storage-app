import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { LottieAnimation } from '../global/LottieAnimation';
import { Home } from './Home';
import { SplashStyles as styles } from '../Styles';

export const Splash = () => {
    const [finish, setFinish] = useState(false);
    if (finish) {
        return <Home />;
    }
    else {
        return (
            <View style={styles.container}>
                <LottieAnimation
                    autoPlay={true}
                    duration={5000}
                    loop={false}
                    speed={1000}
                    url="system"
                    style={styles.lottie}
                    key="splash-lottie"
                    state={setFinish}
                />
                <Text style={{ color: 'white' }}>For information security sake ?</Text>
            </View>
        );
    }

}