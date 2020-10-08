import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Buscar(props) {
    
    const [searchText, setSearchText] = useState("");
    
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const clickEnter = async (e) => {
        const { data } = await axios.get(
            `http://localhost:3001/products/search?text=${searchText}`
        );
        /* setProducts(data); */
    };
    return (
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input class="form-control mr-sm-2" type="search" placeholder="quiero buscar...!" aria-label="Search" value={searchText} onChange={handleChange}/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={clickEnter}>Buscar</button>
        </form>
    );
}
