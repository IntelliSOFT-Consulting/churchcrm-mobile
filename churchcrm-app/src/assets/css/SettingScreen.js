import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  ScrollView: {
    paddingHorizontal: 20,
  },
  viewContainer: {
    // marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontFamily: 'Poppins',
    fontWeight: '800',
    fontSize: 20,
    color: '#0A7E8B',
    marginLeft: 10,
  },
  themeOptions: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  radio: {
    alignItems: 'flex-start',
    color: '#0A7E8B',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0A7E8B',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#344953',
  },
});
export {styles};
