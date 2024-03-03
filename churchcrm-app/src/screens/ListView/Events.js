import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/EventsScreen';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import EventItem from '../view/Item_Views/EventItem';
export const fetchEvents = async () => {
  return fetchDataByEndpoint('fetchEvents');
};

export default function Events() {
  const [eventData, setEventsData] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);

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

  // Separate events into past and upcoming
  const currentDate = new Date();
  const pastEvents = eventData.filter(
    event => new Date(event.Event_Date) < currentDate,
  );
  const upcomingEvents = eventData.filter(
    event => new Date(event.Event_Date) >= currentDate,
  );


  return (
    <View style={styles.Container}>
      <ScrollView >
        <View style={styles.eventContainer}>
          {/* Upcoming Events Section */}
          <View style={styles.eventSection}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {eventLoading ? (
              <Text style={styles.loadingText}>Loading Upcoming Events...</Text>
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              <ScrollView horizontal={true}>
                <View style={styles.eventRow}>
                  {upcomingEvents.map(
                    (eventArray, index) => (
                      new Date(eventArray.Event_Date) >= currentDate ? (
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
                  )}
                </View>
              </ScrollView>

            ) : (
              <Text style={styles.loadingText}>No Upcoming Events</Text>
            )}
          </View>

          {/* Past Events Section */}
          <View style={styles.eventSection}>
            <Text style={{ ...styles.sectionTitle, marginTop: 15 }}>Past Events</Text>
            {eventLoading ? (
              <Text>Loading Past Events...</Text>
            ) : pastEvents && pastEvents.length > 0 ? (
              <ScrollView horizontal={true}>
                <View style={styles.eventRow}>
                  {pastEvents.map(
                    (eventArray, index) => (
                      new Date(eventArray.Event_Date) < currentDate ? (
                        <TouchableOpacity
                          key={index}
                          onPress={() => navigation.navigate('EventView',
                            {
                              event: eventArray,
                              imageUri: `${BASE_URL}/EventImages/${eventArray.Img_Path}`
                            })}>
                          <EventItem event={eventArray} />
                        </TouchableOpacity>
                      ) : (
                        <>
                        </>
                      )
                    ),
                  )}
                </View>
              </ScrollView>
            ) : (
              <Text style={styles.loadingText}>No Past Events</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
