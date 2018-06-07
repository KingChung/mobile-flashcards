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
    toggleDeckSwiper: true,
    quiz: []
  };
  componentWillMount = () => {
    const { decks, navigation } = this.props;
    const deck = decks[navigation.getParam("title")];
    this.setState({
      quiz: deck.questions
    });
  };
  handleCheckQuestion = (question, trueOrFalse) => {};
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title");
    const { quiz, toggleDeckSwiper } = this.state;
    return (
      toggleDeckSwiper && <View style={{ justifyContent: "center", flex: 1 }}>
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
            renderEmpty={() => {
              return (
                <View
                  style={{
                    height: 500,
                    width,
                    paddingTop: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: 30,
                    paddingLeft: 30
                  }}
                >
                  <Text style={{ fontSize: 24 }}>Score: {100}</Text>
                  <Button
                    block
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.goBack(null)}
                  >
                    <Text>GO BACK TO {title} DECK</Text>
                  </Button>

                  <Button
                    block
                    warning
                    style={{ marginTop: 15 }}
                    onPress={() => {
                        // @TODO Component <DeckSwiper> cannot re-render automatically even quiz changed
                        this.setState({
                            quiz: [
                                {
                                  question: "What is React?",
                                  answer: "A library for managing user interfaces"
                                },
                                {
                                  question: "Where do you make Ajax requests in React?",
                                  answer: "The componentDidMount lifecycle event"
                                }
                              ],
                              toggleDeckSwiper: false
                        })
                        setTimeout(() => this.setState({
                            toggleDeckSwiper: true
                        }), 0)
                    }}
                  >
                    <Text>RESTART THE QUIZ</Text>
                  </Button>
                </View>
              );
            }}
            renderItem={item => (
              <DeckCard card={item} totalCards={quiz.length} />
            )}
            onSwipeRight={question => this.handleCheckQuestion(question, true)}
            onSwipeLeft={question => this.handleCheckQuestion(question, true)}
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
