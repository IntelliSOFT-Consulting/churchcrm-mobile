import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
  },
  itemContainer: {
    marginRight: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
export { styles };
