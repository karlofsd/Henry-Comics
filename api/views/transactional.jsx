const {View} = require('grandjs')

const style = {
    container:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        width:"100vw"
    },
    paragraph:{
        fontSize:"large"
    },
    table:{
        width:"80%",
        border: "1px solid",
        borderRadius:"5px"
    },
    td:{
        textAlign:"center"
    }
}

const Tabla = ({variable}) => {
    let saludo;
    let descripcion;
    
    if(variable.status === 'Pagado'){
        saludo = '¡Gracias por tu compra!'
        descripcion = 'En instantes tu orden estará siendo procesada.'
    } else{
        saludo = '¡Gracias por tu elección!'
        descripcion = 'Tu pago se encuentra pendiente; por favor envíanos el comprobante a este enlace:'
    }

    return (
        <div style={style.container}>
            <h1>{saludo}</h1>
            <p style={style.paragraph}>{descripcion}</p>
            {variable.status !== 'Pagado' && <a type='button' className='btn btn-danger' href={`http://localhost:3000/payment?status=pago&orden=${variable.orden}&check=${variable.check}`}>{`http://localhost:3000/payment?status=pago&orden=${variable.orden}&check=${variable.check}`}</a>}
            <table style={style.table}>
                <thead>
                    <tr>
                        <th style={{width:"60%"}}>Producto</th>
                        <th style={{width:"15%"}}>Precio</th>
                        <th style={{width:"10%"}}>Cantidad</th>
                        <th style={{width:"20%"}}>Precio Total</th>
                    </tr> 
                </thead>
                <tbody>
                    {variable.products.map(p => 
                    <tr>
                        <td>{p.name}</td>
                        <td style={style.td}>{p.price.toString()}</td>
                        <td style={style.td}>{p.lineaDeOrden.quantity.toString()}</td>
                        <td style={style.td}>{p.lineaDeOrden.price.toString()}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

module.exports = Tabla