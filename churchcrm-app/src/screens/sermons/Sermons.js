import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import SermonItem from './SermonItem';
import { fetchAllData } from '../../hooks/HandleApis';
import {useNavigation} from '@react-navigation/native';
import GlobalCss from '../../assets/css/GlobalCss';

export const fetchSermons = async () => {
  return fetchDataByEndpoint('fetchSermons');
};

export default function Sermons({setSermon, sermon}) {
  const navigation = useNavigation();
  const [sermonsData, setSermonsData] = useState([]);
  const [sermonsLoading, setSermonsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchAllData()
        if (responses) {
          setSermonsData(responses[3])
          setSermonsLoading(false)
        } else {
          console.error('Error fetching sermons data');
        }
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
          sermonsData.map(sermonClicked => (
            <TouchableOpacity
              key={sermonClicked.id}
              onPress={() => {
                setSermon(sermonClicked);
                navigation.navigate('VideoPlayer');
              }}>
              <SermonItem sermon={sermonClicked} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Sermons available</Text>
        )}
      </ScrollView>
    </View>
  );
}
