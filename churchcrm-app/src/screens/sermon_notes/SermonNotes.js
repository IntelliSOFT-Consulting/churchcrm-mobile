import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { fetchAllData } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';
import SermonNoteItem from './SermonNoteItem';


export default function SermonNotes({ setSermonNote }) {
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchAllData()
        if (responses) {
          setSermonsNotesData(responses[2])
          setSermonsNotesLoading(false)
        } else {
          console.error('Error fetching data: Responses array is null or not an array');
        }
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
