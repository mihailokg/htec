import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider, connect } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

import TopNews from './src/containers/TopNews';
import DetailsScreen from './src/components/common/Details';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="TopNews">
            <Stack.Screen name="TopNews" component={TopNews} options={{ headerShown: false }}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={{
              headerBackTitle: 'Back',
              title: ''
            }}/>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default App;

/*

function mapStateToProps (state) {
  // Log.debug('Apps mapStateToProps', {myProfile: state.myProfile, state: state});
  // userInfo: {user_id: state.myProfile.id, gender_string: state.myProfile.gender, email: state.myProfile.email, username: state.myProfile.username }

  return {
    // myProfileUsername: state.myProfile.username
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    // deepLinkStartProcess
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);
 */

