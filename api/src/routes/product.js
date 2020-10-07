const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/:idProduct/category/:idCategory', (req, res) => {
	const {idProduct, idCategory} = req.params;

	Product.findByPk(idProduct)
		.then((res) => {
			const product =	res;
			product.setCategories(idCategory)
		})
});

module.exports = server;
