import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { requestDecks } from "../actions";
import { Content, Container, Card, CardItem, Body, Text } from "native-base";

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
    <CardItem bordered button onPress={() => navigation.navigate('Deck', {
        deck
    })}>
      <Body style={style.item}>
        <Text>{deck.title} <MaterialCommunityIcons name="cards-outline" size={24} /> {deck.questions.length}</Text>
      </Body>
    </CardItem>
  );
};

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Decks",
    headerRight: <AddDeckButton navigation={navigation} />
  });
  componentDidMount() {
        this.props.dispatch(requestDecks());
  }
  render() {
    const { decks, navigation } = this.props;
    return (
      <Container>
        <Content padder>
          <Card>
            {decks &&
              Object.values(decks).map(deck => (
                <DeckItem
                  key={deck.title}
                  deck={deck}
                  navigation={navigation}
                />
              ))}
          </Card>
        </Content>
      </Container>
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
    decks
  };
};

export default connect(mapStateToProps)(Home);
