import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../../assets/css/styles";
import axios from "axios";

export default function NewNotes({ userId }) {
  const [note_topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  
  const saveNotes = async () => {
    try {
      console.log("The content: ", note_topic, content)
      const user_id_fk = userId
      const response = await axios.post(
        "https://2b2c-197-232-61-232.ngrok-free.app/api/newNotes",
        {
          user_id_fk,
          note_topic,
          content,
        }
      );
      console.log("Notes data: ", response.data)
      navigation.navigate("Notes");
    } catch (error) {
      console.error("Notes Save failed:", error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Add Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={note_topic}
          onChangeText={setTopic}
        />

        <Text style={styles.notesLabel}>Take notes</Text>
        <TextInput
          style={styles.notesTextArea}
          multiline={true}
          value={content}
          onChangeText={setContent}
        />

        <Pressable style={styles.submitNotesButton} onPress={saveNotes}>
          <Text style={styles.submitNotes}> Add Notes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
