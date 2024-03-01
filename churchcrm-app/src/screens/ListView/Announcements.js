import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
import AnnouncementItem from '../view/Item_Views/AnnouncementItem';

export const fetchAnnouncements = async () => {
  return fetchDataByEndpoint('fetchAnnouncements');
};

export default function Announcements({ setAnnouncement, announcement }) {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcements = await fetchAnnouncements();
        setAnnouncementsData(announcements);
        setAnnouncementsLoading(false);
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
