import {
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({

  inputContainer: {
    flexDirection: "col",
    alignItems: "start",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  textarea: {
    flex: 1,
    marginLeft: 10,
    height: 100,

  },

  // Notes Page Styling
  notesTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 25,
    paddingStart: 20,
    textAlign: "right",
    color: "#087E8B",
  },
  rowContainer: {
    flexDirection: "col",
    padding: 10,
    resizeMode: "cover",
  },
  notesContainer: {
    marginBottom: 20,
  },
  notesImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  notesDateText: {
    position: 'absolute',
    bottom: 35,
    left: 10,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#087E8B"
  },

  // Styling NewNotes Page
  newNotesContainer: {
    flexDirection: "col",
    alignItems: "start",
    padding: 10,
  },
  notesTopic: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesInput: {
    flex: 1,
    height: 150,
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: "700",
    paddingTop: 15,
    paddingBottom: 5,
    color: "#414141"
  },
  notesTextArea: {
    height: 100,
    flex: 1,
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white"
  },
  submitNotes: {
    color: "white",
    fontSize: 14,
    fontWeight: "700"
  },
  submitNotesButton: {
    marginTop: 20,
    backgroundColor: "#087E8B",
    width: 100,
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 10,
    borderRadius: 8,

  },

  // SermonNotes Page
  takeNotesLabel: {
    display: "flex",
  },

  takeNotes: {
    alignSelf: "flex-start",
    color: "#087E8B",
    fontSize: 14,
    fontWeight: "900",
    paddingBottom: 10,
  },
  sermonNotes: {
    alignSelf: "flex-end",
    color: "#087E8B",
    fontSize: 14,
    fontWeight: "900",
    paddingBottom: 10,
  },

  sermonTextArea: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
    textAlign: "left",
    width: "100%",
  }

});
export { styles };
