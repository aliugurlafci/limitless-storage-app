import React from 'react';
import LottieView from 'lottie-react-native';

export const LottieAnimation = ({ url, autoPlay, loop, duration, style, speed, state }) => {
    const sourceSelection = (selection) => {
        switch (selection) {
            case "pay": return require("../../assets/pay.json");
            case "scan": return require("../../assets/scan.json");
            case "system": return require("../../assets/system.json");
        }
    }
    const source = sourceSelection(url);
    return (
        <LottieView
            source={source}
            autoPlay={autoPlay}
            loop={loop}
            onAnimationFinish={() => state(true)}
            duration={duration}
            style={style}
            speed={speed}
            autoSize
        />
    );
}