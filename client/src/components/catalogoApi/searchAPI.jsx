import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import ProductAPI from './productoAPI';
import axios from 'axios';

export default function SearchAPI() {
    
    const [searchText, setSearchText] = useState("");
    const [buscados, setBuscados] = useState([])
    
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleSearch = async(query) => {
        const { results } = axios.get( `http://comicvine.gamespot.com/api/search?format=json&api_key=3067a5d595113ed2107c1651ac9856c2471f19fa&query=daredevil&limit=10`);
        console.log(results);
        //await dispatch(clean());
        //await dispatch(findProducts(lowerCaseText)) ---> Peticion a la api
    //}url/<resource>/?api_key=your_apikey &filter=<field_list>: (filter statement)
        //setSearchText("")
    
    return (
        <div>
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" value={searchText} onChange={handleChange}/>
            <button class="btn btn-danger my-2 my-sm-0" type="submit"  onClick={() => handleSearch()}>Buscar en API</button>  
        </form>
        <div>
        {buscados.map(p =><ProductAPI product={p}/>)}
        </div>
        
    </div>
    );
}