import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { styles as Global } from '../../assets/css/Global';
import YoutubePlayer from 'react-native-youtube-iframe';
import RNFetchBlob from 'rn-fetch-blob';
import { BASE_URL } from '../../hooks/HandleApis';
import { styles } from '../../assets/css/HomeScreen';
import GlobalCss from '../../assets/css/GlobalCss';
import { fetchDataByEndpoint } from '../../hooks/HandleApis';
import { useNavigation } from '@react-navigation/native';
import SermonItem from './Item_Views/SermonItem';

const VideoPlayer = ({ sermon, setSermon }) => {
  const navigation = useNavigation()
  const videoId = extractVideoId(sermon.Sermon_Link);
  const [sermonsLoading, setSermonsLoading] = useState(true);
  const [sermonsData, setSermonsData] = useState();


  const downloadSermon = async (sermonId, notesFile) => {
    const { config, fs } = RNFetchBlob;
    console.log('Download in progress...');
    const dir =
      Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;

    const splitFileName = notesFile.split('.');
    const fileExtension = splitFileName[splitFileName.length - 1];
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

    console.log('File Extension:', fileExtension);

    const configfiles = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${sermon.Title}`,
        path: `${dir}/${Math.random()}/${sermon.Title}.${fileExtension}`,
      },
      useDownloadManager: true,
      notification: true,
      title: `${sermon.Title}`,
      path: `${dir}/${Math.random()}/${sermon.Title}.${fileExtension}`,
    };

    const configOptions = Platform.select({
      ios: configfiles,
      android: configfiles,
    });

    config(configOptions || {})
      .fetch('GET', `${BASE_URL}/api/download_notes/${sermonId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
 
  // Get other sermon recommendations
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${BASE_URL}/api/fetchSermons`);
        data = await response.json();
        setSermonsData(data);
        setSermonsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={Global.container}>
      {sermonsLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View>
          <View>
            <YoutubePlayer height={180} play={false} videoId={videoId} />
          </View>
          <View>
            <View style={Global.videoPlayerTitle}>
              <Text style={Global.title}>{sermon.Title} | </Text>
              <Text style={Global.videoPlayerDate}>
                {new Date(sermon.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10 }} />


            <Text style={Global.videoDescription}>{sermon.Sermon_Description}</Text>

            <TouchableOpacity
              onPress={() => downloadSermon(sermon.id, sermon.Sermon_Notes)}
              style={Global.downloadNotesButton}>
              <Text style={Global.downloadNotesText}>Download Notes</Text>
            </TouchableOpacity>

            {/* View Sermons Recommendations */}
            <View style={GlobalCss.container}>
              <Text style={styles.headingText}>Sermons</Text>
              <ScrollView horizontal={true}>
                {sermonsData && sermonsData.length > 0 ? (
                  sermonsData.map(sermonRec => (
                    sermonRec.id != sermon.id ? (
                        <TouchableOpacity
                          onPress={() =>
                            { setSermon(sermonRec)
                              navigation.navigate('VideoPlayer')}
                          }>
                        <SermonItem sermon={sermonRec} />
                        </TouchableOpacity>
                    ) : (
                      <></>
                    )
                  ))
                ) : (
                  <Text style={styles.loadingText}>No sermons to display</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      )
      }
    </ScrollView >
  );
};
const extractVideoId = url => {
  const youtubeRegex =
    /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;

  const match = url.match(youtubeRegex);

  if (match) {
    return match[2];
  }

  return null;
};
export default VideoPlayer;
// SUPPORTED LINKS
// https://youtu.be/SP0NTIJuwrI

{/*
<TouchableOpacity
                key={sermonRec.id}
                onPress={() =>
                  navigation.navigate('VideoPlayer', { sermon: sermonRec })
                }>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: 5,
                      paddingBottom: 20,
                    }}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${BASE_URL}/SermonThumbnails/${sermonRec.Thumbnail}`,
                        }}
                      />
                      <Text style={styles.dataDate}>
                        {new Date(sermonRec.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </Text>
                      <View style={styles.dataText}>
                        <Text style={styles.text}>
                          {sermonRec.Title.slice(0, 31)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
*/}