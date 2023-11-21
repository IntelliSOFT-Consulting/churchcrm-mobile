import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./navigation/screens/HomeScreen";
import More from "./navigation/screens/More";
import SermonsScreen from "./navigation/screens/SermonsScreen";
import Notes from "./navigation/screens/Notes";
import SplashScreen from "./splash-screen/SplashScreen";

const Home = "Home";
const Sermons = "Sermons";
const notes = "Notes";
const more = "More";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(()=>{
    const splashTimeout = setTimeout(()=>{
      setSplashVisible(false);
    }, 2000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  if(isSplashVisible){
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            let rn = route.name;

            if (rn === Home) {
              icon = focused ? "home" : "home-outline";
            } else if (rn === Sermons) {
              icon = focused ? "list" : "list-outline";
            } else if (rn === notes) {
              icon = focused ? "document-text" : "document-text-outline";
            } else if (rn === more) {
              icon = focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline";
            }

            return <Ionicons name={icon} size={size} color={color} />;
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
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sermons" component={SermonsScreen} />
        <Tab.Screen name="Notes" component={Notes} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}