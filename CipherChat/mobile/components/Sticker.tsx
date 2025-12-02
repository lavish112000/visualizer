import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';

interface StickerProps {
    fileId: string; // URL or local path
    isAnimated: boolean;
    size?: number;
}

export const Sticker: React.FC<StickerProps> = ({ fileId, isAnimated, size = 120 }) => {
    if (isAnimated) {
        return (
            <View style={{ width: size, height: size }}>
                <LottieView
                    source={{ uri: fileId }}
                    autoPlay
                    loop
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        );
    }

    return (
        <Image
            source={{ uri: fileId }}
            style={{ width: size, height: size }}
            contentFit="contain"
            cachePolicy="disk"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
