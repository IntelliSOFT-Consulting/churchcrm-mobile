import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';
import SermonNoteItem from './SermonNoteItem';

export const fetchSermonsNotes = async () => {
  return fetchDataByEndpoint('fetchSermonnotes');
};

export default function SermonNotes({ setSermonNote }) {
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonNotes = await fetchSermonsNotes();
        setSermonsNotesData(sermonNotes);
        setSermonsNotesLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const navigation = useNavigation();

  return (
    <View style={styles.sermonNoteContainer}>
      <Text style={styles.sermonNotesHeading}>Sermon Notes</Text>
      <ScrollView horizontal={true}>
        {sermonsNotesLoading ? (
          <Text style={styles.loadingText}>Loading sermon Notes...</Text>
        ) : sermonsNotesData && sermonsNotesData.length > 0 ? (
          sermonsNotesData.map(sermonnotes => (
            <TouchableOpacity
              key={sermonnotes.id}
              onPress={() => {
                setSermonNote(sermonnotes)
                navigation.navigate('SermonNotesView')
              }}>
              <SermonNoteItem sermonNote={sermonnotes} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Sermon Notes available</Text>
        )}
      </ScrollView>
    </View>
  );
}
