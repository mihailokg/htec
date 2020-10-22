import { StyleSheet, Platform } from 'react-native';
import Config from "../../../config/Config";

const NEWS_HEIGHT = 160;

export default StyleSheet.create({
  container: {
    width: Config.DEVICE_WIDTH,
    padding: 10,
    marginBottom: 10,
    height: NEWS_HEIGHT
  },
  newsBox: {
    width: '100%',
    flexDirection: 'row'
  },
  imageBox: {
    width: 100,
  },
  contentBox: {
    width: Config.DEVICE_WIDTH - 130,
    flexDirection: 'column',
    paddingLeft: 10
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    width: 160,
    marginBottom: 10
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
  },
  backButton: {
    zIndex: 998,
    position: 'absolute',
    top: 45,
    left: 0,
    height: NEWS_HEIGHT - 50,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardButton: {
    zIndex: 1000,
    position: 'absolute',
    top: 45,
    width: '10%',
    height: NEWS_HEIGHT - 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  backForwardSvgButtons: {
    shadowColor: "#111",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 1.84,
    elevation: 5,
    padding: 1,
    paddingRight: 10,
    paddingLeft: 10
  }
});