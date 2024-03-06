import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
} from 'react-native';
import { styles } from './ShortVideosCss';
export default function ShortVideos() {

    return (
        <View>
            <ScrollView horizontal={false}>
                <View style={styles.heroSection}>
                    <View style={styles.sermonTouchable}>
                        <ImageBackground
                            style={styles.image}
                            imageStyle={styles.image}
                            resizeMode="cover"
                            source={require('../../assets/images/shooting-video.jpeg')}>
                            <View style={styles.imageOverlay}></View>
                            <View style={styles.textContainer}>
                                <Text style={styles.dataDate}>
                                    05 March 2023
                                </Text>

                                <Text style={styles.text}>
                                    Embracing Community
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                
                <View style={styles.videoArraySection}>
                    <Text style={styles.title}>WATCH HISTORY</Text>
                
                        <View style={styles.videoRow}>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.videoColumn}>
                                <ImageBackground
                                    style={styles.videoImage}
                                    imageStyle={styles.videoImage}
                                    resizeMode="cover"
                                    source={require('../../assets/images/shooting-video.jpeg')}>
                                    <View style={styles.videoOverlay}></View>
                                    <View style={styles.videoTextContainer}>
                                        <Text style={styles.videoDate}>
                                            05 March 2023
                                        </Text>

                                        <Text style={styles.videoText}>
                                            Embracing Community
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                    
                </View>
            </ScrollView>
        </View>
    );
}

{/*
 <View>
                    <Image style={styles.heroImage} source={require('../../assets/images/shooting-video.jpeg')} />
                </View>
                <View>
                    <Text style={styles.title}>WATCH HISTORY</Text>
                </View>
                <View >
                    <Image style={styles.imageLeft} source={require('../../assets/images/video-recording.jpeg')} />
                    <Image style={styles.imageRight} source={require('../../assets/images/video-recording.jpeg')} />
                </View>
*/}