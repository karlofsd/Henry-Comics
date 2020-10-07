const { Category, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Categories model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach('Sincroniza y limpia tu base de datos', () => conn.sync({force: true}));

  after('Sincroniza y limpia tu base de datos', () => conn.sync({force: true}));
  
  describe('Validators', () => {
    beforeEach(() => Category.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if no atributes are passed', (done) => {
        Category.create({ 
        })
          .then(() => done(new Error('It requires atributes')))
          .catch(() => done());
      });
      it('should throw an error if atributes are empty', (done) => {
        Category.create({ name: '', description: ''
        })
          .then(() => done(new Error('It requires atributes')))  
          .catch(() => done());
      });
      it('should work whit valid name', () => {
        Category.create({ name: 'category' , description: 'description'})
        .then((category) => {
          expect(category.dataValues.name).to.equal('category')
        })
      })
      it('should work whit valid description', () => {
        Category.create({ name: 'category' , description: 'description'})
        .then((category) => {
          expect(category.dataValues.description).to.equal('description')
        })
      })
      
    });
  });
});
