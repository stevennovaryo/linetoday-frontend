import React from 'react'
import { Modal, Spinner } from 'react-bootstrap' 

export default function Loading() {
  return (
    <Modal centered show className='text-center'>
      <Modal.Body>
        <p className='loading-text'>Loading...</p>
        <Spinner animation='border' />
      </Modal.Body>
    </Modal>
  )
}