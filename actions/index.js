export const ADD_DECK = 'ADD_DECK'
export const REQUEST_DECKS = 'REQUEST_DECKS'

export const ADD_QUESTION = 'ADD_QUESTION'
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS'

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
})

export const requestDecks = () => ({
    type: REQUEST_DECKS
})


export const ADD_CARD = 'ADD_CARD'
export const addCard = ({title, card}) => ({
    type: ADD_CARD,
    title,
    card
})