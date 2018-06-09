import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ADD_CARD, addCard, ADD_DECK, addDeck } from "../actions";
import {
  Content,
  Container,
  Text,
  Label,
  Form,
  Input,
  Item,
  Button
} from "native-base";
import { updateQuizStatus } from "../utils/api";

class DeckForm extends React.Component {
  state = {
    title: ""
  };
  handleSaveDeck = () => {
    this.props.dispatch(addDeck(this.state.title)).then(() => {
      updateQuizStatus(this.state.title)
      this.props.navigation.replace(
        "Deck",
        {
          title: this.state.title
        },
        ""
      );
    });
  };
  render() {
    return (
      <Container>
        <Content style={{ marginTop: 70, padding: 15 }}>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={title => this.setState({ title })}
                value={this.state.title}
              />
            </Item>
            <Button
              block
              style={{ margin: 10, marginTop: 20 }}
              onPress={this.handleSaveDeck}
            >
              <Text>SAVE</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect()(DeckForm);
