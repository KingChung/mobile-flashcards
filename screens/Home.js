import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { requestDecks } from "../actions";
import { Card, CardItem, Body, Text, View, Button } from "native-base";

class AddDeckButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => this.props.navigation.navigate("Settings")}
      >
        <FontAwesome name="plus" size={24} color={"#fff"} />
      </TouchableOpacity>
    );
  }
}

const DeckItem = function({ deck, navigation }) {
  return (
    <CardItem
      bordered
      button
      onPress={() =>
        navigation.navigate("Deck", {
          title: deck.title
        })
      }
    >
      <Body style={style.item}>
        <Text>
          {deck.title} <MaterialCommunityIcons name="cards-outline" size={24} />{" "}
          {deck.questions.length}
        </Text>
      </Body>
    </CardItem>
  );
};

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Decks",
    headerLeft: null,
    headerRight: <AddDeckButton navigation={navigation} />
  });
  componentDidMount() {
    this.props.dispatch(requestDecks());
  }
  render() {
    const { decks, navigation } = this.props;
    return decks.length ? (
      <ScrollView>
        <Card>
          {decks.map(deck => (
            <DeckItem key={deck.title} deck={deck} navigation={navigation} />
          ))}
        </Card>
      </ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 15
        }}
      >
        <Button
          block
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          <Text>CREATE A DECK</Text>
        </Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks: Object.values(decks)
  };
};

export default connect(mapStateToProps)(Home);
