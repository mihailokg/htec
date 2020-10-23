/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import TopNews from './src/containers/TopNews';
import DetailsScreen from './src/components/common/Details';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TopNews">
          <Stack.Screen name="TopNews" component={TopNews} options={{ headerShown: false }} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerBackTitle: 'Back',
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
