import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, ImageBackground, FlatList} from 'react-native';
import {styles} from './ShortVideosCss';
import {fetchDataByEndpoint} from '../../hooks/HandleApis';

export const fetchShortVideo = async () => {
  return fetchDataByEndpoint('fetchShortVideo');
};

export default function ShortVideos() {
  const [shortvideoData, setshortvideo] = useState([]);
  const [shortvideoLoading, setshortvideoLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchShortVideo();
        setshortvideo(videos);
        console.log(videos);

        setshortvideoLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <ScrollView horizontal={false}>
        <View style={styles.heroSection}>
          <View style={styles.sermonTouchable}>
            <ImageBackground
              style={styles.image}
              imageStyle={styles.image}
              resizeMode="cover"
              source={require('../../assets/images/two.jpg')}>
              <View style={styles.imageOverlay}></View>
              <View style={styles.textContainer}>
                <Text style={styles.dataDate}>05 March 2023</Text>

                <Text style={styles.text}>Embracing Community</Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.videoArraySection}>
          <Text style={styles.title}>WATCH HISTORY</Text>

          <View style={styles.videoRow}>
            {shortvideoLoading ? (
              <Text style={styles.loadingText}>Loading shortvideo...</Text>
            ) : shortvideoData && shortvideoData.length > 0 ? (
              shortvideoData.map(sermonClicked => (
                <View style={styles.videoColumn}>
                  <ImageBackground
                    style={styles.videoImage}
                    imageStyle={styles.videoImage}
                    resizeMode="cover"
                    source={require('../../assets/images/two.jpg')}>
                    <View style={styles.videoOverlay}>
                      <Text>Video Overlay</Text>
                    </View>
                    <View style={styles.videoTextContainer}>
                      <Text style={styles.videoDate}>05 March 2023</Text>
                      <Text style={styles.videoText}>Embracing Community</Text>
                    </View>
                  </ImageBackground>
                </View>
              ))
            ) : (
              <Text style={styles.loadingText}>No Shortvideo available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
