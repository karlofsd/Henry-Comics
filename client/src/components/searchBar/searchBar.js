import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'

export default function Buscar({click}) {
    
    const [searchText, setSearchText] = useState("");
    
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };
    let lowerCaseText = searchText.toLowerCase();

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" value={searchText} onChange={handleChange}/>
            <Link to='/catalogo' class="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => click(lowerCaseText)}>Buscar</Link>
        </form>
    );
}

