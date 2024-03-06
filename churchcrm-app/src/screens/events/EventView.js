import React from 'react';
import { useState, useEffect } from 'react';
import { styles } from '../../assets/css/EventsScreen';
import { useNavigation } from '@react-navigation/native';
import { Text, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import EventItem from './EventItem';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
export const fetchEvents = async () => {
  return fetchDataByEndpoint('fetchEvents');
};

const EventView = ({ route }) => {
  const { event, imageUri } = route.params;
  const [eventData, setEventsData] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await fetchEvents();
        setEventsData(events);
        setEventLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [eventLoading]);

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.Container}>
      <View>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <Text style={styles.dataDate}>
          {new Date(event.Event_Date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.dataTopic}>{event.Event_Title}</Text>
        <Text style={styles.dataParagraph}>{event.Event_Description}</Text>
        <View>
          <ScrollView horizontal={true}>
            {
              eventData && eventData.length > 0 ? (
                eventData.map(
                  (eventArray, index) => (
                    eventArray.id != event.id ? (
                      <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('EventView',
                          {
                            event: eventArray,
                            imageUri: `${BASE_URL}/EventImages/${eventArray.Img_Path}`
                          })}
                      >
                        <EventItem event={eventArray} />
                      </TouchableOpacity>
                    ) : (
                      <>
                      </>
                    )
                  ),
                )
              ) : (
                <Text style={styles.loadingText}>No events available.</Text>
              )
            }
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventView;
