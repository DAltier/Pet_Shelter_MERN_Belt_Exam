import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


import { Form, Label, FormGroup, Input, RButton, PageHeader, ErrorText } from '../styles/Style';


export default props => {
  const [ name, setName ] = useState("");
  const [ type, setType ] = useState("");
  const [ desc, setDesc ] = useState("");
  const [ skill1, setSkill1 ] = useState("");
  const [ skill2, setSkill2 ] = useState("");
  const [ skill3, setSkill3 ] = useState("");
  const [ errors, setErrors ] = useState({});


  useEffect(() => {
    axios.get("http://localhost:8000/api/pets/" + props._id)
      .then(res => {
        setName(res.data.name);
        setType(res.data.type);
        setDesc(res.data.desc);
        setSkill1(res.data.skill1);
        setSkill2(res.data.skill2);
        setSkill3(res.data.skill3);
      })
      .catch(err => console.log("Error: ", err));
  }, [props._id])


  const onSubmitHandler = e => {
    e.preventDefault();
    axios.put("http://localhost:8000/api/pets/" + props._id, { name, type, desc, skill1, skill2, skill3 })
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/" + props._id)
        }
      })
      .catch(err => console.log(err));
  }


  const onClickHandler = e => {
    e.preventDefault();
    navigate("/");
  }


  return (
    <div className = "container">
      <PageHeader>Edit { name }</PageHeader>
      <Form onSubmit = { onSubmitHandler }>
        <FormGroup>
          <Label>Name</Label>
          <Input type = "text" onChange = { e => setName(e.target.value) } value = { name } />
          <ErrorText>{ errors.name ? errors.name.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <Input type = "text" onChange = { e => setType(e.target.value) } value = { type } />
          <ErrorText>{ errors.type ? errors.type.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input type = "text" onChange = { e => setDesc(e.target.value) } value = { desc } />
          <ErrorText>{ errors.desc ? errors.desc.message: "" }</ErrorText>
        </FormGroup>
        <FormGroup>
          <Label>Skill 1</Label>
          <Input type = "text" onChange = { e => setSkill1(e.target.value) } value = { skill1 } />
        </FormGroup>
        <FormGroup>
          <Label>Skill 2</Label>
          <Input type = "text" onChange = { e => setSkill2(e.target.value) } value = { skill2 } />
        </FormGroup>
        <FormGroup>
          <Label>Skill 3</Label>
          <Input type = "text" onChange = { e => setSkill3(e.target.value) } value = { skill3 } />
        </FormGroup>
        <RButton>Submit</RButton>
        <RButton onClick = { onClickHandler }>Cancel</RButton>
      </Form>
    </div>
  )
}