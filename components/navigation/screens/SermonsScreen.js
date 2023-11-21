import * as React from "react";
import { View, Text } from "react-native";

export default function Sermons({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is Sermons screen")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Sermons
      </Text>
    </View>
  );
}
