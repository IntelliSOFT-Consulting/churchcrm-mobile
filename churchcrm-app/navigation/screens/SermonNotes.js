import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/styles";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SermonNotes({ route }) {
    const navigation = useNavigation();

    const [note_topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [editableText, setEditableText] = useState(true);

    const [sermonColor, setSermonColor] = useState("");
    const [notesColor, setNotesColor] = useState("");
    const FILE_BASE = "https://39af-197-232-61-198.ngrok-free.app";

    const { sermonId } = route.params;

    const url = `${FILE_BASE}/api/fetch/sermonNotes/${sermonId}`;

    const handleSermonNotes = (activeColor) => {
        // Toggling color for take notes and active sermon notes
        if (activeColor) {
            setSermonColor("#000000")
            setNotesColor("#087E8B")
            setEditableText(true)
            setContent(note_topic)
        }
        else {
            setSermonColor("#087E8B")
            setNotesColor("#000000")
            setEditableText(false)
            // Displaying the sermon notes
            setContent(data.text)   
        }
    };

    useEffect(() => {

        handleSermonNotes(true)

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setLoading(false);
                console.log("Fetching sermon data: ")
            })
            .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
                setLoading(false);
            });
    }, []);

    const saveNotes = async () => {
        try {
            // Set the value for note_topic 
            if (!note_topic) {
                setTopic(data.Title)
            }

            console.log("The content: ", note_topic, content)
            const user_id_fk = userId

            const response = await axios.post(
                "https://3829-197-232-61-194.ngrok-free.app/api/newNotes",
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

            <View style={{ padding: 10 }}>
                <ScrollView horizontal={false}>
                    <View style={styles.rowContainer}>
                        <View style={styles.notesContainer} >
                            <Image
                                source={{
                                    uri: `${FILE_BASE}/SermonThumbnails/${data.Thumbnail}`,
                                }}
                                style={styles.notesImage}
                            />
                            <Text style={styles.notesDateText}>
                                {new Date(data.created_at).toDateString()}
                            </Text>
                            <Text style={styles.notesTopic}>{data.Title}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.notesContainer}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `${FILE_BASE}/SermonThumbnails/${data.Thumbnail}`,
                            }}
                        />
                    </View>

                </View>
                <View><Text></Text></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.takeNotesLabel} onPress={() => { handleSermonNotes(true) }}>
                        <Text style={{ ...styles.takeNotes , color:notesColor}} >TAKE NOTES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.takeNotesLabel} onPress={() => { handleSermonNotes(false) }}>
                        <Text style={{ ...styles.sermonNotes, color:sermonColor }} >SERMON NOTES</Text>
                    </TouchableOpacity>
                </View>
                
               <ScrollView>
                    {editableText ? (  <TextInput
                        style={styles.notesInput}
                        multiline={true}
                        value={content}
                        onChangeText={setContent}
                        editable={editableText}
                    />) : 
                        (<Text style={styles.sermonTextArea}>{data.text}</Text>)}
                </ScrollView> 
                

                <Pressable style={styles.submitNotesButton} onPress={saveNotes}>
                    <Text style={styles.submitNotes}> Add Notes</Text>
                </Pressable>

            </View>
        </ScrollView>
    );
}
