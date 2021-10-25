import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Button } from "./index"

const Modal = ({ display, hide, children }, props) => 
  display ?
    (<Container>
      <Content>
        {children}
        <div>
          <Button small {...props} onClick={hide} text="close" color="#9d9d9d" style={{margin: "30px 0px 0px 0px"}}/>
        </div>
      </Content>
    </Container>
   )
   : null


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #e9e6e6;
  position: absolute;
  z-index: 2;
  padding: 20px;
  bottom: 30px;
  box-shadow: 0 0 0.5rem 0 rgb(0 0 0 / 25%);
  border-radius: 5px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`

export default Modal