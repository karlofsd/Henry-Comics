const server = require('express').Router();
const { Category } = require('../db.js');
const {isAdmin} = require('../middleware/helper')
//S18: Crear ruta para crear/agregar Categoria
// res 201 Created. El request se ha competado y se a creado un nuevo recurso
server.post('/', isAdmin, (req, res) => {
    const { name, description} = req.body
    Category.create({name, description})
        .then((category) => {
            res.status(201).json(category)
        })
        .catch((e) => {
            res.status(400).json('No se pudo crear categoria')
        })
})
//S19: Crear Ruta para eliminar Categoria
// res 200 OK. res Correcto
// res 404 Not Found. 
server.delete('/:id', (req, res) =>{
    const id  =  req.params.id;
    Category.destroy({
        where: {
            id: id
        }
    })
    .then(succes =>{
        if(succes){
            res.status(200).json({message: 'Eliminado exitosamente'});
        }
    })
    .catch(error =>{
        res.status(404).json({message: 'Elemento no encontrado', error })
    })
})
//S20: Crear ruta para Modificar Categoria
// res 200 OK. res Correcto
// res 404 Not Found. 
server.put('/:id', (req, res) =>{
    const id = req.params.id;
    const { name, description, price, stock, image} = req.body
    Category.update({
        name: name,
        description: description,
        price: price,
        stock: stock,
        image: image
    },
    {
        where: {
            id:id
        }
    })
    .then(succes =>{
        if(succes){
            res.status(200).json({message: 'Modificado'});
        }
    })
    .catch(error =>{
        res.status(404).json({message: 'El recurso de request no se a podido encontrar', error })
    })
})

server.get('/', (req, res) =>{
    Category.findAll()
    .then(resp =>{
        res.status(200).json(resp);
    })
})

module.exports = server;