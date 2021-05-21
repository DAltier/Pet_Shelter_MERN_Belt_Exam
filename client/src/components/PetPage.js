import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


import { Container, Button } from '../styles/Style';


import DeleteButton from './DeleteButton';



export default props => {
  const [ pet, setPet ] = useState("");
  const [ likes, setLikes ] = useState(0);


  const displayPet = () => {
    axios.get("http://localhost:8000/api/pets/" + props._id)
      .then(res => { setPet(res.data) })
      .catch(err => console.log("Error: ", err));
  }


  useEffect(() => {
    displayPet();
  }, [props._id])


  const like = _id => {
    axios.put("http://localhost:8000/api/like/" + _id, { likes })
      .then(res => { displayPet() })
      .catch(err => console.log("Error: ", err));
      document.getElementById('like_button').setAttribute("disabled", "disabled");
  }


  return (
    <Container>
      <h1>Details about { pet.name }</h1>
      <h3>Type: { pet.type }</h3>
      <h3>Description: { pet.desc }</h3>
      <h3>Skills: { pet.skill1 } | { pet.skill2 } | { pet.skill3 }</h3>
      <h3>Likes: { pet.likes } </h3>
      <button id = "like_button" onClick = { e => { like(pet._id) } }>Like this pet</button>
      <Button onClick = { (e) => navigate("/") }>Back</Button>
      <Button onClick = { (e) => navigate("/" + pet._id + "/edit") }>Edit</Button>
      <DeleteButton petId = { pet._id } successCallback = { () => navigate("/") } />
    </Container>  
  )
}