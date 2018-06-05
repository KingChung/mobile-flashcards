import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { requestDecks } from "../actions";
import {
  Content,
  Container,
  Card,
  CardItem,
  Body,
  Text,
  DeckSwiper,
  View
} from "native-base";
import DeckCard from './../components/Card';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.getParam("deck", {
      title: "Deck Details"
    });
    const handleCreateNewCard = navigation.getParam(
      "handleCreateNewCard",
      new Function()
    );
    return {
      title,
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={handleCreateNewCard}
        >
          <FontAwesome name="file" size={18} color={"#fff"} />
        </TouchableOpacity>
      )
    };
  };
  state = {
    isNewCardMode: false
  };
  _handleCreateNewCard = () => {
    this.setState({ isNewCardMode: true });
  };
  componentWillMount() {
    this.props.navigation.setParams({
      handleCreateNewCard: this._handleCreateNewCard
    });
  }
  render() {
    const { navigation } = this.props;
    const { questions } = navigation.getParam("deck");
    return this.state.isNewCardMode ? (
      <View>
        <Text>123123</Text>
      </View>
    ) : (
      <Container>
        <View style={{ flex: 1 }}>
          <DeckSwiper
            dataSource={questions.map((q, index) => {
              q.index = index + 1
              return q
            })}
            renderItem={item => <DeckCard card={item} totalCards={questions.length}/>}
          />
        </View>
        <View style={style.fixedFooter}>
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  fixedFooter: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    justifyContent: "center",
    padding: 15,
    backgroundColor: "rgb(0, 179, 134)"
  }
});

const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks
  };
};

export default connect(mapStateToProps)(DeckDetail);
