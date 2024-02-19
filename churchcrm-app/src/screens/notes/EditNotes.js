import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

export default function EditNotes({noteId, reloadNotes, setReloadNotes}) {
  const navigation = useNavigation();
  const [note_topic, setTopic] = useState('');
  const [userID, setUserid] = useState('');
  const richText = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
      if (response.ok) {
        const responseData = await response.json();
        if (!responseData.error) {
          setTopic(responseData.note_topic);
          setUserid(responseData.userID);
          if (richText.current) {
            richText.current.setContentHTML(responseData.content);
          }
        } else {
          console.error('Note not found');
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Displaying notes failed:', error);
    }
  };

  const updateNote = async () => {
    try {
      const contentHtml = await richText.current.getContentHtml();
      const response = await axios.post(
        `${BASE_URL}/api/updateNote/${noteId}`,
        {
          userID,
          note_topic,
          content: contentHtml,
        },
      );
      if (response.status === 200) {
        setReloadNotes(true);
        navigation.navigate('Notes');
      }
    } catch (error) {
      console.error('Notes Update failed:', error);
    }
  };

  const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>p</Text>;

  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Edit Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={note_topic}
          onChangeText={text => setTopic(text)}
        />

        <Text style={styles.notesLabel}>Take notes</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            style={{marginTop: 10}}
            editor={richText}
            actions={[
              actions.setBold,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
            ]}
            iconMap={{[actions.heading1]: handleHead}}
          />

          <Pressable
            style={styles.inputfield}
            onPress={() => {
              richText.current.focusContentEditor();
            }}>
            <ScrollView>
              <RichEditor
                style={styles.textarea}
                ref={richText}
                onChange={() => {}}
              />
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
        <View>
          <TouchableOpacity
            style={styles.submitNotesButton}
            onPress={updateNote}>
            <Text style={styles.submitNotes}>Update Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
