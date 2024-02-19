import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A7E8B',
    textAlign: 'center',
    marginVertical: 50,
  },
  sermonTouchable: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  dataDate: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    paddingTop: 7,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 5,
  },
});
export {styles};
