import { StyleSheet, Platform } from 'react-native';
import Config from '../../../config/Config';

export default StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#efefef'
  },
  container: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBox: {
    flexDirection: 'row',
    position: 'absolute',
    height: 60,
    width: '100%',
    left: Config.DEVICE_WIDTH,
    backgroundColor: '#efefef',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 99999
  },
  countryBox: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    width: 95,
    right: 0,
    padding: 5  },
  countryButton: {
    color: '#111',
    backgroundColor: '#FFF'
  },
  countryButtonActive: {
    color: '#FFF',
    backgroundColor: '#007AFF'
  },
  textButton: {
    color: '#111',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    width: Config.DEVICE_WIDTH - 190,
    padding: 10,
    height: 37,
  }
});