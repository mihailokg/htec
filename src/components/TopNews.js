import React, { Component } from 'react';
import OneNews from './common/OneNews';
import { FlatList, View } from 'react-native';

export default class TopNewsComponent extends Component {
  constructor(props) {
    super(props);
    // alert(JSON.stringify(this.props.topNews.response.articles));
    // console.log('Props', props.navigation);
    this.state = {
      isFetching: false
    }
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginBottom: 10
        }}
      />
    );
  };

  onRefresh() {
    this.setState({isFetching: true,},() => { this.props.refreshNews().then( () => {
        this.setState({ isFetching: false });
      })
    });
  }

  _handlePressNews = (item) => {
    this.props.navigation.navigate('Details', item);
  }

  render()
  {
    let data = typeof this.props.topNews.response !== 'undefined' && this.props.topNews !== null ? this.props.topNews.response.articles : [];

    return (
      <FlatList
        data={data}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        keyExtractor={(item) => 'HORMENU_' + item.url}
        initialNumToRender={5}
        ItemSeparatorComponent={this._renderSeparator}
        onEndReached={() => {return false;}}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OneNews
          newsData={item}
          id={item.url}
          onPressItem={this._handlePressNews.bind(this, item)}
        />}
      />
    );
  }
}
