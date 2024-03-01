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
    width: '90%',
    height: 150,
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
    width: '90%',
  },
  dataText: {
    height: 'auto',
    width: 150,
  },
  sectionTitle: {
    color: '#087E8B',
    fontSize: 20,
    fontWeight: '900',
    borderBottomWidth: 1.5,
    borderBottomColor: '#087E8B',
    paddingBottom: 5,
    marginBottom: 10,
  },
  dataTopic: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1.5,
  },
  dataParagraph: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  eventRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A7E8B',
    textAlign: 'center',
    marginVertical: 50,
  },
});
export {styles};
