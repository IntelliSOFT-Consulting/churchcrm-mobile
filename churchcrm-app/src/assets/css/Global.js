import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  videoPlayerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 5,    
  },
  videoPlayerDate: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#000',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    alignSelf: 'center'
  },
  videoDescription: {
    fontWeight: '400',
    color: 'black',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  dataDate: {
    color: '#A29E90',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 0,
  },
  dataTopic: {
    color: '#000000',
    fontSize: 2,
    fontWeight: '600',
    paddingTop: 0,
    // borderBottomColor:
    // paddingBottom: 7,
  },
  dataSermonTopic: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 0,
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginBottom: 5,
    // borderBottomColor:
  },
  dataParagraph: {
    fontSize: 12,
    fontWeight: '600',
  },
  downloadNotesButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#087E8B',
    paddingVertical: 10,
  },
  downloadNotesText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
});
export {styles};
