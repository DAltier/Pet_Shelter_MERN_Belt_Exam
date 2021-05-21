const Pet = require('../models/pet.model');


module.exports.index = (req, res) => {
  res.json({ message: "Hello World" })
}


// CREATE PET
module.exports.createPet = (req, res) => {
  const { name, type, desc, skill1, skill2, skill3 } = req.body;
  console.log(req.body);


  Pet.create({ name, type, desc, skill1, skill2, skill3 })
    .then(pet => res.json(pet))
    .catch(err => res.json(err));
}


// READ ALL PETS
module.exports.getAllPets = (req, res) => {
  Pet.find({}).sort("type").exec()
    .then(pets => res.json(pets))
    .catch(err => res.json(err));
}


// READ ONE PET
module.exports.getOnePet = (req, res) => {
  Pet.findOne({ _id: req.params._id })
    .then(pet => res.json(pet))
    .catch(err => res.json(err));
}


// UPDATE PET
module.exports.updatePet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params._id }, req.body, { runValidators: true, new: true})
    .then(updatedPet => res.json(updatedPet))
    .catch(err => res.json(err));
}


// UPDATE PET
module.exports.likePet = (req, res) => {
  Pet.findOneAndUpdate(
    { _id: req.params._id},
    { $inc: { likes: 1 } }
  )
    .then(() => res.json({ message: "likes increased" }))
    .catch(err => res.json(err));
}


// REMOVE PET
module.exports.deletePet = (req, res) => {
  Pet.deleteOne({ _id: req.params._id })
    .then(deletedPet => res.json(deletedPet))
    .catch(err => res.json(err));
}