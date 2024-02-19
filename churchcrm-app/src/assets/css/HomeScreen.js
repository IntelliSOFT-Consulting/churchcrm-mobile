import * as React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  verse_background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.8 )',
    borderBottomWidth: 3,
    borderBottomColor: '#E53436',
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  verseImage: {
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    color: '#201E1F',
  },
  passage: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },
  verse: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 20,
    color: 'white',
  },
  headingText: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 10,
    color: '#0A7E8B',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A7E8B',
    textAlign: 'center',
    marginVertical: 50,
  },
  verseLoadingText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: '20%',
  },
  shareButtonContainer: {
    backgroundColor: '#087E8B',
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 8,
  },

  shareButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
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
  //the announcement view section
  container: {
    flex: 1,
    padding: 20,
  },
  dataDate: {
    color: '#A29E90',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 7,
  },

  // Sermon notes view section
  sermonNotesHeading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    paddingLeft: 10,
    paddingTop: 10,
  },
  sermonNoteContainer: {
    backgroundColor: '#087E8B',
  },
  sermonDate: {
    color: '#58BDC8',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 7,
  },
  sermonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    width: 150,
  },
});
export {styles};
