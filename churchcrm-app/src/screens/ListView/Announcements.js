import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';

export const fetchAnnouncements = async () => {
  return fetchDataByEndpoint('fetchAnnouncements');
};

export default function Announcements() {
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
              onPress={() =>
                navigation.navigate('AnnouncementView', {
                  announcement: announcements,
                  imageUri: `${BASE_URL}/Announcements/${announcements.poster}`,
                })
              }>
              <View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                  <View style={{marginRight: 10}}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/Announcements/${announcements.poster}`,
                      }}
                    />
                    <Text style={styles.dataDate}>
                      {new Date(announcements.created_at).toLocaleDateString(
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
                        {announcements.Topic.slice(0, 25)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Announcements Not available!</Text>
        )}
      </ScrollView>
    </View>
  );
}
