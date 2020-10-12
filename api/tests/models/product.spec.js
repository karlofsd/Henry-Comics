const { Product, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Product model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Product.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Product.create({
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should have proper atribs and create without image', () => {
        Product.create( { 
          name: 'Producto', 
          description: 'Description',
          author: 'Author',
          editorial: 'Editorial',
          year: 2000,
          price: 10,
          stock: 100,
        })
        .then((res) => {
          expect(res.name).to.be.equal('Producto')
          expect(res.description).to.be.equal('Description')
          expect(res.price).to.be.equal(10)
          expect(res.stock).to.be.equal(100)
        })
      });
    });
  });
});

