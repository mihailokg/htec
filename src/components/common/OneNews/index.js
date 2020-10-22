import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './OneNews.styles';
import { formatDate } from '../../../helpers/index';

export default class OneNews extends Component {
  constructor(props) {
    super(props);
  }

  render()
  {
    let news = this.props.newsData;

    let image = news.urlToImage ? <View style={ styles.imageBox }>
        <Image style={ styles.image} source={{ uri: news.urlToImage }} />
      </View> : null;

    return (
      <View style={ styles.container }>
        <TouchableOpacity onPress={this.props.onPressItem}>
          <View style={ styles.newsBox }>
            {image}
            <View style={ styles.contentBox }>
              <Text allowFontScaling={false} style={ styles.title }>{news.title}</Text>
              <Text allowFontScaling={false} style={ styles.publishedDate }>{formatDate(news.publishedAt)}</Text>
              <Text style={ styles.description } allowFontScaling={false}>{ news.description }</Text>
              { /* <Text>{JSON.stringify(news)}</Text> */ }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
