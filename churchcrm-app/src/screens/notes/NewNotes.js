import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

export default function NewNotes({userId, setReloadNotes}) {
  const [note_topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();
  const richText = useRef();

  const saveNotes = async () => {
    console.log('User id ', userId);
    try {
      const user_id_fk = userId;
      console.log('The content: ', note_topic, content, user_id_fk);
      const response = await axios.post(`${BASE_URL}/api/newNotes`, {
        user_id_fk,
        note_topic,
        content,
      });
      console.log('Notes data: ', response.data);
      if (response.status === 200) {
        setReloadNotes(true);
        navigation.navigate('Notes');
      }
    } catch (error) {
      console.error('Notes Save failed:', error);
    }
  };

  const handleHead = ({tintColor}) => (
    <Text style={{color: tintColor}}>H1</Text>
  );

  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Add Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={note_topic}
          onChangeText={setTopic}
        />

        {/* The text editor */}
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
                onChange={text => setContent(text)}
                value={content}
              />
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.submitNotesButton}
          onPress={() => {
            saveNotes();
          }}>
          <Text style={styles.submitNotes}> Add Notes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
