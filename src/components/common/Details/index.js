import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Config from '../../../config/Config';
import styles from './Details.styles';
import { formatDate } from '../../../helpers/index';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Config.DEVICE_WIDTH - 20,
      height: Config.DEVICE_WIDTH - 20,
      news: null,
      loaded: false
    }
  }

  componentDidMount() {
    let news = this.props.route.params;
    this.setState({
      news,
      loaded: true
    });
    if (news.urlToImage)
    {
      Image.getSize(news.urlToImage, (width, height) => {
        let w = ( width >= Config.DEVICE_WIDTH - 20 ) ? Config.DEVICE_WIDTH - 20 : width;
        let h = height * ( w / height );
        // alert(Config.DEVICE_WIDTH + ' / ' + w + ' / ' + h);
        this.setState({ width: w, height: h })
      });
    }
  }

  render()
  {
    if (!this.state.loaded)
    {
      return (<View><Text>Loading...</Text></View>);
    }
    let news = this.state.news;
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }} style={ styles.container } >
        <Text allowFontScaling={false} style={ styles.title }>{news.title}</Text>
        <Text allowFontScaling={false} style={ styles.publishedDate }>{formatDate(news.publishedAt)}</Text>
        { news.urlToImage ? <Image style={{ width: this.state.width, height: this.state.height }} source={{ uri: news.urlToImage }} /> : null }
        <Text style={ styles.content } allowFontScaling={false}>{ news.content || news.description }</Text>
        { /* <Text allowFontScaling={false}>{JSON.stringify(this.props)}</Text> */ }
      </ScrollView>
    );
  }
}
