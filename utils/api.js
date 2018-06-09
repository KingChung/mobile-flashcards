import { AsyncStorage } from "react-native";
const DECK_STORAGE_KEY = "DECK_STORAGE_KEY";
const QUIZSTATUS_STORAGE_KEY = "QUIZSTATUS_STORAGE_KEY"

export function saveDecks(decks) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
    return JSON.parse(result);
  });
}

export function saveDeckTitle(title) {
  const newDeck = {
    title,
    questions: []
  };

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({ [title]: newDeck })
  ).then(() => newDeck);
}

export function addCardToDeck(title, card) {
  return getDecks().then(decks => {
    return AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...decks[title].questions, card]
        }
      })
    );
  }).then(() => card)
}

export function getQuizStatus() {
  return AsyncStorage.getItem(QUIZSTATUS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(!data) {
        data = []
      }
      return data
    })
}

export function updateQuizStatus(title) {
  return getQuizStatus().then(quizStatus => {
    if(!~quizStatus.indexOf(title)) {
      quizStatus.push(title)
      AsyncStorage.setItem(QUIZSTATUS_STORAGE_KEY, JSON.stringify(quizStatus))
    }
  })
}

export function removeQuizStatus(title) {
  return getQuizStatus().then(quizStatus => {
    const index = quizStatus.indexOf(title)
    if(~index) {
      quizStatus.splice(index, 1)
      AsyncStorage.setItem(QUIZSTATUS_STORAGE_KEY, JSON.stringify(quizStatus))
    }
  })
}

export function resetDecks() {
  return AsyncStorage.clear();
}

getQuizStatus().then(console.log)