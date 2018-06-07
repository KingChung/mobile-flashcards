import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Dimensions, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { requestDecks, ADD_CARD } from "../actions";
import {
  Content,
  Container,
  Card,
  CardItem,
  Body,
  Text,
  DeckSwiper,
  View,
  Label,
  Form,
  Input,
  Item,
  Button
} from "native-base";
import DeckCard from "./../components/Card";
import CardForm from "./../components/CardForm";

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
    isCardModalVisible: false,
    deck: {}
  };
  componentWillMount = () => {
    this.props.navigation.setParams({
      handleCreateNewCard: () => this.setCardModalVisible(true)
    });
  };
  setCardModalVisible = showOrNot => {
    this.setState({ isCardModalVisible: showOrNot });
  };
  render() {
    const { navigation, decks } = this.props;
    const { title } = navigation.getParam("deck");
    const { questions } = decks[title];
    return this.state.isCardModalVisible ? (
      <Modal
        style={{ flex: 1 }}
        animationType="slide"
        transparent={false}
        visible={this.state.isCardModalVisible}
      >
        <TouchableOpacity style={{ position: "absolute", top: 40, right: 20, zIndex: 99 }} onPress={() => this.setCardModalVisible(false)}>
          <FontAwesome name="times" size={24} />
        </TouchableOpacity>
        <CardForm
          onSave={() => this.setCardModalVisible(false)}
          title={title}
        />
      </Modal>
    ) : (
      <Container>
        <View style={{ flex: 1 }}>
          <DeckSwiper
            dataSource={questions.map((q, index) => {
              return {
                ...q, 
                index: index + 1,
              }
            })}
            renderItem={item => (
              <DeckCard card={item} totalCards={questions.length} />
            )}
          />
        </View>
        <TouchableOpacity
          style={style.fixedFooter}
          onPress={() => this.props.navigation.navigate("Quiz", {title})}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Start Quiz
          </Text>
        </TouchableOpacity>
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
})

const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks
  };
};

export default connect(mapStateToProps)(DeckDetail);
