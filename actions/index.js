import { getDecks, saveDeck, saveDeckTitle, addCardToDeck, updateQuizStatus } from "../utils/api";

export const ADD_DECK = "ADD_DECK";
export const REQUEST_DECKS = "REQUEST_DECKS";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const RECEIVE_DECK = "RECEIVE_DECK";

export const ADD_QUESTION = "ADD_QUESTION";
export const REQUEST_QUESTIONS = "REQUEST_QUESTIONS";

const _saveDeck = title => dispatch => {
  return saveDeckTitle(title).then(deck => {
    return dispatch(receiveDeck(deck));
  });
};

export const addDeck = title => dispatch => dispatch(_saveDeck(title));
export const receiveDeck = deck => ({
  type: RECEIVE_DECK,
  deck
});

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});

export const requestDecks = () => dispatch =>
  dispatch(() => {
    return getDecks().then(decks => {
      return dispatch(receiveDecks(decks));
    });
  });

export const ADD_CARD = "ADD_CARD"

export const RECEIVE_CARD = "RECEIVE_CARD"
export const receiveCard = (title, card) => ({
    type: RECEIVE_CARD,
    title,
    card
})

export const addCard = ({ title, card }) => (dispatch) => {
    return addCardToDeck(title, card).then(deck => dispatch(receiveCard(title, card)))
}
