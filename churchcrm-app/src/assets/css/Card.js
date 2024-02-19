import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#087E8B',
    padding: 10,
  },
  notesCardText: {
    alignItems: 'flex-start', 
  },
  notesDateText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 1,
  },
  modalParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  threeDotsIcon: {
    marginLeft: 'auto',
  },
  notesModal: {
    width: '40%',
    height: 'auto',
    backgroundColor: '#f7f7f7',
    marginTop: 150,
    position: 'absolute',
    right: 0, // Adjust this value as needed to position it correctly
    top: 0,
  },
  notesTopic: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#087E8B',    
  },
  iconText: {
    color: '#086c75',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 25,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '50%',
    maxHeight: '80%',
    overflow: 'hidden',
  },

});

export {styles};
