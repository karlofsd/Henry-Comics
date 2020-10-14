import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {findProducts} from '../../redux/productos'

export default function Buscar(/* {click} */) {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("");
    
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };
    
    let lowerCaseText = searchText.toLowerCase();

    // const click = async (e) => {
    //     const { data } = await axios.get(
    //       `http://localhost:3001/products/search?text=${e}`
    //     );
    //     dispatch(filterProducts(data))
    //   };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" value={searchText} onChange={handleChange}/>
            <Link to='/catalogo' class="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => dispatch(findProducts(lowerCaseText))}>Buscar</Link>
        </form>
    );
}

