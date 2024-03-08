import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LandingScreen from './src/LandingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ProfileScreen from './src/screens/auth/ProfileScreen';
import SettingScreen from './src/screens/auth/SettingScreen';
import NewNotes from './src/screens/notes/NewNotes';
import DocumentViewer from './src/screens/sermon_notes/DocumentViewer';
import EventsScreen from './src/screens/events/EventsScreen';
import AnnouncementView from './src/screens/announcements/AnnouncementView';
import SermonNotesView from './src/screens/sermon_notes/SermonNotesView';
import EventView from './src/screens/events/EventView';
import VideoPlayer from './src/screens/sermons/VideoPlayer';
import SplashScreen from './src/SplashScreen';
import VerseOfTheDay from './src/screens/VerseOfTheDay/VerseOfTheDay';
import useAuth from './src/hooks/HandleAuth';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import EditNotes from './src/screens/notes/EditNotes';
import ViewNote from './src/screens/notes/ViewNote';
import ChangePassword from './src/screens/auth/ChangePassword';
import ResetCode from './src/screens/auth/ResetCode';
import NewPassword from './src/screens/auth/NewPassword';
import SermonScreen from './src/screens/sermons/SermonScreen';
import SermonNoteItem from './src/screens/sermon_notes/SermonNoteItem';
import EventItem from './src/screens/events/EventItem';

function App() {
  const ALLOWED_IDLE_TIME = 6 * 60 * 60 * 1000; // 6 hours

  const {getStoredUserData} = useAuth();
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [reloadNotes, setReloadNotes] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [sermonNote, setSermonNote] = useState(null);
  const [sermon, setSermon] = useState(null);

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'inactive') {
        try {
          const prevNavTime = await AsyncStorage.getItem('prevNavTime');
          const storedUserData = await getStoredUserData();

          const currentTime = Date.now();
          if (prevNavTime) {
            const prevTime = parseInt(prevNavTime, 10);
            const idleTime = currentTime - prevTime;
            if (idleTime > ALLOWED_IDLE_TIME) {
              console.log('2 -  User is logged out due to inactivity.');
              setUserId(null);
            } else {
              console.log('3 User Not inactivity.');

              const fetchUserId = async () => {
                if (
                  storedUserData &&
                  storedUserData.retrieved_userId &&
                  storedUserData.retrieved_token
                ) {
                  setUserId(storedUserData.retrieved_userId);
                  setToken(storedUserData.retrieved_token);
                } else {
                  setUserId(null);
                  setToken(null);
                }
              };
              fetchUserId();
            }
          }
          await AsyncStorage.setItem('prevNavTime', currentTime.toString());
        } catch (error) {
          console.error('Error handling app state change:', error);
        }
      } else {
        const fetchUserId = async () => {
          const storedUserData = await getStoredUserData();
          if (
            storedUserData &&
            storedUserData.retrieved_userId &&
            storedUserData.retrieved_token
          ) {
            setUserId(storedUserData.retrieved_userId);
            setToken(storedUserData.retrieved_token);
          } else {
            setUserId(null);
            setToken(null);
          }
        };
        fetchUserId();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  }, [ALLOWED_IDLE_TIME, getStoredUserData]);

  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {userId == null ? (
            <>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginScreen"
                children={() => (
                  <LoginScreen
                    setUserId={setUserId}
                    userId={userId}
                    setToken={setToken}
                    token={token}
                    // setLoginTime={setLoginTime}
                    // loginTime={loginTime}
                  />
                )}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{title: 'Register'}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{title: 'Reset Password'}}
              />
              <Stack.Screen
                name="Resetpasswordcode"
                component={ResetCode}
                options={{title: 'Reset Code'}}
              />
              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{title: 'New Password'}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="DrawerNavigator"
                children={() => (
                  <DrawerNavigator
                    userId={userId}
                    setUserId={setUserId}
                    reloadNotes={reloadNotes}
                    setReloadNotes={setReloadNotes}
                    setNoteId={setNoteId}
                    noteId={noteId}
                    setAnnouncement={setAnnouncement}
                    announcement={announcement}
                    setSermonNote={setSermonNote}
                    sermonNote={sermonNote}
                    setSermon={setSermon}
                    sermon={sermon}
                  />
                )}
                options={{headerShown: false, title: ''}}
              />

              <Stack.Screen
                name="ProfileScreen"
                children={() => (
                  <ProfileScreen userId={userId} setUserId={setUserId} />
                )}
                options={{title: 'Profile'}}
              />
              <Stack.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{title: 'Settings'}}
              />
              <Stack.Screen
                name="NewNotes"
                children={() => (
                  <NewNotes userId={userId} setReloadNotes={setReloadNotes} />
                )}
                options={{
                  title: 'Notes',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="EditNotes"
                children={() => (
                  <EditNotes
                    userId={userId}
                    setReloadNotes={setReloadNotes}
                    reloadNotes={reloadNotes}
                    noteId={noteId}
                  />
                )}
                options={{
                  title: 'Notes',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="ViewNote"
                children={() => <ViewNote noteId={noteId} />}
                options={{
                  title: 'Notes',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />

              <Stack.Screen
                name="DocumentViewer"
                component={DocumentViewer}
                options={{
                  title: 'Documents',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="EventsScreen"
                component={EventsScreen}
                options={{
                  title: 'Events',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="EventsItem"
                component={EventItem}
                options={{
                  title: 'Events',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="AnnouncementView"
                children={() => (
                  <AnnouncementView
                    announcement={announcement}
                    setAnnouncement={setAnnouncement}
                  />
                )}
                options={{
                  title: 'Announcements',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="AnnouncementItem"
                children={() => (
                  <AnnouncementView announcement={announcement} />
                )}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="EventView"
                component={EventView}
                options={{
                  title: 'Events',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="VideoPlayer"
                children={() => (
                  <VideoPlayer sermon={sermon} setSermon={setSermon} />
                )}
                options={{
                  title: 'Sermons',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="SavedSermonsScreen"
                component={SermonScreen}
                options={{
                  title: 'Sermons',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="VerseOfDayScreen"
                component={VerseOfTheDay}
                options={{
                  title: 'Daily Verse',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />

              <Stack.Screen
                name="SermonNotesView"
                children={() => (
                  <SermonNotesView
                    setSermonNote={setSermonNote}
                    sermonNote={sermonNote}
                  />
                )}
                options={{
                  title: 'Sermon Notes',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="SermonNoteItem"
                children={() => <SermonNoteItem sermonNote={sermonNote} />}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  title: 'Reset Password',
                  headerStyle: {
                    backgroundColor: '#087E8B',
                    height: 50,
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
