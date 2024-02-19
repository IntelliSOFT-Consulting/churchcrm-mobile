import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  Text,
  Button,
  ImageBackground,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("SignupScreen");
  };
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const screens = ()=> {
    navigation.navigate("MainContainer");
  };

  const buttonStyle = {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2390EF",
    borderRadius: 20,
    width: 300,
    height: 40,
    elevation: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  };
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
      resizeMode: "contain",
    },
    verse_view: {
      paddingTop: 80,
      paddingBottom: 80,
      width: "80%",
      alignItems: "center",
    },
    verse_text: {
      fontSize: 20,
      fontFamily: "sans-serif",
      marginBottom: 20,
    },
    verse: {
      fontFamily: "sans-serif",
      fontSize: 20,
      fontStyle: "italic",
      fontWeight: "900",
    },
    auth_btn: {
      alignItems: "center",
    },
    login_btn: {
      paddingVertical: 10,
      backgroundColor: "#48A6F9",
      borderRadius: 20,
      width: "80%",
      height: 40,
      elevation: 5,
      alignItems: "center",
      justifyContent: "flex-end",
    },

    signin_btn: {
      paddingVertical: 10,
      borderRadius: 20,
      width: "80%",
      height: "auto",
      elevation: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      borderWidth: 3,
      borderColor: "white",
      backgroundColor: 'lightblue',
      marginTop: 30,
      borderRadius: 30,
    },

    forgot_password: {
      fontSize: 18,
      marginTop: 30,
      fontWeight: "900",
    },
  });

  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require("../assets/images/kcc-logo.png")}
          />
        </View>
        <View style={styles.verse_view}>
          <Text style={styles.verse_text}>
            For I know the plans i have{"\n"}
            for you, declares the{"\n"}
            Lord, plans for welfare and{"\n"}
            not for evil, to give you a{"\n"}
            future and hope.
          </Text>
          <Text style={styles.verse}>Jeremiah 29:11 </Text>
        </View>
        <View style={styles.auth_btn}>
          <Pressable onPress={handleLogin} style={styles.login_btn}>
            <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
          </Pressable>

          <Pressable onPress={handleSignUp} style={styles.signin_btn}>
            <Text style={{ fontSize: 20, color: "white" }}>Sign up</Text>
          </Pressable>
          <Pressable onPress={screens}>
                      <Text style={styles.forgot_password}>Forgot password?</Text>

          </Pressable>
        </View>
        {/* <StatusBar style="auto" /> */}
      </ScrollView>
    </View>
  );
}
