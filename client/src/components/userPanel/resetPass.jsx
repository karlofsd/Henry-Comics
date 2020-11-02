import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import Axios from 'axios';

const ResetPass = (props) => {
    const { id , firstname, email} = props.user

    const [password, setPassword] = useState({
        actual:'',
        new:''
    });

    const handlerChange = (e) =>{
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const handlerNewPass = async ()=>{
        let body= {
            password: password.actual
        }
        if(!password.new || !password.actual){
            return alert('Deve Completar Todos sus campos')
        }

        const { data } = await Axios.post(`http://localhost:3001/user/${id}/password`,
            body,
            { withCredentials: true })
        if(data){
            await Axios.post(`http://localhost:3001/user/${id}/passwordReset`,{
                password: password.new
            }, { withCredentials: true })
        }else{
            alert('Invalid pass')
        }
    }

  return (
    <Form className="m-4" onSubmit={handleSubmit}>
    <h4>Resetar Password: </h4>
    <h5>
        <p>{firstname}</p>
        <p>{email}</p>
    </h5>
      <Row form>
        <Col md={2}>
            <FormGroup>
                <Label for="examplePassword">Contraseña Actual</Label>
                <Input type="password" name="actual" placeholder="Contraseña actual ..."
                    value={password.actual}
                    onChange={handlerChange}
                />
            </FormGroup>
        </Col>
        <Col md={2}>
            <FormGroup>
                <Label for="examplePassword">Contraseña Nueva</Label>
                <Input type="password" name="new" placeholder="Nueva contraseña ..."
                value={password.new}
                onChange={handlerChange}
                />
            </FormGroup>
        </Col>
      </Row>
      <Button type="submit" onClick={()=> handlerNewPass()}>Confirmar</Button>
    </Form>
  );
}

export default ResetPass;
