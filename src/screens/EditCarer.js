import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { updateCarer, deleteCarer } from "../actions/carers"
import CarerDataService from "../services/CarerService"
import { Toggle, Input, Template, Form, Button as StyledButton } from "../components"


const EditCarer = (props) => {
  const initialCarerState = {
    id: null,
    name: "",
    confirmed: false
  }

  const [currentCarer, setCurrentCarer] = useState(initialCarerState)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const getCarer = id => {
    CarerDataService.get(id)
    .then(res => {
      setCurrentCarer(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getCarer(props.match.params.id)
  }, [props.match.params.id])


  const handleInputChange = event => {
    const { name, value, checked } = event.target
    if(event.target.type !== "checkbox"){
      setCurrentCarer({ ...currentCarer, [name]: value })
    } else setCurrentCarer({ ...currentCarer, [name]: checked })
  }


  const updateContent = () => {
    dispatch(updateCarer(currentCarer.id, currentCarer))
    .then(res => {
      console.log(res)
      setMessage("carer updated successfully")
      props.history.goBack()
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeCarer = () => {
    dispatch(deleteCarer(currentCarer.id))
    .then(()=> {
      props.history.push("/carers")
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <Template>
      {currentCarer ? (
        <div>
          <h2>UPDATE Carer</h2>
          <Form>
            <Input
              type="text"
              id="name"
              name="name"
              value={currentCarer.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              id="email"
              name="email"
              value={currentCarer.email}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              id="phone"
              name="phone"
              value={currentCarer.phone}
              onChange={handleInputChange}
            />
            
            <Toggle 
              id="professional" 
              name="professional" 
              value={currentCarer.professional} 
              onChange={handleInputChange}
            />
          </Form>
          <Button
            type="submit"
            text="Update"
            onClick={updateContent}
          />
          <Button text="Delete" onClick={removeCarer}/>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Select a carer</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 0px 10px 10px 0px;
`

export default EditCarer