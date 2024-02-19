import React, {useState} from 'react';
import {Text, Image, ScrollView, RefreshControl} from 'react-native';
import {styles} from '../../assets/css/Global';
import Announcements from '../ListView/Announcements';
const AnnouncementView = ({route}) => {
  const {announcement, imageUri} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    announcements: [],
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        announcements: [],
      });

      setRefreshing(false);
    }, 2000);
  };
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Image style={styles.image} source={{uri: imageUri}} />

      <Text style={styles.dataDate}>
        {new Date(announcement.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.dataTopic}>{announcement.Topic}</Text>
      <Text style={styles.text}>{announcement.Message}</Text>
      <Announcements data={data.announcements} />
    </ScrollView>
  );
};

export default AnnouncementView;
