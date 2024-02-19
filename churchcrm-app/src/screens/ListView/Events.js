import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/EventsScreen';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
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
  }, []);

  const navigation = useNavigation();

  // Separate events into past and upcoming
  const currentDate = new Date();
  const pastEvents = eventData.filter(
    event => new Date(event.Event_Date) < currentDate,
  );
  const upcomingEvents = eventData.filter(
    event => new Date(event.Event_Date) >= currentDate,
  );

  const renderEventItem = event => (
    <TouchableOpacity
      key={event.id}
      onPress={() =>
        navigation.navigate('EventView', {
          event,
          imageUri: `${BASE_URL}/EventImages/${event.Img_Path}`,
        })
      }
      style={styles.eventItem}>
      <View style={GlobalCss.container}>
        <Image
          style={styles.image}
          source={{
            uri: `${BASE_URL}/EventImages/${event.Img_Path}`,
          }}
        />
        <Text style={styles.dataDate}>
          {new Date(event.Event_Date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <View style={styles.dataText}>
          <Text style={styles.text}>{event.Event_Title}</Text>
        </View>
        <Text style={styles.text}>
          {event.Event_Description.slice(0, 15)}...
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.Container}>
      <ScrollView horizontal={false}>
        <View style={styles.eventContainer}>
          {/* Upcoming Events Section */}
          <View style={styles.eventSection}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {eventLoading ? (
              <Text>Loading Upcoming Events...</Text>
            ) : upcomingEvents.length > 0 ? (
              <View style={styles.eventRow}>
                {upcomingEvents.map(
                  (event, index) =>
                    index % 2 === 0 && (
                      <View style={styles.viewStyles} key={index}>
                        {renderEventItem(event)}
                        {index + 1 < upcomingEvents.length &&
                          renderEventItem(upcomingEvents[index + 1])}
                      </View>
                    ),
                )}
              </View>
            ) : (
              <Text style={styles.text}>No Upcoming Events</Text>
            )}
          </View>

          {/* Past Events Section */}
          <View style={styles.eventSection}>
            <Text style={styles.sectionTitle}>Past Events</Text>
            {eventLoading ? (
              <Text>Loading Past Events...</Text>
            ) : pastEvents.length > 0 ? (
              <View style={styles.eventRow}>
                {pastEvents.map(
                  (event, index) =>
                    index % 2 === 0 && (
                      <View style={styles.viewStyles} key={index}>
                        {renderEventItem(event)}
                        {index + 1 < pastEvents.length &&
                          renderEventItem(pastEvents[index + 1])}
                      </View>
                    ),
                )}
              </View>
            ) : (
              <Text style={styles.text}>No Past Events</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
