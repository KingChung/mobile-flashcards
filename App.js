import React from "react";
import { View, Platform, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { createStore } from "redux";
import reducer from "./reducers/index";
import { createStackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import Home from './screens/Home';
import Expo from 'expo'
import DeckDetail from "./screens/DeckDetail";


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Add Deck"
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class DeckScreen extends React.Component {
  static navigationOptions = {
      title: "Deck Detail"
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Deck Detail</Text>
      </View>
    );
  }
}

const Tabs = createStackNavigator(
  {
    Home: Home,
    Settings: SettingsScreen,
    Deck: DeckDetail
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#1c262f"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerBackTitle: null,
      headerBackTitleStyle: {
        color: "#fff"
      }
    }
  }
)

const store = createStore(reducer);
export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
