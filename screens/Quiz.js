import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  Content,
  Container,
  Card,
  CardItem,
  Body,
  Text,
  DeckSwiper,
  Label,
  Form,
  Input,
  Item,
  Button
} from "native-base";
import DeckCard from "./../components/Card";

class Quiz extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    quiz: []
  };
  componentWillMount = () => {
    const { decks, navigation } = this.props;
    const deck = decks[navigation.getParam("title")];
    this.setState({
      quiz: deck.questions
    });
  };
  handleCheck = (question, checkOrNot) => {};
  render() {
    const { quiz } = this.state;
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <View style={{ flex: 2, paddingTop: 45 }}>
          <DeckSwiper
            ref={c => (this._deckSwiper = c)}
            looping={false}
            dataSource={
              quiz &&
              quiz.map((q, index) => {
                q.index = index + 1;
                return q;
              })
            }
            renderItem={item => (
              <DeckCard card={item} totalCards={quiz.length} />
            )}
            onSwipeRight={(...rest) => {
              console.log(rest);
            }}
            onSwipeLeft={this.handleCheck(false)}
            renderEmpty={() => (
              <View>
                <Text>123123</Text>
              </View>
            )}
          />
        </View>
        <View style={style.checkBar}>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Ionicons
              name="ios-close-circle"
              style={{ color: "#dc3545", fontSize: 64 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeRight()}>
            <Ionicons
              name="ios-checkmark-circle"
              style={{ color: "#28a745", fontSize: 64 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");
const style = StyleSheet.create({
  checkBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    position: "absolute",
    bottom: 30,
    width: width
  },
  card: {
    height: height - 180,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  cardContent: {
    flex: 1,
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

export default connect(mapStateToProps)(Quiz);
