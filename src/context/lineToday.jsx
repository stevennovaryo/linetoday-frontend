import React, { useState, useContext, useEffect, useReducer } from 'react'
import { serviceLineToday } from '../services/lineToday'
import Loading from '../components/loading'
import initializeLocalStorage from '../constants/storage'

const LineTodayContext = React.createContext()

export function useLineToday() {
  return useContext(LineTodayContext)
}

export function LineTodayProvider({children}) {
  function editMessages(state, action) {
    let messages = []
    switch (action.type) {
      case "ADD":
        action.payload.createdAt = Date.now()
        messages = [...state, action.payload]
        if (messages.length > 3) messages.shift()
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
          return Date.now() - message.createdAt < 2900
        })
      
      default:
        return state
    }
  }

  
  const [allData, setAllData] = useState(null)
  const [allSectionData, setallSectionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useReducer(editMessages, [])
  
  function addMessage(title, content) {
    setMessages({
      type: 'ADD',
      payload: {
        title: title,
        content: content,
      }
    })

    setTimeout(() => {
      setMessages({
        type: 'DELETE_TIMEOUT',
      })
    }, 3000)
  }

  useEffect(() => {
    setLoading(true)
    initializeLocalStorage()


    serviceLineToday().then( res => {
      setAllData(res.data)
      setallSectionData(res.data.result.categories)
      
      setLoading(false)
    })
  }, [])

  const value = {
    allData,
    allSectionData,
    messages,
    setMessages,
    addMessage,
  }

  return (
    <LineTodayContext.Provider value={value}>
      {loading && <Loading />}
      {!loading && children}
    </LineTodayContext.Provider>
  )
}