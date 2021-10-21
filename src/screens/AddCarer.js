import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createCarer } from "../actions/carers"
import { Toggle, Input, Template, Form, Button, Dropdown } from "../components"

const AddCarer = () => {

  const initialCarerState = {
    id: null,
    name: "",
    phone: "",
    email: "",
    professional: false
  }
  const [carer, setCarer] = useState(initialCarerState)

  const [submitted, setSubmitted] = useState()

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
    setCarer({ ...carer, [name]: value })
    } else setCarer({ ...carer, [name]: checked })
  }

  const saveCarer = () => {
    const { name, email, phone, professional } = carer
    console.log("carer", carer)
    dispatch(createCarer(name, email, phone, professional))
    .then(data => {
      setCarer({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        professional: data.professional ? data.professional : false
      })
    })
    .catch(e => {
      console.log(e)
    })
    setSubmitted(true)
  }

  const newCarer = () => {
    setCarer(initialCarerState)
    setSubmitted(false)
  }
console.log('carer', carer)

  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add new carer</h1>
        <Form onClick={saveCarer}>
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
          {/* <Dropdown 
          /> */}
        </Form>
      </div>
    : 
      <div>
        <h4>New carer submitted successfully</h4>
        <Button onClick={newCarer} text="Add more" />
      </div>
  }
  </Template>
  )
}

export default AddCarer