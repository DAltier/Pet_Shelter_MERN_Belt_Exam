import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import axios from 'axios';
import { Link } from '@reach/router';
import { PageHeader } from '../styles/Style';


import PetForm from '../components/PetForm';
import PetList from '../components/PetList';
import PetPage from '../components/PetPage';
import PetEdit from '../components/PetEdit';


export default () => {
  const [ message, setMessage ] = useState("...Loading");


  useEffect(() => {
    axios.get("http://localhost:8000/api")
      .then(res => { setMessage(res.data.message) })
  }, [])


  return (
    <div>
      <PageHeader>
        <h1>Pet Shelter</h1>
        <Link to = "/">Home</Link> | <Link to = "/new">New Pet</Link>
      </PageHeader>
      <Router>
        <PetForm path = "/new" />
        <PetList path = "/"/>
        <PetPage path= "/:_id" />
        <PetEdit path= "/:_id/edit" />
      </Router>
    </div>
  )
}