// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales

mercadopago.configure({
    access_token: 'TEST-1734679437296408-102402-1fa3989d31a61cf885637d1f2882494b-489283197'
});

const linkPago = async(req,res,done) =>{
        
        let arrItems = req.body.map(p => ({
            title: p.name,
            unit_price: p.price,
            quantity: p.lineaDeOrden.quantity
        }))

        let preference = {
          items: arrItems,
          back_urls: {
            // declaramos las urls de redireccionamiento
                    success: "https://localhost:3000/payment?status=success", 
            // url a la que va a redireccionar si sale todo bien
                    pending: "https://localhost:3000.com/payment?status=pending",
            // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
                    failure: "https://localhost:3000.com/payment?status=failure"
             // url a la que va a redireccionar si falla el pago
            }
        };
        
        let response = await mercadopago.preferences.create(preference)
        res.status(200).json(response.body)
        return done(null,response)
        ;
    
    // Crea un objeto de preferencia
} 

module.exports = linkPago;