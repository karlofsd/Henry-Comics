import React,{useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './product.css'


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

    let {className, modal, toggle, p, capitalize} = props;

    return (
        <Modal isOpen={modal} toggle={toggle} className='gral-content' contentClassName='content-title'>
            <ModalHeader toggle={toggle} className='box-title'> 
                <h2 className='title'>{p.name}</h2> 
            </ModalHeader>
            <ModalBody>
                <div className='content-body'>
                    <div className='content-img'>
                        <img src={p.image} className='img-body'/>
                    </div>
                    <div className='data-body'>
                        <label className="info-label"><b>Autor:</b> {capitalize(p.author)}</label>
                        <label className="info-label"><b>Año:</b> {p.year}</label>
                        <label className="info-label"><b>Editorial:</b> {capitalize(p.editorial)}</label>
                        <label className="info-label"><b>Calificación:</b> ""</label>
                        <div>
                            <label className="info-label"><b>Descripcion:</b> </label>
                            <p className='description-body'>"{p.description=p.description[0].toUpperCase()+p.description.slice(1)}"</p>
                        </div>
                        <div className='price-cart'>
                            <h3 className='h3-price'>${p.price}</h3>
                            <Button color="dark" onClick={toggle}>Agregar a carrito</Button>
                        </div>
                    </div>
                </div>
                <hr/>
                <Button color="danger" className='comments' onClick={toggleNested}>Ver Comentarios</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                    <ModalHeader>Aqui va la lista de comentarios</ModalHeader>
                    <ModalBody>aqui va el input de comentario</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleNested}>enviar</Button>{' '}
                        <Button color="secondary" onClick={toggleAll}>cancelar</Button>
                    </ModalFooter>
                </Modal>
            </ModalBody>           
        </Modal>
    );
}