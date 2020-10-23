import * as React from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from "react-native";
import Header from "../components/common/Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { getEndPointData } from '../actions/getEndPointData';
import TopNewsComponent from '../components/TopNews';
import CategoriesComponent from '../components/common/Categories';
import Loader from "../components/common/Loader";
import Config from "../config/Config";

const MAIN_MENU_OPTION = 'TopNews';
const { MAX_NEWS_FROM_CATEGORY } = Config;

class TopNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topNews: null,
      loaded: false,
      currentCountry: 'us',
      searchTerm: null,
      showCategories: false,
      currentMenuOption: MAIN_MENU_OPTION,
      top5FromCategory: null,
      errorMessage: null,
      categoryNews: null,
      currentCategory: null
    };
  }

  async componentDidMount() {
    await this._getTopNews();
  }

  _getTopNews = async () => {
    const topNews = await this.props.getEndPointData({
      country: this.state.currentCountry,
      searchTerm: this.state.searchTerm,
      category: null,
    });
    // alert(JSON.stringify(topNews));
    if (topNews.response.status === 'error')
    {
      this.setState({
        loaded: true,
        topNews: {},
        errorMessage: topNews.response.message,
      });
      return false;
    }

    this.setState({
      loaded: true,
      topNews
    });
  }

  _getCategoryNews = async () => {
    const categories = ['entertainment', 'general', 'health', 'science', 'sport', 'technology'];
    const top5FromCategory = [];

    await categories.map( async (category) => {
      const response = await this.props.getEndPointData({
        country: this.state.currentCountry,
        searchTerm: null,
        category,
        pageSize: MAX_NEWS_FROM_CATEGORY
      });

      if (response.response.status === 'error')
      {
        this.setState({
          loaded: true,
          top5FromCategory: null,
          errorMessage: response.response.message
        });
        return false;
      }

      // console.log('categoryNews ' + category, response['response']);

      const p = [];
      const { articles } = response.response; // categoryNews.response.articles;
      await Object.keys(articles).map((key) => {
        if (key < MAX_NEWS_FROM_CATEGORY) {
          // console.log('XXXX ' + key + category, articles[key]);
          p.push(articles[key]);
        }
        return p;
      });

      top5FromCategory.push({ [category]: p });
      this.setState({
        top5FromCategory,
      });
    });

    return true;
  }

  _changeCountry = (country) => {
    this.setState({ currentCountry: country }, () => {
      if (this.state.showCategories) {
        this._getCategoryNews();
      } else if (this.state.showCategory) {
        this._showOneCategory(this.state.currentCategory);
      } else {
        this._getTopNews();
      }
    });
  }

  _searchTerm = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm,
      showCategories: false,
      showCategory: false,
      currentCategory: null,
      topNews: {},
      currentMenuOption: MAIN_MENU_OPTION
    }, () => {
      this._getTopNews();
    });
  }

  _resetTopNews = () => {
    if (this.state.searchTerm || this.state.showCategories) {
      this.setState({
        searchTerm: null,
        showCategories: false,
        showCategory: false,
        currentCategory: null,
        currentMenuOption: MAIN_MENU_OPTION
      }, () => {
        this._getTopNews();
      });
    }
  }

  /**
   * Show categories screen
   *
   * @private
   */
  _showCategories = async () => {
    this.setState({
      showCategories: true,
      currentMenuOption: 'Categories',
      showCategory: false,
      currentCategory: null,
      searchTerm: null
    });
    await this._getCategoryNews();
    this.setState({
      loaded: true,
      top5FromCategory: this.state.top5FromCategory
    });
  }

  /**
   * Show one category all news
   *
   * @param category string
   * @returns {Promise<boolean>}
   * @private
   */
  _showOneCategory = async (category) => {
    this.setState({
      showCategories: false,
      showCategory: true,
      currentMenuOption: 'Categories',
      loaded: false,
      currentCategory: category
    });

    const categoryNews = await this.props.getEndPointData({
      country: this.state.currentCountry,
      searchTerm: this.state.searchTerm,
      category,
    });

    if (categoryNews.response.status === 'error')
    {
      this.setState({
        loaded: true,
        categoryNews: {},
        errorMessage: categoryNews.response.message,
      });
      return false;
    }

    this.setState({
      loaded: true,
      categoryNews,
    });
  }

  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <StatusBar translucent={false} backgroundColor={'#111111'} barStyle={'dark-content'} />
        <Header
          navigation={this.props.navigation}
          currentCountry={this.state.currentCountry}
          changeCountry={this._changeCountry}
          searchTerm={this._searchTerm}
          topNews={this._resetTopNews}
          showCategories={this._showCategories}
          isTopNews
          currentMenuOption={this.state.currentMenuOption}
        />
        {
          this.state.errorMessage ? (
            <View style={{ flex: 1, padding: 10 }}>
              <Text>{this.state.errorMessage}</Text>
            </View>
          ) : (
            this.state.loaded ? (
              this.state.showCategories ?
                <CategoriesComponent
                  topNews={this.state.top5FromCategory}
                  // refreshNews={this._getTopNews}
                  navigation={this.props.navigation}
                  style={{ position: 'relative' }}
                  newsCountPerCategory={MAX_NEWS_FROM_CATEGORY}
                  showOneCategory={this._showOneCategory}
                /> : this.state.showCategory
                  ? (
                    <TopNewsComponent
                      topNews={this.state.categoryNews}
                      refreshNews={this._getTopNews}
                      navigation={this.props.navigation}
                      style={{ position: 'relative'}}
                      categoryName={this.state.currentCategory}
                    />
                  )
                  : (
                    <TopNewsComponent
                      topNews={this.state.topNews}
                      refreshNews={this._getTopNews}
                      navigation={this.props.navigation}
                      style={{ position: 'relative'}}
                    />
                  )
            ) : <Loader visible />
          )
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEndPointData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);
