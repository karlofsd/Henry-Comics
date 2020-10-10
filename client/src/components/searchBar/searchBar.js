import React from "react";
import { useState } from "react";

export default function Buscar({click}) {
    
    const [searchText, setSearchText] = useState("");
    
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input class="form-control mr-sm-2" type="search" placeholder="quiero buscar...!" aria-label="Search" value={searchText} onChange={handleChange}/>
        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => click(searchText)}>Buscar</button>
        </form>
    );
}
