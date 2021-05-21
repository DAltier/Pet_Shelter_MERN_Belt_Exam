import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


import { Form, Label, FormGroup, Input, RButton, ErrorText } from '../styles/Style';


export default props => {
  const [ name, setName ] = useState("");
  const [ type, setType ] = useState("");
  const [ desc, setDesc ] = useState("");
  const [ skill1, setSkill1 ] = useState("");
  const [ skill2, setSkill2 ] = useState("");
  const [ skill3, setSkill3 ] = useState("");
  const [ errors, setErrors ] = useState({});


  const onSubmitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/pets", { name, type, desc, skill1, skill2, skill3 })
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log("Error: ", err));
  }


  const onClickHandler = e => {
    e.preventDefault();
    navigate("/");
  }


  return (
    <div className = "container">
      <h3>Know a pet needing a home?</h3>
      <Form onSubmit = { onSubmitHandler }>
        <FormGroup>
          <Label>Name</Label>
          <Input type = "text" onChange = { e => setName(e.target.value) } />
          <ErrorText>{ errors.name ? errors.name.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <Input type = "text" onChange = { e => setType(e.target.value) } />
          <ErrorText>{ errors.type ? errors.type.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input type = "text" onChange = { e => setDesc(e.target.value) } />
          <ErrorText>{ errors.desc ? errors.desc.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Skill One</Label>
          <Input type = "text" onChange = { e => setSkill1(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label>Skill Two</Label>
          <Input type = "text" onChange = { e => setSkill2(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label>Skill Three</Label>
          <Input type = "text" onChange = { e => setSkill3(e.target.value) } />
        </FormGroup>
        <RButton>Submit</RButton>
        <RButton onClick = { onClickHandler }>Cancel</RButton>
      </Form>
    </div>
  )
}