import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ADD_CARD, addCard } from "../actions";
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

class CardForm extends React.Component {
  state = {
    newQuestionContent: "",
    newQuestionAnswer: "",
  };
  handleSaveCard = () => {
    const title = this.props.title
    this.props.dispatch(addCard({
        type: ADD_CARD,
        title,
        card: {
          question: this.state.newQuestionContent,
          answer: this.state.newQuestionAnswer
        }
      }));
    this.setState({
      newQuestionContent: "",
      newQuestionAnswer: "",
    });

    this.props.onSave && this.props.onSave()
  };
  render() {
    return (
        <Container>
          <Content style={{ marginTop: 70, padding: 15 }}>
            <Form>
              <Item floatingLabel>
                <Label>Question</Label>
                <Input
                  onChangeText={text =>
                    this.setState({ newQuestionContent: text })
                  }
                  value={this.state.newQuestionContent}
                />
              </Item>
              <Item floatingLabel>
                <Label>Answer</Label>
                <Input
                  onChangeText={text =>
                    this.setState({ newQuestionAnswer: text })
                  }
                  value={this.state.newQuestionAnswer}
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
    )
  }
}

export default connect()(CardForm);
