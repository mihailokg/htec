import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';
import styles from './Category.styles';
import {capitalizeFirst, formatDate} from '../../../helpers/index';
import OneNews from "../OneNews";
import Config from "../../../config/Config";
import SvgIcon from '../../../../assets/svg/SvgIcons';

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
      offset: 0,
      initialPage: 0,
      newsCountPerCategory: props.newsCountPerCategory || 5
    };
  }

  _handlePressNews = (item) => {
    this.props.navigation.navigate('Details', item);
  }

  getItemLayout = (data, index) => (
    { length: Config.DEVICE_WIDTH, offset: Config.DEVICE_WIDTH * index, index }
  )

  onViewableItemsChanged = ( event ) => {
    let xOffset = event.nativeEvent.contentOffset.x;
    let contentCount = this.state.newsCountPerCategory - 1;
    let dev = xOffset >= 100 ? 100 : 10;
    let value = xOffset / (contentCount * dev);

    let cl = Math.round(value); // - 1;

    this.setState({ activePage: cl });
  }

  gotoPrevious = () => {
    // console.log('this.state.activePage', this.state.activePage, this.props.initialPage);
    if (this.state.activePage === -1)
    {
      this.setState({activePage: this.state.initialPage}, () => {
        this._setActivePage(this.state.activePage > 0 ? this.state.activePage - 1 : this.state.activePage);
      });
    }
    else
    {
      this._setActivePage(this.state.activePage > 0 ? this.state.activePage - 1 : this.state.activePage);
    }
  }

  gotoNext = () => {
    if (this.state.activePage === -1)
    {
      this.setState({activePage: this.state.initialPage}, () => {
        this._setActivePage(this.state.activePage < this.state.newsCountPerCategory ? this.state.activePage + 1: this.state.activePage)
      });
    }
    else
    {
      this._setActivePage(this.state.activePage < this.state.newsCountPerCategory ? this.state.activePage + 1: this.state.activePage)
    }
  }

  _setActivePage = (page) => {
    if (page !== 'undefined')
    {
      this.setState({
        isLoaded: true,
        activePage: page,
        offset: page > 0 ? 1 : 0
      }, () => {
        this.flatListRef.scrollToIndex({animated: true, index: page});
      });
    }
  }

  render()
  {
    let news = this.props.newsData;
    let category = Object.keys(news)[0];
    let data = news[category];
    // console.log('category', category);
    // console.log('data', data);

    return (
      <View style={ styles.container }>
        <Text style={ styles.title } onPress={() => this.props.showOneCategory(category) }>{capitalizeFirst(category)}</Text>

        <View style={ styles.backButton }>
          {
            this.state.activePage - 1 >= 0 || (this.state.activePage === -1 && this.props.initialPage > 0)?
              <TouchableOpacity style={{ padding: 0, color: '#FFF'}} onPress={() => this.gotoPrevious()}>
                <SvgIcon iconName="gallery_back" svgStyle={{ width: 20, height: 42, fill: '#007AFF' }} style={ Platform.OS === 'ios' ? styles.backForwardSvgButtons : null } />
              </TouchableOpacity>
              : null
          }
        </View>

        <View style={ styles.forwardButton}>
          {
            (this.state.activePage > -1 && this.state.activePage + 1 < this.state.newsCountPerCategory) ||
            (this.props.initialPage >= 0 && this.props.initialPage < this.state.newsCountPerCategory - 1 && this.state.activePage + 1 < this.state.newsCountPerCategory) ?
              <TouchableOpacity style={{ padding: 0, color: '#FFF'}} onPress={() => this.gotoNext()}>
                <SvgIcon iconName="gallery_forward" svgStyle={{ width: 20, height: 42, fill: '#007AFF' }} style={ Platform.OS === 'ios' ? styles.backForwardSvgButtons : null }  />
              </TouchableOpacity>
              : null
          }
        </View>


        <FlatList
          data={data}
          // onRefresh={() => this.onRefresh()}
          refreshing={false}
          keyExtractor={(item) => 'HORMENU21_' + (item.url)}
          // ItemSeparatorComponent={this._renderSeparator}
          onEndReached={() => {return false;}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <OneNews
            newsData={item}
            id={item.url}
            onPressItem={this._handlePressNews.bind(this, item)}
          />}
          decelerationRate={0}
          snapToInterval={Config.DEVICE_WIDTH}
          pagingEnabled
          initialNumToRender={1}
          onEndReachedThreshold={10}
          ref={ref => {
            this.flatListRef = ref;
          }}
          getItemLayout={this.getItemLayout}
          onScroll={this.onViewableItemsChanged}
        />
      </View>
    );
  }
}
