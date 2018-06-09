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
import QuizCard from "./../components/QuizCard";
import { updateQuizStatus, removeQuizStatus } from "../utils/api";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Quiz extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    toggleDeckSwiper: true,
    quiz: [],
    score: 0
  };
  createQuiz = (questions = []) => {
    const bank = Object.values(questions).map(item => item.answer);
    return questions.map((item, index) => {
      const questionAnswer = bank[getRandomInt(0, questions.length)];
      return {
        ...item,
        index: index + 1,
        questionAnswer,
        answer: questionAnswer === item.answer,
        correctAnswer: item.answer
      };
    });
  };
  componentWillMount = () => {
    const { decks, navigation } = this.props;
    const { questions } = decks[navigation.getParam("title")];
    const quiz = this.createQuiz(questions);
    this.setState({
      quiz
    });
  };
  handleCheckQuestion = (card, trueOrFalse) => {
    let score = this.state.score;
    card.answer === trueOrFalse && score++;
    this.setState({
      score
    })
  };
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title");
    const { quiz, toggleDeckSwiper, answerBank, score } = this.state;
    return (
      toggleDeckSwiper && (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <StatusBar barStyle={"dark-content"} />
          <View style={{ flex: 2, paddingTop: 45 }}>
            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              looping={false}
              dataSource={quiz}
              renderEmpty={() => {
                let totalScore = 0;
                if (Number.isInteger(quiz.length)) {
                  totalScore = score / quiz.length * 100;
                }
                removeQuizStatus(title)
                return (
                  <View style={style.scoreCard}>
                    <Text style={{ fontSize: 24 }}>Score: {totalScore}</Text>
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
                        this.setState({ toggleDeckSwiper: false });
                        setTimeout(
                          () =>
                            this.setState({
                              toggleDeckSwiper: true,
                              score: 0,
                            }),
                          0
                        );
                      }}
                    >
                      <Text>RESTART THE QUIZ</Text>
                    </Button>
                  </View>
                );
              }}
              renderItem={item => (
                <QuizCard card={item} totalCards={quiz.length} onCheckQuestion={(trueOrFalse) => {
                    if(trueOrFalse) {
                        this._deckSwiper._root.swipeRight()
                    } else {
                        this._deckSwiper._root.swipeLeft()
                    }
                    this.handleCheckQuestion(item, trueOrFalse)
                }} />
              )}
              onSwipeRight={item => this.handleCheckQuestion(item, true)}
              onSwipeLeft={item => this.handleCheckQuestion(item, false)}
            />
          </View>
        </View>
      )
    );
  }
}

const { height, width } = Dimensions.get("window");
const style = StyleSheet.create({
  scoreCard: {
    height: 500,
    width,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30
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
