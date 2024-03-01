import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { styles } from '../../assets/css/Global';
import { styles as homestyles } from '../../assets/css/HomeScreen';
import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SermonNoteItem from './Item_Views/SermonNoteItem';

const SermonNotesclickedView = ({ sermonNote, setSermonNote }) => {
  // const { sermonNote, imageUri, sermonNote_id } = route.params;
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const navigation = useNavigation();


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
        `${BASE_URL}/api/download_sermonNotes/${noteID}`,
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
        let response = await fetch(`${BASE_URL}/api/fetchSermonnotes`);
        data = await response.json();
        setSermonsNotesData(data);
        setSermonsNotesLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {sermonsNotesLoading ? (
        <Text style={homestyles.loadingText}>Loading...</Text>
      ) : (
        <View>
          <View style={styles.container}>
            <Image style={styles.itemImage} source={{
              uri: `${BASE_URL}/Notes_Thumbnails/${sermonNote.notesimage}`,
            }} />
            <Text style={styles.dataDate}>
              {new Date(sermonNote.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.dataSermonTopic}>Description</Text>
            <Text style={styles.text}>{sermonNote.sermondescription}</Text>
            <TouchableOpacity
              onPress={() =>
                downloadSermon(sermonNote.id, sermonNote.notesupload)
              }
              style={styles.downloadNotesButton}>
              <Text style={styles.downloadNotesText}>Download Notes</Text>

            </TouchableOpacity>
          </View>

          {/* Sermon note scroll container */}
          <View style={homestyles.sermonNoteContainer}>
            <Text style={homestyles.sermonNotesHeading}>Sermon Notes</Text>
            <ScrollView horizontal={true}>
              {sermonsNotesData && sermonsNotesData.length > 0 ? (
                sermonsNotesData.map(sermonnotesclicked => (
                  sermonnotesclicked.id != sermonNote.id ? (
                    <TouchableOpacity
                      onPress={() => {
                        setSermonNote(sermonnotesclicked)
                        navigation.navigate('SermonNotesView')
                      }
                      }>
                      <SermonNoteItem sermonNote={sermonnotesclicked} />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )
                ))
              ) : (
                <Text style={styles.loadingText}>No sermon notes to display</Text>
              )}
            </ScrollView>
          </View>
        </View>
      )}

    </ScrollView>

  );
};

export default SermonNotesclickedView;
