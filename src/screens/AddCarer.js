import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createCarer } from "../actions/carers"
import { Toggle, Input, Template, Form, Button } from "../components"

const AddCarer = (props) => {

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

export default AddCarer