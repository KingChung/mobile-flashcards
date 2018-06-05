import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Dimensions, Modal } from "react-native";
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
  View,
  Label,
  Form,
  Input,
  Item,
  Button
} from "native-base";
import DeckCard from "./../components/Card";

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
    newQuestionContent: "",
    newQuestionAnswer: "",
    deck: {}
  };
  componentWillMount = () => {
    this.props.navigation.setParams({
      handleCreateNewCard: () => this.setCardModalVisible(true)
    });
    this.setState({
      deck: this.props.navigation.getParam("deck")
    });
  };
  componentDidMount = () => {};
  setCardModalVisible = showOrNot => {
    this.setState({ isCardModalVisible: showOrNot });
  };
  handleSaveCard = () => {
    // @TODO save card
  };
  render() {
    const { questions = [] } = this.state.deck;
    return this.state.isCardModalVisible ? (
      <Modal
        style={{ flex: 1 }}
        animationType="slide"
        transparent={false}
        visible={this.state.isCardModalVisible}
      >
        <Container>
          <TouchableOpacity
            style={{ position: "absolute", top: 40, right: 20 }}
            onPress={() => this.setCardModalVisible(false)}
          >
            <FontAwesome name="times" size={24} />
          </TouchableOpacity>
          <Content style={{ marginTop: 70, padding: 15 }}>
            <Form>
              <Item floatingLabel>
                <Label>Question</Label>
                <Input
                  placeholderLabel={"Question"}
                  onChangeText={text =>
                    this.setState({ newQuestionContent: text })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Answer</Label>
                <Input
                  onChangeText={text =>
                    this.setState({ newQuestionAnswer: text })
                  }
                />
              </Item>
              <Button
                block
                style={{ margin: 10, marginTop: 20 }}
                onPress={this.handleSaveCard}
              >
                <Text>SAVE</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Modal>
    ) : (
      <Container>
        <View style={{ flex: 1 }}>
          <DeckSwiper
            dataSource={questions.map((q, index) => {
              q.index = index + 1;
              return q;
            })}
            renderItem={item => (
              <DeckCard card={item} totalCards={questions.length} />
            )}
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
