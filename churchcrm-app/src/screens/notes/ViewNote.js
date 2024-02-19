import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../assets/css/styles';
import {BASE_URL} from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
import Icon from '../../ui/components/icon';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {Dimensions} from 'react-native';

export default function ViewNote({noteId}) {
  const navigation = useNavigation();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
        if (response.ok) {
          const responseData = await response.json();
          if (!responseData.error) {
            setData(responseData);
            // console.log(data.content);
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

    fetchData();
  }, [noteId]);

  const editNoteScreen = () => {
    navigation.navigate('EditNotes');
  };

  const [contentHeight, setContentHeight] = useState(null);
  return (
    <ScrollView>
      <View style={GlobalCss.viewNoteContainer}>
        <Text style={GlobalCss.noteTitle}>{data.note_topic}</Text>

        <View style={{flex: 1}}>
          <AutoHeightWebView
            style={{
              width: Dimensions.get('window').width - 15,
              height: contentHeight * 3.07,
              marginBottom: 10,
            }}
            customScript={`document.body.style.background = 'transparent'; document.body.style.color = '#344953'; window.ReactNativeWebView.postMessage(document.body.scrollHeight);`}
            customStyle={`
          * {
            font-family: 'Times New Roman';
            font-size: 16px;
          }
          
        `}
            onSizeUpdated={size => {
              // Update content height state
              setContentHeight(size.height);
              // console.log("Content height: ", size.height);
            }}
            files={[
              {
                href: 'cssfileaddress',
                type: 'text/css',
                rel: 'stylesheet',
              },
            ]}
            source={{
              html: `<div style="font-size: 16px;">${data.content}</div>`,
            }}
            scalesPageToFit={true}
            scrollEnabled={true}
            viewportContent={'width=device-width, user-scalable=no'}
          />
        </View>
        <Pressable
          style={GlobalCss.editNotesButton}
          onPress={() => editNoteScreen()}>
          <Text style={GlobalCss.editNotesText}>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
