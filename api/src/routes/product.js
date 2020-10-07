const server = require('express').Router();
const { Product } = require('../db.js');
const {Sequelize:{Op}} = require('sequelize')

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/category/:categoryId',(req,res) => {
	let {categoryId} = req.params
	Product.findAll({where: categoryId})
	.then(products => res.status(200).json(products))
	.catch(error => res.status(404).json({
		message: 'No se encontraron productos',
		error: error
	}))
})

server.get('/search',(req,res) => {
	let {text} = req.query
	Product.findAll({
		where:{
			[Op.or]:[
				{name:{
					[Op.like]:`%${text}%`
				}},
				{description:{
					[Op.substring]: `${text}`
				}}
			]
		}
	})
	.then(products => res.status(200).json(products))
	.catch(error => res.status(404).json({
		message: 'No se encontraron productos',
		error: error
	}))
})

server.post('/create',(req,res) => {
	let data = req.body
	Product.create(data)
	.then(newProduct => res.status(201).json({
		message: 'Producto creado exitosamente!',
		newProduct
	}))
	.catch(error => res.status(400).json({
		message: 'El producto ya existe',
		error: error
	}))
})


// GET /products/:id
// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).

server.get("/:id", (req, res) => {
	const id = req.params.id;
	Product.findOne({
	  where: { id: id },
	})
	  .then((newProduct) => {
		res.send(newProduct);
	  })
	  .catch((err) => res.send(err));
  });
  //------------------------------------------------------//
  // PUT /products/:id
// Modifica el producto con id: id.
// Retorna 400 si los campos enviados no son correctos.
// Retorna 200 si se modificó con exito,
// y retorna los datos del producto modificado.

server.put("/:id", (req, res, next) => {
	const id = req.params.id;
  
	Product.update(
	  {
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		stock: req.body.stock,
		price: req.body.price,
		img: req.body.img,
	  },
	  {
		where: {
		  idProduct: id,
		},
		returning: true,
	  }
	)
	  .then((response) => {
		res.status(200).json(response);
	  })
	  .catch((err) =>
		res.status(400).send(err, " WARNING! -> You can´t modificate the product")
	  );
  });

  //-------------------------------------------------------------------------------------------------------//

  // DELETE /products/:id
// Retorna 200 si se elimino con exito.

server.delete("/:id", (req, res, next) => {
	const id = req.params.id;
	Product.destroy({
	  where: { id: id },
	}).then((removed) => {
	  if (removed) {
		res.status(200).end();
	  } else {
		res.status(404).json({ message: "Not found" });
	  }
	});
  });
  
module.exports = server;
