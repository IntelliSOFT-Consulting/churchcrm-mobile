import {StyleSheet} from 'react-native';

const DrawerNavigatorcss = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 14,
    color: '#000000',
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  drawerLabelWhite: {
    color: '#ffffff',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: '#087E8B',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#087E8B',
  },
  NameText: {
    fontSize: 18,
    fontWeight: '900',
    paddingStart: 20,
    color: 'white',
    padding: 10,
  },
  EmailText: {
    fontSize: 18,
    fontWeight: '900',
    paddingStart: 20,
    color: 'white',
    padding: 10,
  },
  content: {
    flex: 4,
  },
  containerSection: {
    // flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 10,
  },
  image_logo: {
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#087E8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: '#000000',
  },
});
export default DrawerNavigatorcss;
