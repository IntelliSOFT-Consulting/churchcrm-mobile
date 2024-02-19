import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../../assets/css/styles";

export default function NewNotes({ navigation, notesId }) {

    const updateUrl = ''
    const getUrl = ''
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData,
    }

    const [data, setData] = useState({
        id: null,
        Topic: '',
        Notes: ''
    })

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        })
    }

    const getNotes = () => {

    }

    const updateNotes = () => {
        useEffect(() => {
            try {
                const jsonData = JSON.stringify(data);

                fetch(updateUrl, options)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log("An error occured: ", error)
                    })
            }
            catch (error) {
                console.error("An error occurred:", error)
            }

        }, [notesId]);
    }

    return (
        <ScrollView>
            <View style={styles.newNotesContainer}>
                <Text style={styles.notesLabel}>Take notes</Text>

                <Text style={styles.notesLabel}>{data.Topic}</Text>
                <TextInput
                    style={styles.notesTextArea}
                    multiline={true}
                    value={data.Notes}
                    onChangeText={(text) => handleChange(data.Notes, text)}
                />


                <Pressable style={styles.submitNotesButton} onPress={updateNotes}>
                    <Text style={styles.submitNotes}>Update Notes</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
