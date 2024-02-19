import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    img_view: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: 150,
      height: 150,
      // resizeMode: "contain",
    },

    login_view: {
      paddingTop: 80,
      paddingBottom: 80,
      width: "100%",
    },
    login_text: {
      fontSize: 20,
      fontFamily: "sans-serif",
      fontWeight: "900",
      color: "blue",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "gray",
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
    },
    input: {
      flex: 1,
      marginLeft: 10,
    },
    iconContainer: {
      position: "absolute",
      right: 10,
    },
    icon: {
      width: 20,
      height: 20,
      // resizeMode: "contain",
    },
    pickerStyles: {
      width: '100%',
      color: 'black'
    },
    touchButton: {
      paddingVertical: 10,
      width: "100%",
      height: "auto",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#163c94",
      marginTop: 30,
      borderRadius: 30,
    }
  });

  //auth functionality
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [membership, setMembership] = useState();
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://2b2c-197-232-61-232.ngrok-free.app/api/register",
        {
          name,
          email,
          phone,
          password,
        }
      );
      if (response && response.data) {
        const token = response.data.token;
        navigation.navigate("MainContainer");
      } else {
        console.error("Registration failed: No data in the response");
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data.errors : error.message
      );
    }
  };

  //end auth functionality

  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/kcc-logo.png")}
          />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Sign up</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
  
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              title="Submit"
              style={styles.touchButton}
            >
            <Text style={{ fontSize: 20, color: "white" }}>Sign up</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "900",
                fontSize: 18,
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              Have an account? Log in
            </Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}
