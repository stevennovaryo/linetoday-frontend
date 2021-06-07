import React from 'react'
import { Modal, Spinner } from 'react-bootstrap' 

function Loading() {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      className="text-center"
    >
      <Modal.Body>
        <p className="sr-only" style={{fontSize: "25px"}} >Loading...</p>
        <Spinner animation="border" />
      </Modal.Body>
    </Modal>
  )
}

export default Loading
