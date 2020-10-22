import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class MainButton extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let element = <Text
      allowFontScaling={false}
      style={[{color: this.props.disabled ? '#fff' : '#000'},
        styles.textStyle,
        this.props.buttonStyle]}>
      {this.props.text}
    </Text>;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // underlayColor={'#adadad'}
        style={[
          {backgroundColor: this.props.disabled ? '#fff' : '#000'},
          styles.buttonStyle,
          this.props.buttonStyle]}
        onPress={this.props.onPress}
        hitSlop={this.props.hitSlop}
        disabled={this.props.disabled}>
        {element}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000'
  }
});
export default MainButton;
