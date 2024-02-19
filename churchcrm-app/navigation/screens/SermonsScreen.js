import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { styles } from "../../assets/css/SermonsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Sermons({ userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()
  const FILE_BASE = "https://39af-197-232-61-198.ngrok-free.app";

  const url = `${FILE_BASE}/api/fetchSermons`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
        setLoading(false);
      });
  }, []);

  // Function to redirect to sermon notes
  const handlePress = (sermonId, userId) => {
    console.log("Navigating with sermonId:", sermonId);
    console.log("Navigating with userId:", userId);
    navigation.navigate("SermonNotes", { sermonId, userId });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            For I Know the plans I have {"\n"}
            for you, declares the{"\n"}
            Lord, plans for welfare and{"\n"}
            not for evil, to give you a{"\n"}
            future and hope.
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginTop: 30,
            }}
          >
            Jeremiah 29:11
          </Text>
        </View>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            marginTop: 30,
            paddingStart: 20,
            color: "black",
          }}
        >
          WATCH HISTORY
        </Text>
        <ScrollView horizontal={false}>
          <View style={styles.rowContainer}>
            {loading ? (
              <Text>Loading Sermons...</Text>
            ) : (
              data.map((sermon) => (
                <View style={styles.itemContainer} key={sermon.id}>
                  <TouchableOpacity onPress={() => handlePress(sermon.id)} >
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${FILE_BASE}/SermonThumbnails/${sermon.Thumbnail}`,
                      }}
                    />
                    <Text>{sermon.Title}</Text>
                  </TouchableOpacity>
                </View>

              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
