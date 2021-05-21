import React from 'react';
import axios from 'axios';


import { Button } from '../styles/Style';


export default props => {
  const { petId, successCallback } = props;


  const deletePet =(e) => {
    axios.delete("http://localhost:8000/api/pets/" + petId)
      .then(res => successCallback(petId));
  }


  return (
    <Button onClick = { deletePet }>Adopt</Button>
  )
}