import React from 'react';
import { View, TextInput, Text, Keyboard, Button, Animated } from 'react-native';
import Config from '../../../config/Config';
import styles from './Header.styles';
import MainButton from '../MainButton';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocation: new Animated.Value(0),
      searchTerm: ''
    }
  }

  _searchPressed = () => {
    Animated.timing(
      this.state.searchLocation, {
        toValue: -Config.DEVICE_WIDTH,
        duration: 500,
        useNativeDriver: true,
      }).start();
  }

  _resetSearch = () => {
    this.setState({
      searchLocation: new Animated.Value(0)
    });
    Keyboard.dismiss();
  }

  _changeSearchTerm = (text) => {
    this.setState({ searchTerm: text });
  }

  render(){
    return(
      <View style={ styles.bigContainer }>
        <View style={ styles.container }>
          <Button
            title="Top News"
            onPress={() => { this.props.isTopNews ? this.props.topNews() : this.props.navigation.navigate('TopNews') }}
            color={ this.props.currentMenuOption === 'TopNews' ? 'green' : 'black'}
          />
          <Button
            title="Categories"
            onPress={() => this.props.showCategories()} // navigation.navigate('Categories')}
            color={ this.props.currentMenuOption === 'Categories' ? 'green' : 'black'}
          />
          <Button
            title="Search"
            // onPress={() => this.props.searchTerm('trump')}
            onPress={this._searchPressed}
          />
        </View>

        <View style={ styles.countryBox }>
          <MainButton
            text="US"
            onPress={() => this.props.changeCountry('us')}
            buttonStyle={ this.props.currentCountry === 'us' ? styles.countryButtonActive : styles.countryButton }
          />
          <MainButton
            text="GB"
            onPress={() => this.props.changeCountry('gb')}
            buttonStyle={ this.props.currentCountry === 'gb' ? styles.countryButtonActive : styles.countryButton }
          />
        </View>

        <Animated.View style={ [styles.searchBox, { transform: [{translateX: this.state.searchLocation}] }] }>
          <TextInput
            ref={(e) => {this.textInput = e}}
            disabled
            underlineColorAndroid="transparent"
            placeholder={'eg. Trump'}
            placeholderTextColor="grey"
            style={{ flex: 1, fontWeight: '400', fontSize: 13 }}
            withRef
            onChangeText={(text) => this._changeSearchTerm(text)}
            style={{ borderWidth: 1, borderColor: '#007AFF', borderRadius: 5, width: Config.DEVICE_WIDTH - 190, padding: 10, height: 37 }}
          />
          <View style={ styles.countryBox }>
            <MainButton
              text="Search"
              onPress={() => { this.props.searchTerm(this.state.searchTerm); this._resetSearch() }}
              buttonStyle={ [styles.countryButtonActive, { width: 80 }] }
            />
            <MainButton
              text="Close"
              onPress={() => this._resetSearch()}
              buttonStyle={ [styles.countryButton, { width: 80 }] }
            />
          </View>
        </Animated.View>
      </View>

    );
  }
}