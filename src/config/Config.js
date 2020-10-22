import { Platform, Dimensions } from 'react-native';

const appName = 'Htec';
const getVersion = '1.0.0';

const Config = {
  userAgent: Platform.OS === 'ios'
    ? 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) ' + appName + ' ' + getVersion
    : 'Mozilla/5.0 (Linux; Android 10; SM-G965F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36 ' + appName + ' ' + getVersion,
  apiKey: 'd789925fef3741f585fbcde6dc757e66', // '9cb9d883e8004f08a8e18daf96a0039c'
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,
  USE_TEST_DATA: true, // If true we will use hardcoded response with news so we do not use daily limit,
  MAX_NEWS_FROM_CATEGORY: 5
}

export default Config;