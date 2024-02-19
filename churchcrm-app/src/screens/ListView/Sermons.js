import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';
import {useNavigation} from '@react-navigation/native';
import GlobalCss from '../../assets/css/GlobalCss';

export const fetchSermons = async () => {
  return fetchDataByEndpoint('fetchSermons');
};

export default function Sermons() {
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
    <View style={GlobalCss.container}>
      <Text style={styles.headingText}>Sermons</Text>
      <ScrollView horizontal={true}>
        {sermonsLoading ? (
          <Text style={styles.loadingText}>Loading sermons...</Text>
        ) : sermonsData && sermonsData.length > 0 ? (
          sermonsData.map(sermon => (
            <TouchableOpacity
              key={sermon.id}
              onPress={() =>
                navigation.navigate('VideoPlayer', {sermon: sermon})
              }>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 20,
                  }}>
                  <View style={{marginRight: 10}}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/SermonThumbnails/${sermon.Thumbnail}`,
                      }}
                    />
                    <Text style={styles.dataDate}>
                      {new Date(sermon.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <View style={styles.dataText}>
                      <Text style={styles.text}>
                        {sermon.Title.slice(0, 31)}
                      </Text>
                    </View>
                  </View>
                </View>
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
