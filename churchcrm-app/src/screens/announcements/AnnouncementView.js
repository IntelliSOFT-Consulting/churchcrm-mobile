import React, { useState } from 'react';
import { Text, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { styles as Global } from '../../assets/css/Global';
import { styles } from '../../assets/css/HomeScreen';
import { useEffect } from 'react';
import { BASE_URL } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';
import AnnouncementItem from './AnnouncementItem';

const AnnouncementView = ({ announcement, setAnnouncement }) => {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${BASE_URL}/api/fetchAnnouncements`);
        data = await response.json();
        setAnnouncementsData(data);
        setAnnouncementsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, []);

  return (
    <ScrollView style={Global.container}>
      {announcementsLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View>
          <Image style={Global.image} source={{ uri: `${BASE_URL}/Announcements/${announcement.poster}` }} />

          <Text style={Global.dataDate}>
            {new Date(announcement.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={Global.announcementTopic}>{announcement.Topic}</Text>
          <Text style={{ ...Global.text, marginBottom: 20 }}>{announcement.Message}</Text>

          {/* View announcement recommendations */}
          <ScrollView horizontal={true}>
            {announcementsData && announcementsData.length > 0 ? (
              announcementsData.map(announcementsRec => (
                announcementsRec.id != announcement.id ? (
                  <TouchableOpacity
                    styles={{ marginTop: 20 }}
                    key={announcementsRec.id}
                    onPress={() => {
                      setAnnouncement(announcementsRec)
                      navigation.navigate('AnnouncementView')
                    }
                    }>
                    <AnnouncementItem announcement={announcementsRec} />
                  </TouchableOpacity>
                ) : (
                  <>
                  </>
                )
              ))
            ) : (
              <Text style={styles.loadingText}>No announcements to display</Text>
            )
            }
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default AnnouncementView;
