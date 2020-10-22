import React from 'react';
import { View } from 'react-native';
import LottieLoader from 'react-native-lottie-loader';
import styles from './Loader.styles';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={ styles.container }>
        <LottieLoader visible={this.props.visible} autoSize={true} animationStyle={{ width: 250, height: 150 }} source={require('../../../../assets/loading.json')} style={{ opacity: 1, backgroundColor: 'transparent'}} />
      </View>
    );
  }
}