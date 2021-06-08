import React from 'react'
import { Modal, Spinner } from 'react-bootstrap' 

export default function Loading() {
  return (
    <Modal
      centered
      show={true}
      className='text-center'
    >
      <Modal.Body>
        <p style={{fontSize: '25px'}} >Loading...</p>
        <Spinner animation='border' />
      </Modal.Body>
    </Modal>
  )
}