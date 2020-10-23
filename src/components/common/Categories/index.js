/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Category from '../Category';
import { getRandomNumber } from '../../../helpers';

export default class CategoriesComponent extends Component {
  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginBottom: 10,
      }}
    />
  );

  render() {
    const data0 = typeof this.props.topNews !== 'undefined' && this.props.topNews !== null ? this.props.topNews : [];
    return (
      <FlatList
        data={data0}
        // onRefresh={() => this.onRefresh()}
        refreshing={false}
        keyExtractor={() => `news_${getRandomNumber()}`}
        initialNumToRender={5}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={() => false}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Category
            newsData={item}
            navigation={this.props.navigation}
            showOneCategory={this.props.showOneCategory}
          />
        )}
      />
    );
  }
}
