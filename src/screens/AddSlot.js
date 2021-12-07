import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { retrieveCarers } from "../actions/carers"
import { Input, Template, Form, Button, Dropdown } from "../components"
import { fromCarerNameToId, timeframes, stayTypes } from "../lib/functionsAndObjects"
import SlotService from "../services/SlotService"


const AddSlot = (props) => {

  const initialSlotState = {
    timeframe: "",
    stayType: "",
    notes: "",
    carer: "",
    dayId: props.match.params.id
  }
  const [slot, setSlot] = useState(initialSlotState)

  const [submitted, setSubmitted] = useState()

  const carers = useSelector(state => state.carers)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(retrieveCarers())
  }, [dispatch])


  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setSlot({ ...slot, [name]: value })
  }

  const saveSlot = () => {
    const { dayId, timeframe, stayType, notes, carer } = slot

    const carerObj = fromCarerNameToId(carer, carers)
    const carerId = carerObj?.id

    const slotData = {
      timeframe: timeframe,
      stayType: stayType,
      notes: notes,
      carerId: carer ? carerId : null,
      dayId: dayId
    }
    
    SlotService.create(slotData)
    setSubmitted(true)
  }

  const newSlot = () => {
    setSlot(initialSlotState)
    setSubmitted(false)
  }


  return (
    <Template>
    {!submitted ? 
      <div>
        <h1>Add Slot</h1>
        <Form>
          <Dropdown
            id="timeframe" 
            name="timeframe" 
            value={slot.timeframe} 
            data={timeframes}
            required 
            onChange={handleInputChange}
          />
          <Dropdown
            id="stayType" 
            name="stayType" 
            value={slot.stayType} 
            data={stayTypes}
            onChange={handleInputChange}
          />
          <Dropdown
            data={carers}
            name="carer"
            id="carer"
            onChange={handleInputChange}
            value={slot.carer.name}
          />
          <Input 
            type="text" 
            id="notes" 
            name="notes" 
            value={slot.notes}  
            onChange={handleInputChange}
          />
          <Button
            onClick={saveSlot} 
            text="Submit"
          />
        </Form>
      </div>
    : 
      <div>
        <h4>New slot submitted successfully!</h4>
        <ButtonsDiv>
          <Button onClick={newSlot} text="Add more" />
          <Button onClick={() => props.history.goBack()} text="Go back" outlined/>
        </ButtonsDiv>
      </div>
  }
  </Template>
  )
}

const ButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 25px;
`

export default AddSlot