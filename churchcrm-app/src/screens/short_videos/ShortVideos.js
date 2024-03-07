import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {styles} from './ShortVideosCss';
import {fetchDataByEndpoint} from '../../hooks/HandleApis';
import {BASE_URL} from '../../hooks/HandleApis';

export const fetchShortVideo = async () => {
  return fetchDataByEndpoint('fetchShortVideo');
};

export default function ShortVideos() {
  const [shortvideoData, setShortvideoData] = useState([]);
  const [shortvideoLoading, setShortvideoLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState({
    id: 0,
    date: 'Default Date',
    title: 'Default Title(default video)',
    thumbnail_path: `${BASE_URL}/ShortVideoThumbnails/default_thumbnail.jpeg`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchShortVideo();
        setShortvideoData(videos);
        setShortvideoLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleVideoClick = video => {
    setSelectedVideo(video);
  };

  return (
    <View>
      <ScrollView horizontal={false}>
        <View style={styles.heroSection}>
          <ImageBackground
            style={styles.image}
            imageStyle={styles.image}
            resizeMode="cover"
            source={{
              uri: `${BASE_URL}/ShortVideoThumbnails/${selectedVideo.thumbnail_path}`,
            }}>
            <View style={styles.imageOverlay}></View>
            <View style={styles.textContainer}>
              <Text style={styles.dataDate}>{selectedVideo.date}</Text>
              <Text style={styles.text}>{selectedVideo.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.videoArraySection}>
          <Text style={styles.title}>WATCH HISTORY</Text>
          <View style={styles.videoRow}>
            {shortvideoLoading ? (
              <Text style={styles.loadingText}>Loading short videos...</Text>
            ) : shortvideoData.length > 0 ? (
              shortvideoData.map(video => (
                <TouchableOpacity
                  key={video.id}
                  style={styles.videoColumn}
                  onPress={() => handleVideoClick(video)}>
                  <ImageBackground
                    style={styles.videoImage}
                    imageStyle={styles.videoImage}
                    resizeMode="cover"
                    source={{
                      uri: `${BASE_URL}/ShortVideoThumbnails/${video.thumbnail_path}`,
                    }}>
                    <View style={styles.videoOverlay}>
                      <Text>Video Overlay</Text>
                    </View>
                    <View style={styles.videoTextContainer}>
                      <Text style={styles.videoDate}>{video.date}</Text>
                      <Text style={styles.videoText}>{video.title}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.loadingText}>No short videos available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
