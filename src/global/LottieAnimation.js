import React from 'react';
import LottieView from 'lottie-react-native';

export const LottieAnimation = ({ url, autoPlay, loop, duration, style, speed, state }) => {
    const sourceSelection = (selection) => {
        switch (selection) {
            case "pay": return require("../../assets/pay-new.json");
            case "scan": return require("../../assets/scan.json");
            case "system": return require("../../assets/system.json");
        }
    }
    const source = sourceSelection(url);

    const handleState = () => {
        try {
            state(true);
        }
        catch (err) { }
    }
    return (
        <LottieView
            source={source}
            autoPlay={autoPlay}
            loop={loop}
            onAnimationFinish={() => handleState()}
            duration={duration}
            style={style}
            speed={speed}
            cacheComposition={false}
            resizeMode="contain"
        />
    );
}