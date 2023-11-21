import * as React from "react";
import { View, Text } from "react-native";

export default function Notes({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is Notes screen")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Notes
      </Text>
    </View>
  );
}
