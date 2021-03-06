import { useState } from "react"

const useModal = () => {
  const [show, setShow] = useState(false)

  function toggleVisibility(){
    setShow(!show)
  }

  return {
   show,
   toggleVisibility
  }
}

export default useModal