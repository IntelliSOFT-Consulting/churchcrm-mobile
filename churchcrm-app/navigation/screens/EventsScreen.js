import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/EventsScreen";


export default function EventsScreen({ userId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (userId) {
      axios
        .get(`https://b73c-197-232-61-219.ngrok-free.app/api/profile/${userId}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("Error exists: ", error);
        });
    }
  }, [userId]);

  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
            backgroundColor: "#03686e",
          }}
        >
         <Text style={styles.heading}>
            Events
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
