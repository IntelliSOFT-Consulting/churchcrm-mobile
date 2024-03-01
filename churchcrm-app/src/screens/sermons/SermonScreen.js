import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/css/SermonsPage';
export const fetchSermons = async () => {
  return fetchDataByEndpoint('fetchSermons');
};

export default function SermonScreen({ setSermon }) {
  const navigation = useNavigation();
  const [sermonsData, setSermonsData] = useState([]);
  const [sermonsLoading, setSermonsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermons = await fetchSermons();
        setSermonsData(sermons);
        setSermonsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={false}>
        {sermonsLoading ? (
          <Text style={styles.loadingText}>Loading sermons...</Text>
        ) : sermonsData && sermonsData.length > 0 ? (
          sermonsData.map(sermonClicked => (
            <TouchableOpacity
              key={sermonClicked.id}
              onPress={() =>
              {
                setSermon(sermonClicked)
                  navigation.navigate('VideoPlayer')}
              }>
              <View style={styles.sermonTouchable}>
                <ImageBackground
                  style={styles.image}
                  imageStyle={styles.image}
                  resizeMode="cover"
                  source={{
                    uri: `${BASE_URL}/SermonThumbnails/${sermonClicked.Thumbnail}`,
                  }}>
                  <View style={styles.imageOverlay}></View>
                  <View style={styles.textContainer}>
                    <Text style={styles.dataDate}>
                      {new Date(sermonClicked.sermon_date).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>

                    <Text style={styles.text}>
                      {sermonClicked.Title.length > 31
                        ? sermonClicked.Title.slice(0, 31) + '...'
                        : sermonClicked.Title}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Sermons available</Text>
        )}
      </ScrollView>
    </View>
  );
}
