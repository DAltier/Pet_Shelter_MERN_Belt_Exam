const PetController = require('../controllers/pet.controller');


module.exports = (app) => {
  app.get('/api', PetController.index);
  // CREATE
  app.post('/api/pets', PetController.createPet);
  // READ ALL
  app.get('/api/pets', PetController.getAllPets);
  // READ ONE
  app.get('/api/pets/:_id', PetController.getOnePet);
  // UPDATE
  app.put('/api/pets/:_id', PetController.updatePet);
  app.put('/api/like/:_id', PetController.likePet);
  // DELETE
  app.delete('/api/pets/:_id', PetController.deletePet);
}