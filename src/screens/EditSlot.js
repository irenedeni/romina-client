import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { retrieveCarers } from "../actions/carers"
import SlotService from "../services/SlotService"
import { Input, Template, Form, Dropdown, Button as StyledButton, Modal } from "../components"
import { fromCarerNameToId, timeframes, stayTypes } from "../lib/functionsAndObjects"
import useModal from "../hooks/useModal"


const EditSlot = (props) => {
  const initialSlotState = {
    id: null,
    timeframe: "",
    stayType: "",
    notes: "",
    carer: "",
    carerId: null
  }

  const [currentSlot, setCurrentSlot] = useState(initialSlotState)
  const [message, setMessage] = useState("")
  const { show, toggleVisibility } = useModal()

  const carers = useSelector(state => state.carers)

  const dispatch = useDispatch()

  const getSlot = id => {
    SlotService.get(id)
    .then(res => {
      setCurrentSlot(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getSlot(props.match.params.id)
    dispatch(retrieveCarers())
  }, [props.match.params.id])


  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentSlot({ ...currentSlot, [name]: value })
  }

  const updateContent = () => {
    const carerName = currentSlot.carer?.name || currentSlot.carer
    const updatedCarer = fromCarerNameToId(carerName, carers)
    currentSlot.carerId = updatedCarer.id
    SlotService.update(currentSlot.id, currentSlot)
    .then(() => {
      setMessage("Slot updated successfully! Wait to be redirected")
      setTimeout(() => props.history.goBack(), 1500)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const removeSlot = () => {
    SlotService.remove(currentSlot.id)
    .then(()=> {
      props.history.goBack()
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <Template>
      {currentSlot ? (
        <div>
          <h2>UPDATE Slot</h2>
          <Form>
            <Dropdown
              id="timeframe" 
              name="timeframe" 
              value={currentSlot.timeframe} 
              data={timeframes}
              required 
              onChange={handleInputChange}
            />
            <Dropdown
              id="stayType" 
              name="stayType" 
              value={currentSlot.stayType} 
              data={stayTypes}
              onChange={handleInputChange}
            />
            <Input 
              type="text" 
              id="notes" 
              name="notes" 
              value={currentSlot.notes}  
              onChange={handleInputChange}
            />
            <Dropdown
              data={carers}
              name="carer"
              id="carer"
              onChange={handleInputChange}
              value={currentSlot.carer?.name}
            />
          </Form>
          <Button
            type="submit"
            text="Update"
            onClick={updateContent}
          />
          <Button text="Delete" onClick={toggleVisibility}/>
          <Modal display={show} hide={toggleVisibility}>
            <p>Are you sure you want to remove this slot?</p>
            <StyledButton text="YES" onClick={removeSlot} colour={({theme}) => theme.alert}/>
          </Modal>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Select a slot</p>
        </div>
      )}
    </Template>
  )
}

const Button = styled(StyledButton)`
  margin: 0px 10px 10px 0px;
`

export default EditSlot