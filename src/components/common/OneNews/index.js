import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './OneNews.styles';
import { formatDate } from '../../../helpers/index';

export default class OneNews extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this._getImageSize(this.props.newsData.urlToImage);
  }

  _getImageSize = async (image) => {
    let response = await Image.getSize(image, (width, height) => {
        return true;
      },
      () => {
        return false;
      }
    );
    return response;
  }

  render()
  {
    let news = this.props.newsData;

    let image = news.urlToImage && this._getImageSize(news.urlToImage) ? <View style={ styles.imageBox }>
        <Image style={ styles.image} source={{ uri: news.urlToImage }} />
      </View> : null;

    let contentBoxWidth = image === null ? { width: '97%' } : null;

    let componentStyle = this.props.componentStyle || null;

    return (
      <View style={ [ styles.container, { componentStyle } ] }>
        <TouchableOpacity onPress={this.props.onPressItem}>
          <View style={ styles.newsBox }>
            {image}
            <View style={ [ styles.contentBox, contentBoxWidth ] }>
              <Text allowFontScaling={false} style={ styles.title }>{news.title}</Text>
              <Text allowFontScaling={false} style={ styles.publishedDate }>{formatDate(news.publishedAt)}</Text>
              <Text
                style={ styles.description }
                allowFontScaling={false}
                numberOfLines={3}
              >
                { news.description }
              </Text>
              { /* <Text>{JSON.stringify(news)}</Text> */ }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
