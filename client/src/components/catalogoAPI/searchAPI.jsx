import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import ProductAPI from './productoAPI';
import axios from 'axios';

export default function SearchAPI() {
    
    const [searchText, setSearchText] = useState("");
    const [buscados, setBuscados] = useState([]);
    const [tipoBusqueda, setTipoBusqueda] = useState("")
    
    const handleChange = (e) => {
        let text = e.currentTarget.value;
        setSearchText(text);
    };

    const handleChangeSelect = (e) => {
        let selected = e.currentTarget.value;
        setTipoBusqueda(selected);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formatSearchParameters(tipoBusqueda, searchText);
    };

    const handleSearch = async(comicVineRequest, searchOption) => { 
        
        const {data} = await axios.get( `https://cors-anywhere.herokuapp.com/${comicVineRequest}&limit=10`);
        setBuscados(data.results)   
    };
   
//--------------------------FILTRO------------------------------------------//
    function formatSearchParameters(searchOption, characterEntry) {
        //Differentiate between the three search parameters
        if (tipoBusqueda === "Character") {
            let comicVineRequest = "https://comicvine.gamespot.com/api/characters/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
            handleSearch(comicVineRequest, searchOption);
        } else if (tipoBusqueda === "Issue") {
            let comicVineRequest = "https://comicvine.gamespot.com/api/issues/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
            handleSearch(comicVineRequest, searchOption);
        } else if (tipoBusqueda === "Story Arc") {
            let comicVineRequest = "https://comicvine.gamespot.com/api/story_arcs/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
            handleSearch(comicVineRequest, searchOption);
        }
    }
//-------------------------------------------FILTRO-------------------------------------//


    return (
        <div> 
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value="Character">Personaje</option>
                <option value="Issue">Número</option>
                <option value="Story Arc">Story Arc</option>
            </select>
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" value={searchText} onChange={handleChange}/>
            <button class="btn btn-danger my-2 my-sm-0" type="submit" >Buscar en API</button>  
        </form>
        <div>
        {buscados.map(p =><ProductAPI product={p}/>)}
        </div>  
    </div>
    ); 
}

