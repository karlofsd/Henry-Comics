import React from "react";
import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import ProductAPI from './productosAPI';
import axios from 'axios';
import Pagination from './pagination';
import gif from './marvel_loader.gif';

export default function SearchAPI() {
    
    const [searchText, setSearchText] = useState("");
    const [buscados, setBuscados] = useState([]);
    const [tipoBusqueda, setTipoBusqueda] = useState("Issue");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [buscadosPorPage] = useState(10);
    
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
        setLoading(true);
        const {data} = await axios.get( `https://cors-anywhere.herokuapp.com/${comicVineRequest}&limit=100`);    
        setBuscados(data.results);
        setLoading(false);
    };

    useEffect (()=> {    
        handleSearch();
    }, []);

    const indexOfLastProd = currentPage * buscadosPorPage;
    const indexOfFirstProd = indexOfLastProd - buscadosPorPage;
    const currentBuscados = buscados.slice(indexOfFirstProd,indexOfLastProd);
    const paginate = pageNumber => setCurrentPage(pageNumber)
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
        <form className="form-inline my-2 my-lg-0 m-4" onSubmit={handleSubmit}>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value="Character" selected='selected'>Personaje</option>
                <option value="Issue">Número</option>
                <option value="Story Arc">Story Arc</option>
            </select>
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" value={searchText} onChange={handleChange}/>
            <button className="btn btn-danger my-2 my-sm-0" type="submit" >Buscar en API</button>  
        </form>
            {loading ? 
            <div>
                <img src={gif}></img>    
            </div>
            :
            <div>
            {currentBuscados.map(p =><ProductAPI product={p}/>)}
            <Pagination 
            buscadosPorPage={buscadosPorPage}
            totalBuscados={buscados.length}
            paginate={paginate}
            />
            </div>
            }
    </div>
    ); 
}

