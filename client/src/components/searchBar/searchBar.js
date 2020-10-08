import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Buscar(props) {
    const onSearch = props;
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    const clickEnter = async (e) => {
        const { data } = await axios.get(
            `http://localhost:3001/products/search?text=${searchText}`
        );
        setProducts(data);
    };
    return (
        <div>
            <input value={searchText} onChange={handleChange} />
            <button onClick={clickEnter}>Buscar</button>
            <div>{products[0] && products.map((e) => <div>{e.name}</div>)}</div>
        </div>
    );
}
