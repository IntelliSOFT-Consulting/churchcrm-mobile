import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  Share,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../assets/css/styles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
import { styles as card } from '../../assets/css/Card';
// import Modal from 'react-native-modal';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';

export default function Notes({
  userId,
  reloadNotes,
  setReloadNotes,
  setNoteId,
  noteId,
}) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("Modal states: ", isModalVisible)
    setModalVisible(!isModalVisible);
  };


  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/showNotes/${userId}`);
      if (response.ok) {
        const responseData = await response.json();
        console.log("RESPONSE DATA: ", responseData)
        if (!responseData.error) {
          setData(responseData);
        } else {
          console.log('Error displaying notes.');
        }
      } else {
        console.error('Failed to fetch notes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('Reloading: ', reloadNotes); //
    console.log("Modal state: ", isModalVisible)

    setReloadNotes(false);
  }, [reloadNotes]);

  const refreshData = () => {
    setIsRefreshing(true);
    fetchData().then(() => setIsRefreshing(false));
  };

  const NewNoteScreen = () => {
    navigation.navigate('NewNotes');
  };

  const viewNoteScreen = myNoteId => {
    setNoteId(myNoteId);
    navigation.navigate('ViewNote');
  };

  const editNoteScreen = () => {
    navigation.navigate('EditNotes');
  };

  const showAlert = myNoteId => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          onPress: () => setModalVisible(!isModalVisible),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteNote(myNoteId) },
      ],
      { cancelable: true }
    );
  }

  const deleteNote = async () => {

    try {
      const response = await fetch(`${BASE_URL}/api/deletenote/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      console.log('Note deleted successfully');
      refreshData(); // Refresh data after successful deletion
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };
  //share
  const fetchNoteContent = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
      if (response.ok) {
        const notesData = await response.json();
        if (!notesData.error) {
          return notesData;
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
  const shareNote = async () => {
    const mySharedNote = await fetchNoteContent(noteId);
    const noteContent = mySharedNote.content
    const convertedText = noteContent.replace(/<[^>]+>/g, '');
    Share.share({
      message: convertedText,
      title: mySharedNote.note_topic,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const openModal = (myNoteId) => {
    setNoteId(myNoteId);
    setModalVisible(!isModalVisible)
  }
  return (
    <View>
      <TouchableOpacity style={styles.notesPageTitle} onPress={NewNoteScreen} >
        <Icon name="note-add" size={19} color='#087E8B' />
        <Text style={styles.notesTitle}>
          NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView >
        <View style={GlobalCss.container}>
          <ScrollView horizontal={false}>
            <View style={styles.colContainer}>
              {data && data.length > 0 ? (
                data.map(notes => (
                  <View key={notes.id} >
                    <Pressable style={styles.modalParent} onPress={() => viewNoteScreen(notes.id)}>
                      <View>
                        <View style={card.cardContainer}>
                          <View style={card.notesContainer}>
                            <Text style={card.notesDateText}>
                              {moment(notes.updated_at).format('DD MMMM yy - HH:mm a')}
                            </Text>
                            <Text style={card.notesTopic}>{notes.note_topic}</Text>
                          </View>
                          <Pressable
                            style={card.threeDotsIcon}
                            onPress={() => openModal(notes.id)}>
                            <Icon name={'more-vert'} size={26} color="#ffffff" />
                          </Pressable>
                        </View>

                        <Modal
                          visible={isModalVisible}
                          style={card.notesModal}
                          transparent={true}
                        >
                          <Pressable
                            style={card.overlay}
                            onPress={() => setModalVisible(false)}>
                            <View style={card.modalView}>
                              <Pressable style={{ ...card.modalContent, marginTop: 0 }} onPress={() => editNoteScreen(notes.id)}>
                                <View><Icon name={'edit'} color="#087E8B" size={20} /></View>
                                <View><Text style={card.iconText}>Edit</Text></View>
                              </Pressable>
                              <Pressable style={card.modalContent} onPress={() => showAlert(notes.id)}>
                                <View><Icon name={'delete'} color="#087E8B" size={20} /></View>
                                <View><Text style={card.iconText}>Delete</Text></View>
                              </Pressable>
                              <Pressable style={card.modalContent} onPress={() => {
                                shareNote(notes.id)
                              }}>
                                <View><Icon name={'share'} color="#087E8B" size={20} /></View>
                                <View><Text style={card.iconText}>Share</Text></View>
                              </Pressable>
                            </View>
                          </Pressable>
                        </Modal>
                      </View>
                    </Pressable>
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
