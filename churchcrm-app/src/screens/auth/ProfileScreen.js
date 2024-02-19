import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {useCallback} from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppSnackbar from '../../hooks/SnackBar';
import {BASE_URL} from '../../hooks/HandleApis';
import {styles as authstyles} from '../../assets/css/AuthScreens';
import GlobalCss from '../../assets/css/GlobalCss';
import {styles} from '../../assets/css/ProfileScreen';
import CustomTextInput from '../../hooks/CustomTestInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../../hooks/HandleAuth';

export default function ProfileScreen({userId, setUserId}) {
  const navigation = useNavigation();
  const {handleLogout, HandleDeletion} = useAuth();
  const [data, setData] = useState([]);
  const appSnackbarRef = useRef();
  // dropdown selection
  //
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = () => {
    fetch(`${BASE_URL}/api/profile/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  //
  const handleSignOut = async () => {
    try {
      const logout = await handleLogout();
      setUserId(logout.userId);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  // Update details

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('membership_status', value);

    if (data.profile_photo_path) {
      const uriParts = data.profile_photo_path.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('profile_photo_path', {
        uri: data.profile_photo_path,
        name: `profile_photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/updateuser/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        fetchData();
        toggleModal();
        appSnackbarRef.current.showSnackbar('Profile Update Successfully.');
      }
    } catch (error) {
      appSnackbarRef.current.showSnackbar(
        'Failed to update profile. Please try again.',
      );
    }
  };

  // Display Modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Get image
  const handleChoosePhoto = useCallback(() => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      width: 150,
      height: 150,
    };

    launchImageLibrary(options, response => {
      console.log('Getting photo', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0].uri;
        const lastDotIndex = imageUri.lastIndexOf('.');
        const fileType =
          lastDotIndex !== -1 ? imageUri.slice(lastDotIndex + 1) : '';
        console.log(imageUri);
        if (imageUri) {
          console.log('Selected image path:', imageUri);
          setData(data => ({...data, profile_photo_path: imageUri}));
        } else {
          console.log('Unable to determine image path.');
        }
      }
    });
  }, [data.profile_photo_path]);

  //dropdown
  const membership = [
    {label: 'New Member', value: 'New Member', style: {color: 'black'}},
    {label: 'Non Member', value: 'Non Member', style: {color: 'black'}},
    {label: 'Member', value: 'Member', style: {color: 'black'}},
  ];
  const [value, setValue] = useState(null);
  const ChangePassword = () => {
    navigation.navigate('ChangePassword');
  };
  // const handleSignOut = async () => {
  //   try {
  //     const logout = await handleLogout();
  //     setUserId(logout.userId);
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };
  const AccountDeletion = async () => {
    try {
      const accdeletion = await HandleDeletion();
      setUserId(accdeletion.del);
    } catch (error) {
      console.error('deletion failed');
    }
  };

  //Profile section
  const ProfileSection = ({iconName, text, onPress}) => {
    return (
      <Pressable onPress={onPress}>
        <View style={styles.containerSection}>
          <Text style={styles.icon}>
            <Icon size={20} name={iconName} />
            {text}
          </Text>
          <Icon name="edit" style={styles.icon} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={GlobalCss.container}>
      <View style={styles.header}>
        <View>
          <Image
            style={{...styles.image_logo, marginTop: 10}}
            source={{
              uri: `${BASE_URL}/Mobile_App_Profile_Pics/${data.profile_photo_path}`,
            }}
          />
        </View>
        <Text style={styles.headerText} onPress={toggleModal}>
          {data.name}
          <Icon name="edit" style={authstyles.icon} />
        </Text>
      </View>

      <View style={styles.content}>
        <View>
          <ProfileSection
            iconName="person"
            text={data.name}
            onPress={toggleModal}
          />
          <ProfileSection
            iconName="phone"
            text={data.phone}
            onPress={toggleModal}
          />
          <ProfileSection
            iconName="person"
            text={data.membership_status}
            onPress={toggleModal}
          />
          <ProfileSection
            iconName="remove-red-eye"
            text="Change Password"
            onPress={ChangePassword}
          />
          <ProfileSection
            iconName="delete"
            text="Account Deletion"
            onPress={AccountDeletion}
          />
        </View>

        <View>
          <ScrollView>
            <Modal
              isVisible={isModalVisible}
              userId={userId}
              style={styles.modal}>
              <View style={styles.modalView}>
                <View style={styles.login_view}>
                  <SafeAreaView style={styles.login_form}>
                    <Text style={styles.login_text}>Edit Details</Text>
                    <View>
                      <View style={styles.account_container}>
                        <Text style={styles.login_text}>Profile Photo</Text>
                        <TouchableOpacity
                          onPress={handleChoosePhoto}
                          style={styles.signOutButton}>
                          <Text style={styles.auth_btn_text}>
                            Choose from device
                          </Text>
                        </TouchableOpacity>
                        {data.profile_photo_path && (
                          <View>
                            <Image
                              source={{uri: data.profile_photo_path}}
                              style={styles.image}
                            />
                          </View>
                        )}
                      </View>

                      <CustomTextInput
                        iconName="user"
                        placeholder="Name"
                        value={data.name}
                        onChangeText={text =>
                          setData(data => ({...data, name: text}))
                        }
                      />

                      <CustomTextInput
                        iconName="mail"
                        placeholder="Email"
                        value={data.email}
                        onChangeText={text =>
                          setData(data => ({...data, email: text}))
                        }
                      />

                      <CustomTextInput
                        iconName="phone"
                        placeholder="Phone"
                        value={data.phone}
                        onChangeText={text =>
                          setData(data => ({...data, phone: text}))
                        }
                      />

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={membership}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                          setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                          <Icon
                            style={styles.icon}
                            color="black"
                            name="person"
                            size={20}
                          />
                        )}
                      />
                    </View>
                    <AppSnackbar ref={appSnackbarRef} />

                    <View
                      style={{
                        ...styles.account_container,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={handleUpdate}
                        title="Update"
                        style={{...styles.signOutButton, width: '35%'}}>
                        <Text
                          style={{
                            ...authstyles.auth_btn_text,
                            color: '#ffffff',
                          }}>
                          Update
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{...styles.signOutButton, width: '35%'}}
                        onPress={toggleModal}>
                        <Text style={authstyles.auth_btn_text}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
