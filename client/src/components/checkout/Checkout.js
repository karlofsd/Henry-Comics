import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {cleanCart} from '../../redux/carrito'
import ScriptTag from 'react-script-tag'

const Checkout = ({modal, toggle, id, items, user}) => {
    
    const [link, setLink] = useState('')

    console.log(link)
    //const user = useSelector(store => store.userState.userLogin)
    const dispatch = useDispatch()
    const [location,setLocation] = useState({
        provincias:[],
        departamentos:[],
        localidades:[],
    })
    const [input,setInput] = useState({
        provincia: "",
        departamento: "",
        localidad: "",
        direccion: "",
        email: "",
        telefono: ""
    })
    const getLink = async() => {
        const user = await axios.get('http://localhost:3001/auth/me',{ withCredentials: true })
        let body = {
            items: items,
            payer: user.data,
            checkout: input
        }
        const {data} = await axios.post(`http://localhost:3001/orders/api/v1/mercadopago`,body)
            console.log(data)
            setLink(data.init_point)
    }

    const getProvincias = async () =>{
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias`)
        setLocation({
            provincias: data.provincias,
            departamentos: [],
            localidades:[]
        })
    }
    const getDepartamentos = async () => {
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${input.provincia}`)
        setLocation ({
            ...location,
            departamentos: data.departamentos,
            localidades:[]
        })
    }
    const getLocalidades= async() =>{
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${input.provincia}&departamento=${input.departamento}`)
        setLocation ({
            ...location,
            localidades: data.localidades
        })
    }

    useEffect(() => {
        if(!input.provincia){
            getProvincias()
        }else if(!input.departamento){
            getDepartamentos()
        }else if(!input.localidad){
            getLocalidades()
        }
        // getLink()
    },[input.provincia,input.departamento,input.localidad])

    useEffect(() => {
        getLink()
    },[input])

    const handleInputChange = (e) => {
        if ('provincia' === e.target.name) {
            setInput({
                ...input,
                provincia : e.target.value,
                departamento: "",
                localidad: ""
            })
        } else if ('departamento' === e.target.name){
            setInput({
                ...input,
                departamento: e.target.value,
                localidad: ""
            })
        } else if ('localidad' === e.target.name){
            setInput({
                ...input,
                localidad: e.target.value
            })
        } else {
            setInput({
                ...input,
                [e.target.name]:e.target.value
            })
        }
    }

    const confirmBuy = async() => {
        try{
            await axios.put(`http://localhost:3001/orders/${id}?status=creada`)
    
            axios.post(`http://localhost:3001/orders/${id}/checkout`,input)
            .then( check => {
                localStorage.setItem('checkout',JSON.stringify([id,check.data.response.id]))
                dispatch(cleanCart())
                toggle()
            })
        }catch(err){
            console.log(err)
        }
        //await dispatch(getCarrito(user.id))
        //history.push('/admin'
    }
    
    // const linkPago = async() => {
    //     let body = {
    //         title: 'My Productos',
    //         unit_price: 1500,
    //         quantity: 10
    //     }
    //     const {data} = await axios.post(`http://localhost:3001/orders/api/v1/mercadopago`,body)
    //     dir = data.init_point
    // }

    const handleSubmit = (e) => {
        setInput({
            provincia: "",
            departamento: "",
            localidad: "",
            direccion: "",
            email: "",
            telefono: ""
        })
        e.preventDefault()
    }

    return(
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} className='box-title check-form'>
                <form className="form-group form-prod" onSubmit={handleSubmit}>
                    <ModalBody>
                        <div><p>Completá los datos de envío correspondientes.</p></div>
                        <div className='cate-form'>
                            <label>Provincia:</label>
                            <select name='provincia' onChange={handleInputChange}>
                                <option>---Seleccione Provincia---</option>
                                {location.provincias[0] && location.provincias.map(p =>
                                    <option value={p.nombre}>{p.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className='cate-form'>
                            <label>Departamento:</label>
                            <select name='departamento' onChange={handleInputChange}>
                                <option>---Seleccione Departamento---</option>
                                {location.departamentos[0] && location.departamentos.map(p =>
                                    <option value={p.nombre}>{p.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className='cate-form'>
                            <label>Localidad:</label>
                            <select name='localidad' onChange={handleInputChange}>
                                <option>---Seleccione Localidad---</option>
                                {location.localidades[0] && location.localidades.map(p =>
                                    <option value={p.nombre}>{p.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className='input-form'>
                            <label>Dirección:</label>
                            <input type='text' name='direccion' onChange={handleInputChange} value={input.direccion}/>
                        </div>
                        <div className='input-form'>
                            <label>Email:</label>
                            <input type='text' name='email' onChange={handleInputChange} value={input.email}
                            />  
                        </div>
                        <div className='input-form'>
                            <label>Teléfono:</label>
                            <input type='number' name='telefono' onChange={handleInputChange} value={input.telefono}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <a type='button' href={link} target='_blank' className="btn btn-secondary" onClick={confirmBuy}>Confirmar compra</a>
                        {/* <a className="btn btn-secondary" href={link} target='_blank'>MP</a> */}
                    </ModalFooter>
                    {/* <div>
                        <ScriptTag isHydrating={true} type="text/javascript" src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                            data-preference-id="<%global.init_point%>" />
                    </div> */}
                </form>
            </ModalHeader>
        </Modal>
    )

}

export default Checkout;