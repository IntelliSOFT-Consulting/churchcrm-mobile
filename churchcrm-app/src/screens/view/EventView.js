import React from 'react';
import {styles} from '../../assets/css/EventsScreen';

import {Text, Image, ScrollView} from 'react-native';

const EventView = ({route}) => {
  const {event, imageUri} = route.params;

  return (
    <ScrollView style={styles.Container}>
      <Image style={styles.image} source={{uri: imageUri}} />

      <Text style={styles.dataDate}>
        {new Date(event.Event_Date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.dataTopic}>{event.Event_Title}</Text>
      <Text style={styles.dataParagraph}>{event.Event_Description}</Text>
    </ScrollView>
  );
};

export default EventView;
