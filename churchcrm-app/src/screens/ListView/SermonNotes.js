import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';

export const fetchSermonsNotes = async () => {
  return fetchDataByEndpoint('fetchSermonnotes');
};

export default function SermonNotes() {
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
              onPress={() =>
                navigation.navigate('SermonNotesView', {
                  sermon_note: sermonnotes,
                  imageUri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                  sermon_note_id: sermonnotes.id
                })
              }>
              <View key={sermonnotes.id}>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                  <View style={{ marginRight: 3 }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                      }}
                    />
                    <Text style={styles.sermonDate}>
                      {new Date(sermonnotes.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <Text style={styles.sermonText}>
                      {sermonnotes.sermondescription.length > 25 ? 
                      (sermonnotes.sermondescription.slice(0, 25)+'...') : 
                      (sermonnotes.sermondescription)
                      }

                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Sermon Notes available</Text>
        )}
      </ScrollView>
    </View>
  );
}
