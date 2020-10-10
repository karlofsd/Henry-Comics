import React,{useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Product(props) {
    
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
      }
      const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
      }

    let {className,modal,toggle,p} = props

    return (
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{p.name}</ModalHeader>
            <ModalBody>
                <p>{p.description}</p>
                <br />
                <Button color="success" onClick={toggleNested}>Ver Comentarios</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                    <ModalHeader>Aqui va la lista de comentarios</ModalHeader>
                    <ModalBody>aqui va el input de comentario</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleNested}>enviar</Button>{' '}
                        <Button color="secondary" onClick={toggleAll}>cancelar</Button>
                    </ModalFooter>
                </Modal>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Agregar a carrito</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}