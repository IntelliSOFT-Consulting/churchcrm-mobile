import * as React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  TextStyle:{

    fontSize: 18,
    fontWeight: '700',
  },
  headingText:{
        fontSize: 18,
        fontWeight: '900',
        marginTop: 30,
        color: 'green',
      
  },
});
export { styles };
