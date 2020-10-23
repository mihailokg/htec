/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
});

export default class MainButton extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const element = (
      <Text
        allowFontScaling={false}
        style={[{ color: this.props.disabled ? '#fff' : '#000' }, styles.textStyle, this.props.buttonStyle]}
      >
        {this.props.text}
      </Text>
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // underlayColor={'#adadad'}
        style={[
          { backgroundColor: this.props.disabled ? '#fff' : '#000' },
          styles.buttonStyle,
          this.props.buttonStyle]}
        onPress={this.props.onPress}
        hitSlop={this.props.hitSlop}
        disabled={this.props.disabled}
      >
        {element}
      </TouchableOpacity>
    );
  }
}
