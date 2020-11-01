import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import ProductAPI from './productosAPI';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination'

export default function SearchAPI() {
    
    const [searchText, setSearchText] = useState("");
    const [buscados, setBuscados] = useState([]);
    const [tipoBusqueda, setTipoBusqueda] = useState("Issue")
    
    const handleChange = (e) => {
        let text = e.currentTarget.value;
        setSearchText(text);
    };

    const handleChangeSelect = (e) => {
        let selected = e.currentTarget.value;
        // setTipoBusqueda(selected);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formatSearchParameters(tipoBusqueda, searchText);
    };

    const handleSearch = async(comicVineRequest, searchOption) => { 
        
        const {data} = await axios.get( `https://cors-anywhere.herokuapp.com/${comicVineRequest}&limit=$%7Blimit%7D&offset=$%7B(page-1)*limit%7D`);    
        setBuscados(data.results)   
    };
            //----//
            // const paginator = (e) => {
            //     // console.log('paginando')
            //     let newArr = data.slice((e-1)*limit,limit*e)
            //     setPaginated(newArr)
            //     setPageStatus(false)
            // }
            // //----//

            // useEffect(()=>{
            //     // console.log('---------render 2-------')
            //     paginator(page)
            //     // console.log('----------------------')
            // },[page,products])
   
//--------------------------FILTRO------------------------------------------//
    function formatSearchParameters(searchOption, characterEntry) {
        //Differentiate between the three search parameters
        // if (tipoBusqueda === "Character") {
        //     let comicVineRequest = "https://comicvine.gamespot.com/api/characters/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        //     handleSearch(comicVineRequest, searchOption);
        //} else if (tipoBusqueda === "Issue") {//field_list=name,issue_number,description,image&sort=cover_date:desc
            let comicVineRequest = "https://comicvine.gamespot.com/api/issues/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + ",issue_number,description,image&sort=cover_date:desc&format=json";
            handleSearch(comicVineRequest, searchOption);
        // } else if (tipoBusqueda === "Story Arc") {
        //     let comicVineRequest = "https://comicvine.gamespot.com/api/story_arcs/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        //     handleSearch(comicVineRequest, searchOption);
        // }
    }
//-------------------------------------------FILTRO-------------------------------------//


    return (
        <div> 
        <form class="form-inline my-2 my-lg-0 m-4" onSubmit={handleSubmit}>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value="Character" selected='selected'>Personaje</option>
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

