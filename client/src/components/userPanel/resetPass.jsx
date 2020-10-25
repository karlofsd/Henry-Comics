import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import Axios from 'axios';

const ResetPass = (props) => {
    const { id , firstname, email} = props.user

    console.log('Mi usuario ', id)

    const [password, setPassword] = useState({
        actual:'',
        new:''
    });

    const onSubmit = (values)=> {
        console.log('Datos del Submit',values)
    }

    const handlerChange = (e) =>{
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = (e)=>{
        console.log('Datos del Submit',e)
        console.log('password', password)
        e.preventDefault();
    }

    const handlerNewPass = async ()=>{
        let body= {
            password: password.actual
        }
        console.log('my body',body);
        const { data }= await Axios.post(`http://localhost:3001/user/${id}/password`,
            body,
            { withCredentials: true })
        console.log('data por post',data)
        // if(!data.password){

        // }
    }

  return (
    <Form onSubmit={handleSubmit}>
    <h4>Resetar Password: </h4>
    <h5>
        <p>{firstname}</p>
        <p>{email}</p>
    </h5>
      <Row form>
        <Col md={6}>
            <FormGroup>
                <Label for="examplePassword">Nueva Password</Label>
                <Input type="password" name="actual" placeholder="Pass Actual"
                    value={password.actual}
                    onChange={handlerChange}
                />
            </FormGroup>
        </Col>
        <Col md={6}>
            <FormGroup>
                <Label for="examplePassword">Confirmar Password</Label>
                <Input type="text" name="new" placeholder="Nueva Pass"
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
