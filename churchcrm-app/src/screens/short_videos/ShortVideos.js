import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { styles } from './ShortVideosCss';
import { fetchAllData } from '../../hooks/HandleApis';
import { BASE_URL } from '../../hooks/HandleApis';
import Video from 'react-native-video';

export default function ShortVideos() {
  const [shortvideoData, setShortvideoData] = useState([]);
  const [shortvideoLoading, setShortvideoLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchAllData();
        if (responses && Array.isArray(responses)) {
          setShortvideoData(responses[4]);
          setShortvideoLoading(false);
          setSelectedVideo(responses[4][0])
        } else {
          console.error('Error fetching data: Responses array is null or not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleVideoClick = video => {
    const videourl = `${BASE_URL}/Shortvideos/${video.video_path}`;
    setSelectedVideo({ ...video, videourl });
    console.log(selectedVideo);
  };

  return (
    <View>
      <ScrollView horizontal={false}>
        <View style={styles.heroSection}>
          <View>
            <Video
              source={{
                uri: `${BASE_URL}/Shortvideos/${selectedVideo.video_path}`,
              }}
              style={{ width: 300, height: 300 }}
              controls={true}
              ref={ref => {
                this.player = ref;
              }}
            />
          </View>
        </View>
        <View style={styles.videoArraySection}>
          <Text style={styles.title}>WATCH HISTORY</Text>
          <View style={styles.videoRow}>
            {shortvideoLoading ? (
              <Text style={styles.loadingText}>Loading videos...</Text>
            ) : shortvideoData && shortvideoData.length > 0 ? (
              shortvideoData.map(video => (
                video.id !== selectedVideo.id ? (
                  <View key={video.id}>
                    <TouchableOpacity
                      style={styles.videoColumn}
                      onPress={() => handleVideoClick(video)}>
                      <ImageBackground
                        style={styles.videoImage}
                        imageStyle={styles.videoImage}
                        resizeMode="cover"
                        source={{
                          uri: `${BASE_URL}/ShortVideoThumbnails/${video.thumbnail_path}`,
                        }}>
                        <View style={styles.videoOverlay}></View>
                        <View style={styles.videoTextContainer}>
                          <Text style={styles.videoDate}>{video.date}</Text>
                          <Text style={styles.videoText}>{video.title}</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              ))
            ) : (
              <Text style={styles.loadingText}>No videos available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

