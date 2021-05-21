import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { Button } from '../styles/Style';
import styles from '../styles/Table.module.css';
import DeleteButton from './DeleteButton';


export default (props) => {
  const [ pets, setPets ] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(res => { setPets(res.data); })
      .catch(err => console.log("Error: ", err));
  }, []);


  const removeFromDon = petId => {
    setPets(pets.filter(pet => pet._id !== petId));
  }


  return (
    <div>
      <h3>These pets are looking for a good home</h3>
      <table border = "1px solid black" className = "table table-dark">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Skills</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
          {pets.map((pet, i) =>
              <tr key = { i }>
                <td><Link to = {"/" + pet._id }>{ pet.name }</Link></td>
                <td>{ pet.type }</td>
                <td>{ pet.desc }</td>
                <td>{ pet.skill1 } | { pet.skill2 } | { pet.skill3 }</td>
                <td> { pet.likes }</td>
                <td><Button onClick = { (e) => navigate("/" + pet._id + "/edit") }>Edit</Button> | <DeleteButton petId = { pet._id } successCallback = { () => removeFromDon(pet._id) } /></td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}