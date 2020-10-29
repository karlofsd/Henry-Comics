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
    return (
        <div style={style.container}>
            <h1>¡Gracias por tu compra!</h1>
            <p style={style.paragraph}>En instantes tu orden estará siendo procesada.</p>
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