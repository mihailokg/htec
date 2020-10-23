/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, TextInput, Keyboard, Animated,
} from 'react-native';
import Config from '../../../config/Config';
import styles from './Header.styles';
import MainButton from '../MainButton';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocation: new Animated.Value(0),
      searchTerm: '',
    };
  }

  searchPressed = () => {
    Animated.timing(
      this.state.searchLocation, {
        toValue: -Config.DEVICE_WIDTH,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }

  resetSearch = () => {
    this.textInput.setNativeProps({ text: '', placeholder: 'eg. Trump' });

    // this.textInput.current.clear();
    this.setState({
      searchLocation: new Animated.Value(0),
    });
    Keyboard.dismiss();
  }

  changeSearchTerm = (text) => {
    this.setState({ searchTerm: text });
  }

  render() {
    return (
      <View style={styles.bigContainer}>
        <Animated.View style={[styles.container, { opacity: 0.9 }]}>
          <MainButton
            text="Top News"
            onPress={() => { this.props.isTopNews ? this.props.topNews() : this.props.navigation.navigate('TopNews'); }}
            buttonStyle={[styles.textButton, { width: 80, color: this.props.currentMenuOption === 'TopNews' ? '#007AFF' : '#111' }]}
          />
          <MainButton
            text="Categories"
            onPress={() => this.props.showCategories()}
            buttonStyle={[styles.textButton, { width: 80, color: this.props.currentMenuOption === 'Categories' ? '#007AFF' : '#111' }]}
          />
          <MainButton
            text="Search"
            onPress={() => this.searchPressed()}
            buttonStyle={[styles.textButton, { width: 70 }]}
          />
        </Animated.View>

        <View style={styles.countryBox}>
          <MainButton
            text="US"
            onPress={() => this.props.changeCountry('us')}
            buttonStyle={this.props.currentCountry === 'us' ? styles.countryButtonActive : styles.countryButton}
          />
          <MainButton
            text="GB"
            onPress={() => this.props.changeCountry('gb')}
            buttonStyle={this.props.currentCountry === 'gb' ? styles.countryButtonActive : styles.countryButton}
          />
        </View>

        {/* eslint-disable-next-line max-len */}
        <Animated.View style={[styles.searchBox, { transform: [{ translateX: this.state.searchLocation }] }]}>
          <TextInput
            ref={(e) => { this.textInput = e; }}
            disabled
            underlineColorAndroid="transparent"
            placeholder="eg. Trump"
            placeholderTextColor="grey"
            withRef
            onChangeText={(text) => this.changeSearchTerm(text)}
            style={styles.searchInput}
          />
          <View style={styles.countryBox}>
            <MainButton
              text="Search"
              onPress={() => { this.props.searchTerm(this.state.searchTerm); this.resetSearch(); }}
              buttonStyle={[styles.countryButtonActive, { width: 80 }]}
            />
            <MainButton
              text="Close"
              onPress={() => this.resetSearch()}
              buttonStyle={[styles.countryButton, { width: 80 }]}
            />
          </View>
        </Animated.View>
      </View>

    );
  }
}
