import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
  },
  viewStyles: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  dataDate: {
    color: '#A29E90',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 7,
  },
  text: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
  },
  dataText: {
    height: 'auto',
    width: 150,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 25,
    fontWeight: '900',
  },
  dataTopic: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    paddingTop: 7,
    paddingBottom: 7,
  },
  dataParagraph: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
});
export {styles};
