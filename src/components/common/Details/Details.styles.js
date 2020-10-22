import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 300,
    width: '100%',
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    paddingBottom: 20
  },
  publishedDate: {
    fontSize: 14,
    fontWeight: '300',
    paddingBottom: 20,
    color: '#ACACAC'
  },
  image: {
    width: '100%',
    height: 100
  },
  content: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 20,
    paddingBottom: 20
  }
});