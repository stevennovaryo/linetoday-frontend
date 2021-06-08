import React, { useState, useContext, useEffect, useReducer } from 'react'
import { serviceLineToday } from '../services/lineToday'
import Loading from '../components/loading'
import initializeLocalStorage from '../constants/storage'
import { NEWSFEED } from '../constants/display'
import { editMessages } from './reducer'

const LineTodayContext = React.createContext()

export function useLineToday() {
  return useContext(LineTodayContext)
}

export function LineTodayProvider({children}) { 
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
    }, NEWSFEED.POPUP_TIMEOUT)
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