import React, {useState}from "react";
import axios from 'axios';


export default function UserForm() {

const [userData, setUserData] = useState({
  email: '',
  password: '',
});

const onEnterKey = e => {
  if (e.key === 'Enter') handleRegister(e);
};

const handleInputChange = e =>{
  setUserData ({...userData, [e.target.name]: e.target.value});
};

const handleRegister = async e => {
  e.preventDefault();

  try{
    const user = await axios.post('http://localhost:3001/users/add', userData);
  
    setUserData ({email: '', password: ''})
  }catch(error){
    console.log(error)
  }
};
return (
  <form>
  <label>
    Email:
    <input type="email" name="email" value={setUserData.email} placeholder="Email" onChange={handleInputChange} onKeyPress={onEnterKey}/>
  </label>
  <label>
  Contraseña:
  <input type="password" name="password" value={setUserData.password} placeholder="Contraseña" onChange={handleInputChange} onKeyPress={onEnterKey}/>
  </label>
  <button type="submit"  onClick={(e) => handleSubmit(e)}>Registrar</button>
</form>
)
}