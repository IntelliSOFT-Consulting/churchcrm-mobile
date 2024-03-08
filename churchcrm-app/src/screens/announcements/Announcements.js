import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import GlobalCss from '../../assets/css/GlobalCss';
import AnnouncementItem from './AnnouncementItem';
import { fetchAllData } from '../../hooks/HandleApis';

export default function Announcements({ setAnnouncement, announcement }) {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchAllData()
        if (responses) {
          setAnnouncementsData(responses[1]);
          setAnnouncementsLoading(false);
        } else {
          console.error('Error fetching data: Responses array is null or not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={GlobalCss.container}>
      <Text style={styles.headingText}>Announcements</Text>

      <ScrollView horizontal={true}>
        {announcementsLoading ? (
          <Text style={styles.loadingText}>Loading Announcements...</Text>
        ) : announcementsData && announcementsData.length > 0 ? (
          announcementsData.map(announcements => (
            <TouchableOpacity
              key={announcements.id}
              onPress={() => {
                setAnnouncement(announcements)
                navigation.navigate('AnnouncementView')
              }

              }>
              <AnnouncementItem announcement={announcements} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Announcements Not available!</Text>
        )}
      </ScrollView>
    </View>
  );
}
