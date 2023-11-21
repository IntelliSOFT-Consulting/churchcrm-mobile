import * as React from "react";
import { View, Text } from "react-native";

export default function More({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is More screen")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        More
      </Text>
    </View>
  );
}
