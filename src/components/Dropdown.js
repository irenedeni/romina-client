import React from "react"
import styled, { css } from "styled-components"

function Dropdown(props) {

  const label = props.name?.split(/(?=[A-Z])/).join(" ")
  // console.log("props.data", props.data)
  let options = props.data?.map((data, index) => {
    return (
    <option key={index} value={data.name}>
      {data.name}
    </option>
    )
  })
  return (
    <Container>
      <Label>{label[0].toUpperCase() + label.substring(1)}</Label>
      <select
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        <option>
          Select Item
        </option>
        {options}
      </select>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 10px auto;
`

const Label = styled.label`
  display: flex;
  margin-bottom: 3px;
  font-weight: 400;
`

export default Dropdown