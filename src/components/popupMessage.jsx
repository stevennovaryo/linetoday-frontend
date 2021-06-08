import { Toast } from 'react-bootstrap'
import React from 'react'
import { useLineToday } from '../context/lineToday'
import './style.scss'

export function PopupMessage({message, index}) {
  const { setMessages } = useLineToday()
  
  function handleClose() {
    const action = {
      type: 'DELETE',
      payload: index,
    }
    setMessages(action)
  }

  return (
    <Toast onClose={handleClose}>
      <Toast.Header>
        <strong className="mr-auto">{message.title}</strong>
      </Toast.Header>
      <Toast.Body>{message.content}</Toast.Body>
    </Toast>
  )
}

export default function PopupContainer() {
  const { messages } = useLineToday()
  return (
    <div className='popup-container'>
      { messages.map((message, idx) => <PopupMessage message={message} key={idx} index={idx} />) }
    </div>
  )
}