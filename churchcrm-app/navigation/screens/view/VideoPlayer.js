import React from 'react';
import Video from 'react-native-video';

import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


const VideoPlayer = ({ route }) => {
  const { sermon } = route.params;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    video: {
      width: '100%',
      height: 300,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
     <Text>
        {new Date(sermon.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text>{sermon.Title}</Text>
      <Text>{sermon.Sermon_Link}</Text>
      <Text>{sermon.Sermon_Description}</Text>
    </ScrollView>
  );
};

export default VideoPlayer;

