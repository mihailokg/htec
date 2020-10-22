import * as React from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from "react-native";
import Header from "../components/common/Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { getEndPointData } from '../actions/getEndPointData';
import TopNewsComponent from '../components/TopNews';
import CategoriesComponent from '../components/common/Categories';

const MAIN_MENU_OPTION = 'TopNews';
const MAX_NEWS_FROM_CATEGORY = 5;

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
      errorMessage: null
    };
  }

  componentDidMount() {
    this._getTopNews();
  }

  _getTopNews = async () => {
    let topNews = await this.props.getEndPointData({country: this.state.currentCountry, searchTerm: this.state.searchTerm, category: null});
    // alert(JSON.stringify(topNews));
    if (topNews['response'].status === 'error')
    {
      this.setState({
        loaded: true,
        topNews: {},
        errorMessage: topNews['response'].message
      });
      return false;
    }

    this.setState({
      loaded: true,
      topNews
    });
  }

  _getCategoryNews = async () => {
    let categories = ['entertainment', 'general', 'health', 'science', 'sport', 'technology'];
    let top5FromCategory = [];

    categories.map( async (category) => {
      let response = await this.props.getEndPointData({
        country: this.state.currentCountry,
        searchTerm: this.state.searchTerm,
        category: category,
        pageSize: 5
      });

      // console.log('OOOOOOOOO '  + category, response);

      if (response['response'].status === 'error')
      {
        this.setState({
          loaded: true,
          top5FromCategory: null,
          errorMessage: response['response'].message
        });
        return false;
      }

      // console.log('categoryNews ' + category, response['response']);

      let p = [];
      let articles = response['response'].articles; // categoryNews.response.articles;
      let tifOptions = await Object.keys(articles).map(function(key) {
        if (key < MAX_NEWS_FROM_CATEGORY)
        {
          // console.log('XXXX ' + key + category, articles[key]);
          p.push(articles[key]);
        }
      });

      top5FromCategory.push({[category]: p});

    });

    return top5FromCategory;
  }

  _changeCountry = (country) => {
    this.setState({ currentCountry: country }, () => {
      if (this.state.showCategories)
      {
        this._getCategoryNews();
      }
      else
      {
        this._getTopNews();
      }
    });
  }

  _searchTerm = (searchTerm) => {
    this.setState({ searchTerm: searchTerm, showCategories: false, topNews: {}, currentMenuOption: MAIN_MENU_OPTION }, () => {
      this._getTopNews();
    });
  }

  _resetTopNews = () => {
    if (this.state.searchTerm || this.state.showCategories)
    {
      this.setState({ searchTerm: null, showCategories: false, currentMenuOption: MAIN_MENU_OPTION }, () => {
        this._getTopNews();
      });
    }
  }

  _showCategories = () => {
    this.setState({
      showCategories: true,
      currentMenuOption: 'Categories'
    });
    this._getCategoryNews().then((reponse) => {
      // console.log('top5FromCategory', JSON.stringify(this.state.top5FromCategory));
      // console.log('XXXX ', reponse);
      this.setState({
        loaded: true,
        top5FromCategory: reponse
      });
    });
  }

  render() {
    if (!this.state.loaded)
    {
      return (
        <View><Text>Loading...</Text></View>
      );
    }

    if (this.state.errorMessage)
    {
      return (
        <View><Text>{this.state.errorMessage}</Text></View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'#111111'} barStyle={'dark-content'} />
        <Header
          navigation={ this.props.navigation }
          currentCountry={ this.state.currentCountry }
          changeCountry={this._changeCountry}
          searchTerm={this._searchTerm}
          topNews={this._resetTopNews}
          showCategories={this._showCategories}
          isTopNews={true}
          currentMenuOption={this.state.currentMenuOption}
        />
        {
          this.state.showCategories ?
            <CategoriesComponent
              topNews={this.state.top5FromCategory}
              // refreshNews={this._getTopNews}
              navigation={this.props.navigation}
              style={{ position: 'relative'}}
              newsCountPerCategory={MAX_NEWS_FROM_CATEGORY}
            />
              :
            <TopNewsComponent
              topNews={this.state.topNews}
              refreshNews={this._getTopNews}
              navigation={this.props.navigation}
              style={{ position: 'relative'}}
            />
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

// export default TopNews;

function mapStateToProps (state) {
  // Log.debug('Apps mapStateToProps', {myProfile: state.myProfile, state: state});
  // userInfo: {user_id: state.myProfile.id, gender_string: state.myProfile.gender, email: state.myProfile.email, username: state.myProfile.username }

  return {
    // myProfileUsername: state.myProfile.username
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getEndPointData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);
