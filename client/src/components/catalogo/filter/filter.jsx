import React, { useEffect, useState } from 'react'

const Filter = ({products,filter,clean}) => {  
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
        <div>
            <h3>Autor</h3>
            <ul>
                {filtros.autor[0] && filtros.autor.map(a => <li><a name={a} type='button' onClick={()=>filter(a,'author')}>{a}</a></li>)}
            </ul>
            <h3>Editorial</h3>
            <ul>
                {filtros.editorial[0] &&filtros.editorial.map(a => <li><a name={a} type='button' onClick={()=>filter(a,'editorial')}>{a}</a></li>)}
            </ul>
            <h3>Año</h3>
            <ul>
                {filtros.año[0] && filtros.año.map(a => <li><a name={a} type='button' onClick={()=>filter(a,'year')}>{a}</a></li>)}
            </ul>
            <button type='button' className='btn btn-dark' onClick={() => clean()}>Limpiar filtros</button>
        </div>
    )
}

export default Filter;