import { StyleSheet, Platform } from 'react-native';
import Config from "../../../config/Config";

export default StyleSheet.create({
  container: {
    width: Config.DEVICE_WIDTH
  },
  newsBox: {
    width: '100%',
    flexDirection: 'row'
  },
  imageBox: {
    width: 100,
  },
  contentBox: {
    width: Config.DEVICE_WIDTH - 120,
    flexDirection: 'column',
    paddingLeft: 10,
    height: 100,
    alignSelf: 'stretch'
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 12,
    fontWeight: '500'
  },
  publishedDate: {
    fontSize: 11,
    fontWeight: '300',
    paddingBottom: 10,
    color: '#ACACAC'
  },
  description: {
    fontSize: 12,
    fontWeight: '300',
    flexWrap: 'wrap',
    flexShrink: 1
  }
});