import { StyleSheet } from 'react-native';
import Config from '../../../config/Config';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Config.DEVICE_WIDTH,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
});
