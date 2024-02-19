import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';

import ProfileScreen from '../screens/auth/ProfileScreen';
import More from '../screens/More';

import {BASE_URL} from '../hooks/HandleApis';

import DrawerNavigatorcss from '../assets/css/DrawerNavigatorcss';
import Icon from '../ui/components/icon';

const Drawer = createDrawerNavigator();
import useAuth from '../hooks/HandleAuth';
const CustomDrawerContent = ({...props}) => {
  const {handleLogout} = useAuth();

  const {userData, setUserId} = props;

  const handleSignOut = async () => {
    try {
      const logout = await handleLogout();
      setUserId(logout.userId);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={DrawerNavigatorcss.header}>
        {userData && (
          <>
            <View style={DrawerNavigatorcss.itemContainer}>
              <Image
                source={{
                  uri: `${BASE_URL}/Mobile_App_Profile_Pics/${userData.profile_photo_path}`,
                }}
                style={DrawerNavigatorcss.image_logo}
              />
            </View>
            <Text style={DrawerNavigatorcss.NameText}>
                Hi {userData.name}
            </Text>
            <Text style={DrawerNavigatorcss.EmailText}>{userData.email}</Text>
          </>
        )}
      </View>

      {Object.entries(props.descriptors).map(([key, descriptor], index) => {
        const focused = index === props.state.index;

        return (
          <DrawerItem
            key={key}
            label={() => (
              <Text
                style={
                  focused
                    ? DrawerNavigatorcss.drawerLabelFocused
                    : DrawerNavigatorcss.drawerLabel
                }>
                {descriptor.options.title}
              </Text>
            )}
            onPress={() =>
              descriptor.navigation.navigate(descriptor.route.name)
            }
            style={[
              DrawerNavigatorcss.drawerItem,
              focused ? DrawerNavigatorcss.drawerItemFocused : null,
            ]}
          />
        );
      })}
      <View style={DrawerNavigatorcss.footer}>
        <TouchableOpacity
          style={DrawerNavigatorcss.signOutButton}
          onPress={handleSignOut}>
          <Text style={DrawerNavigatorcss.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({
  userId,
  setUserId,
  reloadNotes,
  setReloadNotes,
  setNoteId,
  navigation,
}) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (userId) {
      // console.log('userID:', userId);

      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async userId => {
    try {
      const response = await fetch(`${BASE_URL}/api/profile/${userId}`);
      const my_Data = await response.json();

      setUserData(my_Data);

      // console.log('User Data:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#087E8B',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={DrawerNavigatorcss.headerLeft}>
            <Icon name="bars" size={20} color="#ffffff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          navigation={navigation}
          userData={userData}
          userId={userId}
          setUserId={setUserId}
        />
      )}>
      <Drawer.Screen
        name="HomeScreens"
        children={() => (
          <BottomTabNavigator
            userId={userId}
            reloadNotes={reloadNotes}
            setReloadNotes={setReloadNotes}
            setNoteId={setNoteId}
          />
        )}
        options={{
          title: 'Home',
          headerTitle: '',
          headerRight: () => (
            <View style={DrawerNavigatorcss.headerRight}>
              <Icon name="bells" size={20} color="#fff" />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        children={() => <ProfileScreen userId={userId} setUserId={setUserId} />}
        options={{
          title: 'Profile',
          labelStyle: DrawerNavigatorcss.drawerLabelWhite,
          headerTitle: () => (
            <Text style={DrawerNavigatorcss.headerTitle}>Profile</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="More"
        children={() => <More userId={userId} />}
        options={{
          title: 'More',
          labelStyle: DrawerNavigatorcss.drawerLabelWhite,
          headerTitle: () => (
            <Text style={DrawerNavigatorcss.headerTitle}>More</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
