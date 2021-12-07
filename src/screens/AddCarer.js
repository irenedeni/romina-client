import React, { useState } from "react"
import styled from "styled-components"
import { Toggle, Input, Template, Form, Button } from "../components"
import CarerService from "../services/CarerService"

const AddCarer = (props) => {

  const initialCarerState = {
    name: "",
    phone: "",
    email: "",
    professional: false
  }
  const [carer, setCarer] = useState(initialCarerState)

  const [submitted, setSubmitted] = useState()

  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
    setCarer({ ...carer, [name]: value })
    } else setCarer({ ...carer, [name]: checked })
  }


  const saveCarer = () => {
    CarerService.create(carer)
    setSubmitted(true)
    setTimeout(()=>props.history.push("/carers"), 3000)
  }

  const newCarer = () => {
    setCarer(initialCarerState)
    setSubmitted(false)
  }

  return (
    <Template>
    {!submitted ? 
      <div>
        <H1>Add new carer</H1>
        <Form>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={carer.name} 
            required 
            onChange={handleInputChange}
          />
          <Input 
            type="text" 
            id="email" 
            name="email" 
            value={carer.email}  
            onChange={handleInputChange}
          />
          <Input 
            type="text" 
            id="phone" 
            name="phone" 
            value={carer.phone} 
            onChange={handleInputChange}
          />
          <Toggle 
            id="professional" 
            name="professional" 
            value={carer.professional} 
            onChange={handleInputChange}
          />
          <Button
            onClick={saveCarer} 
            text="Submit"
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New carer submitted successfully</h4>
        <p>Add more or wait to be redirected to the general carers page</p>
        <Button onClick={newCarer} text="Add more" />
      </div>
  }
  </Template>
  )
}

const H1 = styled.h1``


export default AddCarer