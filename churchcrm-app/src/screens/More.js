import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '../ui/components/icon';
import {styles} from '../assets/css/MoreScreen';
import {BASE_URL} from '../hooks/HandleApis';
import ProfileScreen from './auth/ProfileScreen';

const menuItems = [
  {
    iconName: 'videocamera',
    text: 'Saved Sermons',
    screenName: 'SavedSermonsScreen',
  },
  {
    iconName: 'wordfile1',
    text: 'Verse of the Day',
    screenName: 'VerseOfDayScreen',
  },
  {iconName: 'codepen-circle', text: 'Notes', screenName: 'Notes'},
  {iconName: 'picture', text: 'Events', screenName: 'EventsScreen'},
  {iconName: 'sharealt', text: 'Share App', screenName: 'ShareAppScreen'},
  {iconName: 'info', text: 'About App', screenName: 'AboutAppScreen'},
  {
    iconName: 'link',
    text: 'Church Websites',
    screenName: 'ChurchWebsitesScreen',
  },
  {iconName: 'setting', text: 'Settings', screenName: 'SettingScreen'},
  {iconName: 'user', text: 'Profile Screen', screenName: 'ProfileScreen'},
];

export default function More({userId}) {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL}/api/profile/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          // setUserId(setUserId);
          // console.log('User Data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);
  const NavigateProfileScreen = () => {
    navigation.navigate(ProfileScreen);
  };
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderMenuItem = ({iconName, text, screenName}) => {
    return (
      <TouchableOpacity
        key={screenName}
        onPress={() => navigateToScreen(screenName)}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} style={styles.icon} />
          <Text style={styles.linktext}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.MoreContainer}>
          <View style={styles.itemContainer}>
            <Image
              source={{
                uri: `${BASE_URL}/Mobile_App_Profile_Pics/${data.profile_photo_path}`,
              }}
              style={styles.image_logo}
            />
          </View>
          <Text style={styles.username} onPress={NavigateProfileScreen}>
            {data.name} <Icon name="rightcircle" style={styles.icon} />
          </Text>
        </View>

        <View style={styles.container}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>
      </View>
    </ScrollView>
  );
}
