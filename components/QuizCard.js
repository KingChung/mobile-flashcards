import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Content,
  Card,
  CardItem,
  Body,
  Text,
  DeckSwiper,
  View
} from "native-base";

export default class QuizCard extends React.Component {
  state = {
    isShowTip: false
  };
  handleToggleAnswer = () => {
    this.setState(({ isShowTip }) => ({
      isShowTip: !isShowTip
    }));
  };
  componentDidMount = () => {};
  render() {
    const { card, totalCards } = this.props;
    const { question, questionAnswer, correctAnswer, index, tip } = card;
    return !this.state.isShowTip ? (
      <Card style={style.card}>
        <View style={style.cardContent}>
          <Text style={{ fontSize: 24 }}>Q: {question}</Text>
          <Text style={{ fontSize: 24, marginTop: 10 }}>
            A: {questionAnswer}
          </Text>
          <Text
            style={[
              style.serial,
              { position: "absolute", top: 5, left: 5 }
            ]}
          >{`${index} / ${totalCards}`}</Text>
          <TouchableOpacity
            onPress={this.handleToggleAnswer}
            style={{ position: "absolute", right: 5, top: 5 }}
          >
            <Text style={{ color: "#F48024", fontSize: 14 }}>
              <FontAwesome name="bell" /> Tips
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.checkBar}>
          <TouchableOpacity
            onPress={() => this.props.onCheckQuestion(false)}
          >
            <Ionicons
              name="ios-close-circle"
              style={{ color: "#dc3545", fontSize: 64 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onCheckQuestion(true)}
          >
            <Ionicons
              name="ios-checkmark-circle"
              style={{ color: "#28a745", fontSize: 64 }}
            />
          </TouchableOpacity>
        </View>
      </Card>
    ) : (
      <Card style={style.card}>
        <View style={style.cardContent}>
          <Text style={{ fontSize: 20 }}>{correctAnswer}</Text>
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
  checkBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    height: height - 100,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  serial: {
    color: "#ced4da",
    fontSize: 16
  }
});
