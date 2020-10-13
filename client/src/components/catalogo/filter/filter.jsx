import React, { useEffect, useState } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './filter.css';

const Filter = ({products,filter,clean,status}) => { 
    
    const [filtro, setFiltro] = useState(false);
    const [author, setAuthor] = useState(false);
    const [editorial, setEditorial] = useState(false);
    const [year, setYear] = useState(false);

    const toggleF = () =>{
        setFiltro(!filtro);
        setAuthor(false);
        setEditorial(false);
        setYear(false);
    };
    const toggleA = () => setAuthor(!author);
    const toggleE = () => setEditorial(!editorial);
    const toggleY = () => setYear(!year);

    const [filtros,setFiltros] = useState({
        autor: [],
        editorial: [],
        año: [],
    })


    const getFilterList = () => {
        let newAutors = products && products.map(p => p.author)
        let newEditorial = products && products.map(p => p.editorial)
        let newAño = products && products.map(p => p.year)
        setFiltros({
            ...filtros,
            autor: [...new Set(newAutors)],
            editorial: [...new Set(newEditorial)],
            año: [...new Set(newAño)]
        })
    }
  
    useEffect(() => {        
        getFilterList()
    },[products])

    return (
        <div className="filter-fixed ">
            <div className='filter-header'>
                <h5 onClick={toggleF} className="cursor"><FontAwesomeIcon icon={faFilter} /> Filtros</h5>
                {status && <button type='button' className='btn btn-danger' onClick={() => clean()}><FontAwesomeIcon icon={faTrash} /></button>}  
            </div>
            <Collapse isOpen={filtro}>
                <Card>
                <CardBody className='body' >
                    <h5  onClick={toggleA} className="cursor">Autor</h5>
                    <Collapse isOpen={author}>
                        <Card>
                        <CardBody>
                            <ul className='filtro'>
                                {filtros.autor[0] && filtros.autor.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'author')}>{a}</a></li>)}
                            </ul>
                        </CardBody>
                        </Card>
                    </Collapse>
                    <h5 onClick={toggleE} className="cursor">Editorial</h5> 
                    <Collapse isOpen={editorial}>
                            <Card>
                            <CardBody>
                                <ul className='filtro'>
                                    {filtros.editorial[0] &&filtros.editorial.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'editorial')}>{a}</a></li>)}
                                </ul>
                            </CardBody>
                            </Card>
                    </Collapse>
                    <h5 onClick={toggleY} className="cursor" >Año</h5>
                    <Collapse isOpen={year}>
                        <Card>
                        <CardBody>
                            <ul className='filtro'>
                                {filtros.año[0] && filtros.año.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'year')}>{a}</a></li>)}
                            </ul>
                        </CardBody>
                        </Card>
                    </Collapse>
                </CardBody>
                </Card>
            </Collapse>
            
        </div>
    )
}

export default Filter;