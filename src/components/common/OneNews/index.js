import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import styles from './OneNews.styles';
import { formatDate } from '../../../helpers/index';

export default class OneNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasImage: true,
      loaded: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {}, 5000);
    Image.getSize(this.props.newsData.urlToImage, (width, height) => {
      this.setState({
        hasImage: !!width,
        loaded: true,
      });
    }, () => this.setState({ hasImage: false, loaded: true, }));
  }

  render() {
    const news = this.props.newsData;
    const image = news.urlToImage && this.state.hasImage && this.state.loaded ? (
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri: news.urlToImage }} />
      </View>
    ) : (
      news.urlToImage && this.state.hasImage && !this.state.loaded
        ? (
          <View style={[styles.imageBox, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text>Loading...</Text>
          </View>
        ) : null
    );
    const contentBoxWidth = image === null ? { width: '97%' } : null;
    const componentStyle = this.props.componentStyle || null;

    return (
      <View style={[styles.container, { componentStyle }]}>
        <TouchableOpacity onPress={this.props.onPressItem}>
          <View style={styles.newsBox}>
            {image}
            <View style={[styles.contentBox, contentBoxWidth]}>
              <Text allowFontScaling={false} style={styles.title}>{news.title}</Text>
              <Text allowFontScaling={false} style={styles.publishedDate}>{formatDate(news.publishedAt)}</Text>
              <Text
                style={styles.description}
                allowFontScaling={false}
                numberOfLines={3}
              >
                {news.description}
              </Text>
              { /* <Text>{JSON.stringify(news)}</Text> */ }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
