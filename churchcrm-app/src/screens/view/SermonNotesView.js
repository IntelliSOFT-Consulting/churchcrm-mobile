import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { styles } from '../../assets/css/Global';
import { styles as homestyles } from '../../assets/css/HomeScreen';
import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
export const fetchSermonsNotes = async (note_id) => {
  return fetchDataByEndpoint(`fetch_other_notes/${note_id}`);
};

const SermonNotesclickedView = ({ route }) => {
  const { sermon_note, imageUri, sermon_note_id } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const navigation = useNavigation();


  const onRefresh = () => {
    setRefreshing(true);
    // Fetch updated data or reset data
    //fetchData().then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Function to download sermon notes
  const downloadSermon = async (noteID, notesFile) => {
    try {
      if (!notesFile) {
        console.error('Sermon notes file is not provided.');
        return;
      }
      console.log("Notes file", notesFile)
      const { config, fs } = RNFetchBlob;
      const dir =
        Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;

      // Extracting file extension and MIME type
      const fileExtension = notesFile.split('.').pop();
      let mimeType = '';
      switch (fileExtension) {
        case 'pdf':
          mimeType = 'application/pdf';
          break;
        case 'doc':
          mimeType = 'application/msword';
          break;
        case 'docx':
          mimeType =
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case 'ppt':
          mimeType = 'application/vnd.ms-powerpoint';
          break;
        case 'pptx':
          mimeType =
            'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          break;
        default:
          mimeType = 'application/octet-stream';
      }

      const filePath = `${dir}/${noteID}.${fileExtension}`;

      // Configuring download options
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Sermon Notes',
          path: filePath,
          mime: mimeType,
        },
        useDownloadManager: true,
        notification: true,
        title: 'Sermon Notes',
        path: filePath,
      };

      // Start downloading
      const res = await config(options).fetch(
        'GET',
        `${BASE_URL}/api/download_sermon_notes/${noteID}`,
      );

      // Log success
      console.log('Download success', res);
    } catch (error) {
      // Log any errors
      console.error('Download error', error);
    }
  };

  // Fetch other notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonNotesclicked = await fetchSermonsNotes(sermon_note_id);
        setSermonsNotesData(sermonNotesclicked);
        setSermonsNotesLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sermon_note_id]);

  return (
    <ScrollView
      
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <Image style={styles.itemImage} source={{ uri: imageUri }} />
        <Text style={styles.dataDate}>
          {new Date(sermon_note.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.dataSermonTopic}>Description</Text>
        <Text style={styles.text}>{sermon_note.sermondescription}</Text>
        <TouchableOpacity
          onPress={() =>
            downloadSermon(sermon_note_id, sermon_note.notesupload)
          }
          style={styles.downloadNotesButton}>
          <Text style={styles.downloadNotesText}>Download Notes</Text>

        </TouchableOpacity>
      </View>

      {/* Sermon note scroll container */}
      <View style={homestyles.sermonNoteContainer}>
        <Text style={homestyles.sermonNotesHeading}>Sermon Notes</Text>
        <ScrollView horizontal={true}>
          {sermonsNotesLoading ? (
            <Text style={homestyles.loadingText}>Loading sermon Notes...</Text>
          ) : sermonsNotesData && sermonsNotesData.length > 0 ? (
            sermonsNotesData.map(sermonnotesclicked => (
              sermonnotesclicked.id !== sermon_note.id ? (
                <TouchableOpacity
                  key={sermonnotesclicked.id}
                  onPress={() => {
                    navigation.navigate('SermonNotesView', {
                      sermon_note: sermonnotesclicked,
                      imageUri: `${BASE_URL}/Notes_Thumbnails/${sermonnotesclicked.notesimage}`,
                      sermon_note_id: sermonnotesclicked.id
                    })
                    console.log("The clicked ID: ", sermonnotesclicked.id)
                  }
                  }>
                  <View key={sermonnotesclicked.id}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          style={homestyles.image}
                          source={{
                            uri: `${BASE_URL}/Notes_Thumbnails/${sermonnotesclicked.notesimage}`,
                          }}
                        />
                        <Text style={homestyles.sermonDate}>
                          {new Date(sermonnotesclicked.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </Text>
                        <Text style={homestyles.sermonText}>
                          {sermonnotesclicked.sermondescription.length > 25 ?
                            (sermonnotesclicked.sermondescription.slice(0, 25) + '...') :
                            (sermonnotesclicked.sermondescription)
                          }

                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ) :
              (
                  <Text style={homestyles.loadingText}>No Sermon Notes available</Text>
              )
            ))
          ) : (
            <Text style={homestyles.loadingText}>No Sermon Notes available</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>

  );
};

export default SermonNotesclickedView;
