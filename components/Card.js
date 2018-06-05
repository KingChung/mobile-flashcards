import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Content,
  Card,
  CardItem,
  Body,
  Text,
  DeckSwiper,
  View
} from "native-base";

export default class DeckCard extends React.Component {
  state = {
    isShowAnswer: false
  };
  handleToggleAnswer = () => {
    this.setState(({ isShowAnswer }) => ({
      isShowAnswer: !isShowAnswer
    }));
  };
  componentDidMount = () => {
    console.log(this.props);
  };
  render() {
    const { card, totalCards } = this.props;
    const { question, answer, index } = card;
    return !this.state.isShowAnswer ? (
      <Card style={style.card}>
        <View style={style.cardContent}>
          <Text style={{ fontSize: 24 }}>{question}</Text>
          <Text style={style.serial}>{`${index} / ${totalCards}`}</Text>

          <TouchableOpacity
            onPress={this.handleToggleAnswer}
            style={{ position: "absolute", right: 5, top: 5 }}
          >
            <Text style={{ color: "#F48024", fontSize: 14 }}>
              <FontAwesome name="bell" /> Answer
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    ) : (
      <Card style={style.card}>
        <View style={style.cardContent}>
          <Text style={{ fontSize: 20 }}>{answer}</Text>
          <TouchableOpacity
            onPress={this.handleToggleAnswer}
            style={{ position: "absolute", right: 5, top: 5 }}
          >
            <Text style={{ color: "#02b3e4", fontSize: 14 }}>
              <FontAwesome name="question-circle" /> Question
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

const { height, width } = Dimensions.get("window");
const style = StyleSheet.create({
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
  },
  serial: {
    color: "#ced4da",
    fontSize: 16
  }
});
