import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Children } from 'react'

export default function CreateModal({onSubmit,children}) {
    const [isShow, setIsShow] = React.useState(false);

    const handleClose = (e)=>{
        setIsShow(false)
    }




    return (
        <>
        <Button onClick={() => setIsShow(true)} className="btn bg-gradient-success btn-block mb-3">
            Create New User
        </Button>
        <Modal size="xl" show={isShow}
          onHide={handleClose}
          aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Large Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className="bg-gradient-secondary">
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit} className="bg-gradient-primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}
