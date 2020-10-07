const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Categories , conn } = require('../../src/db.js');

const agent = session(app);
const category = {
  name: 'category',
  description: 'description'
};

describe('CATEGORIES routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Categories.sync({ force: true })
    .then(() => Categories.create(category)));
  
  after('Sincroniza y limpia tu base de datos', () => conn.sync({force: true}));  

  describe('POST /products/:idProducto/category/:idCategory', () => {
    it('should get 201 and return the category', () => 
      agent.post('/products/1/category/2')
      .send(category)
      .expect(201)
      .then((res) => {
        const createdCategory = res.body
        return Categories.findByPk(createdCategory.id)
      })
      .then(foundCategory => {
        expect(foundCategory.description).to.be.equal('description')
      })
    );
  });

  // describe('DELETE /products/:idProducto/category/:idCategory', () => {
  //   const categoriesArray = [{
  //     name: 'category1',
  //     description: 'description1'
  //   }, {
  //     name: 'category2',
  //     description: 'description2'
  //   }]
    // it('elimina correctamente', () => {

    //   Categories.bulkCreate(categoriesArray)
    //   .then(() => {
    //     Categories.findByPk()
    //   })
    // })
  // })
});
