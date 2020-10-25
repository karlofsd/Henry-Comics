import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ResetPass = (props) => {
    const { id , firstname, email} = props.user
    // console.log('Componente Reset Pass',props)
    // console.log(id, firstname, lastname, email)
  return (
    <Form>
    <h4>Resetar Password: </h4>
    <h5>
        <p>{firstname}</p>
        <p>{email}</p>
    </h5>
      <Row form>
        <Col md={6}>
            <FormGroup>
                <Label for="examplePassword">Nueva Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="nueva password" />
            </FormGroup>
        </Col>
        <Col md={6}>
            <FormGroup>
                <Label for="examplePassword">Confirmar Password</Label>
                <Input type="password" name="passwordRepeat" id="examplePassword" placeholder="repetir password" />
            </FormGroup>
        </Col>
      </Row>
      <Button>Confirmar</Button>
    </Form>
  );
}

export default ResetPass;
