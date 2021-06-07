import React, { useState, useContext, useEffect, useReducer } from 'react'
import { serviceLineToday } from '../services/lineToday'
import Loading from '../components/loading'
import initializeLocalStorage from '../constants/storage'

const LineTodayContext = React.createContext()

export function useLineToday() {
  return useContext(LineTodayContext)
}

export function LineTodayProvider({children}) {
  const [allData, setAllData] = useReducer((request, action) => action, null)
  const [allSectionData, setallSectionData] = useReducer((request, action) => action, null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    initializeLocalStorage();


    serviceLineToday().then( res => {
      setAllData(res.data)
      setallSectionData(res.data.result.categories)
      
      setLoading(false)
    })
  }, [])

  const value = {
    allData,
    allSectionData,
  }

  return (
    <LineTodayContext.Provider value={value}>
      {loading && <Loading />}
      {!loading && children}
    </LineTodayContext.Provider>
  )
}