import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import SermonScreen from '../screens/sermons/SermonScreen';
import EventsScreen from '../screens/EventsScreen';
import Notes from '../screens/Notes';
import HomeStackNavigator from '../screens/home/HomeScreen';

const HomeScreen = 'Home';
const Sermons = 'Sermons';
const notes = 'Notes';
const events = 'Events';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ userId, reloadNotes, setReloadNotes, setNoteId }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          const { name } = route;

          if (name === HomeScreen) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (name === Sermons) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (name === notes) {
            iconName = focused ? 'document-text' : 'document-text-outline';

          } else if (name === events) {
            iconName = focused ? 'notifications' : 'notifications-outline';

          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        style: {
          padding: 10,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarVisible: false,
          title: 'Home',
          headerRight: () => (
            <View style={DrawerNavigatorcss.headerRight}>
              <Icon name="bells" size={20} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sermons"
        component={SermonScreen}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="Notes"
        children={() => (
          <Notes
            userId={userId}
            setReloadNotes={setReloadNotes}
            reloadNotes={reloadNotes}
            setNoteId={setNoteId}
          />
        )}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
