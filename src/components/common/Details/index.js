import React, { Component } from 'react';
import {
  ScrollView, View, Text, Image,
} from 'react-native';
import Config from '../../../config/Config';
import styles from './Details.styles';
import { formatDate } from '../../../helpers/index';
import Loader from '../Loader';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Config.DEVICE_WIDTH - 20,
      height: Config.DEVICE_WIDTH - 20,
      hasPhoto: true,
      news: null,
      loaded: false,
    };
  }

  async componentDidMount() {
    const news = this.props.route.params;
    this.setState({
      news,
      loaded: true,
    });
    if (typeof news.urlToImage !== 'undefined' && news.urlToImage) {
      await Image.getSize(news.urlToImage, (width, height) => {
        const w = (width >= Config.DEVICE_WIDTH - 20) ? Config.DEVICE_WIDTH - 20 : width;
        const h = height * (w / height);
        // alert(Config.DEVICE_WIDTH + ' / ' + w + ' / ' + h);
        this.setState({ width: w, height: h, hasPhoto: true });
      },
      () => this.setState({ width: 0, height: 0, hasPhoto: false }));
    }
  }

  render() {
    if (!this.state.loaded) {
      return (<Loader visible />);
    }
    const { news } = this.state;
    const content = news.content || news.description;
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }} style={styles.container}>
        <Text allowFontScaling={false} style={styles.title}>{news.title}</Text>
        <Text allowFontScaling={false} style={styles.publishedDate}>
          {formatDate(news.publishedAt)}
        </Text>
        {
          this.state.hasPhoto && news.urlToImage
            ? (
              <Image
                style={{ width: this.state.width, height: this.state.height }}
                source={{ uri: news.urlToImage }}
              />
            ) : null
        }
        <Text style={styles.content} allowFontScaling={false}>
          {content}
        </Text>
      </ScrollView>
    );
  }
}
