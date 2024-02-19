import * as React from "react";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        padding: 20,
      },
      username: {
        fontSize: 18,
        fontWeight: "900",
        marginTop: 30,
        paddingStart: 20,
        textAlign: "right",
        color: "white",
        padding: 10,
      },
      image_logo: {
        borderWidth: 10,
        width: 80,
        height: 80,
        borderRadius: 100,
      },
      iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      icon: {
        marginRight: 20,
      },
      linktext:{
        color: 'blue',
      },
      heading:{
        color:'white',
        fontSize: 18,
        fontWeight: "900",
      }
  });
  export { styles };
  