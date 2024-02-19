import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/MoreScreen";

const menuItems = [
  { iconName: "book", text: "Saved Sermons", screenName: "SavedSermonsScreen" },
  { iconName: "bookmarks", text: "Verse of the Day", screenName: "VerseOfDayScreen" },
  { iconName: "note", text: "Notes", screenName: "NotesScreen" },
  { iconName: "event", text: "Events", screenName: "EventsScreen" },
  { iconName: "share", text: "Share App", screenName: "ShareAppScreen" },
  { iconName: "info", text: "About App", screenName: "AboutAppScreen" },
  { iconName: "person", text: "Church Websites", screenName: "ChurchWebsitesScreen" },
  { iconName: "settings", text: "Settings", screenName: "SettingScreen" },
  { iconName: "person", text: "Profile Screen", screenName: "ProfileScreen" },
];

export default function More({ userId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (userId) {
      axios
        .get(`https://b73c-197-232-61-219.ngrok-free.app/api/profile/${userId}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("Error exists: ", error);
        });
    }
  }, [userId]);

  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderMenuItem = ({ iconName, text, screenName }) => {
    return (
      <TouchableOpacity key={screenName} onPress={() => navigateToScreen(screenName)}>
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
            backgroundColor: "#03686e",
          }}
        >
          <View style={styles.itemContainer}>
            <Image
              source={require("../../assets/images/one.jpg")}
              style={styles.image_logo}
            />
          </View>
          <Text style={styles.username}>
            {data.name} <Icon name="person" style={styles.icon} />{" "}
          </Text>
        </View>

        <View style={styles.container}>
          {menuItems.map((item) => renderMenuItem(item))}
        </View>
      </View>
    </ScrollView>
  );
}
