import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/styles";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


export default function Notes({ userId }) {
  const navigation = useNavigation();

  const NewNoteScreen = () => {
    console.log("handleMain executed");

    navigation.navigate("NewNotes");
  };

  const editNoteScreen = () => {
    console.log("handleMain executed");

    navigation.navigate("EditNotes");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    if(userId) {
      try {
        const fetchData = async () => {
          const response = await axios.get(
            `https://39af-197-232-61-198.ngrok-free.app/api/showNotes/${userId}`
          );
          setData(response.data);
        };
        fetchData();
      } catch (error) {
        console.error("Displaying notes failed:", error);
      }
    }
  }, [userId]);
  return (
    <View>
      <TouchableOpacity onPress={NewNoteScreen} style={styles.touchableOpacity}>
        <Text style={styles.notesTitle}>
          <Icon name="note-add" size={19} /> NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={{ padding: 10 }}>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              {data.length > 0 ? (
                data.map((note) => (
                  <View style={styles.notesContainer} key={note.id}>
                    <Image
                      source={require("../../assets/images/one.jpg")}
                      style={styles.notesImage}
                    />
                    <Text style={styles.notesDateText}>
                      {new Date(note.created_at).toDateString()}
                    </Text>
                    <Text style={styles.notesTopic}>{note.note_topic}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.loadingText}>Loading ...</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
