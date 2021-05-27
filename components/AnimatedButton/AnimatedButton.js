import React, { useState, useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const AnimatedButton = ({type, size, active, action, actionType}) => {
    const initialSize = useRef(new Animated.Value(1)).current

    const startUpscaleAnimation = () => {
        if (active) {
            Animated.timing(initialSize, {
                toValue : 1.1,
                duration: 150,
                useNativeDriver: true
            }).start()
        }
        return
    }

    const startDownscaleAnimation = () => {
        if (active) {
            Animated.timing(initialSize, {
                toValue : 1,
                duration: 150,
                useNativeDriver: true
            }).start()
        }
        return
    }

    const animation = {
            transform : [
                {scale: initialSize}
            ]
    }

    return (
            <TouchableWithoutFeedback
                onPress={() => action(actionType)}
                onPressIn={() => startUpscaleAnimation()}
                onPressOut={() => startDownscaleAnimation()}
                >
                <Animated.View style={animation}>
                    <AntDesign
                        name={type === 'plus' ? "plussquareo" : "minussquareo"}
                        style={{
                            fontSize: size,
                            width: size,
                            height: size,
                            alignSelf: 'center',
                            borderWidth: 1,
                            color: active ? (type === 'plus' ? 'green' : 'brown') : 'gray'
                        }} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
};

export default AnimatedButton;
