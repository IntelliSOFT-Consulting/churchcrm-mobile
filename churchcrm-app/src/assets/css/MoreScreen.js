import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  MoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#03686e',
  },
  username: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 30,
    paddingStart: 20,
    textAlign: 'right',
    color: 'white',
    padding: 10,
  },
  image_logo: {
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
    color: '#0A7E8B',
    fontSize: 20,
  },
  linktext: {
    color: '#0A7E8B',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
});
export {styles};
