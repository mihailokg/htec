/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View } from 'react-native';
import LottieLoader from 'react-native-lottie-loader';
import styles from './Loader.styles';

const ANIMATION_IMAGE = require('../../../../assets/loading.json');

export default class Loader extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieLoader visible={this.props.visible} autoSize animationStyle={{ width: 250, height: 150 }} source={ANIMATION_IMAGE} style={{ opacity: 1, backgroundColor: 'transparent' }} />
      </View>
    );
  }
}
