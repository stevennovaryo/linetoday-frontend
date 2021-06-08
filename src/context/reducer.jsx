import { NEWSFEED } from '../constants/display'

export function editMessages(state, action) {
  let messages = []
  switch (action.type) {
    case "ADD":
      action.payload.createdAt = Date.now()
      messages = [...state, action.payload]
      if (messages.length > NEWSFEED.MAXIMUM_POPUP) messages.shift()
      return messages

    case "DELETE":
      messages = []
      let index = action.payload
      for (let i = 0; i < state.length; i++) {
        if (i === index) continue
        messages.push(state[i])
      }
      return messages

    case "DELETE_TIMEOUT":
      return state.filter((message) => {
        return Date.now() - message.createdAt < NEWSFEED.POPUP_TIMEOUT
      })
    
    default:
      return state
  }
}