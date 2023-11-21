import * as React from 'react';
import {View, Image, StyleSheet} from "react-native";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('/images/logo.png')}
                style={style.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContect: "center",
        alignItems: "center",

    },
    image: {
        width: 100,
        height: 100,
    }
});

export default SplashScreen;