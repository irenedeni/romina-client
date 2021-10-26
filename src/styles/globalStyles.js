import { createGlobalStyle  } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0px;
  font-family: "Quicksand", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
}
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    margin: 0px;
    color: ${({ theme }) => theme.text};
  }

  nav {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.surface1};
    font-weight: 500;
  }

  a, a:hover, a:focus, a:active {
     text-decoration: none;
     color: ${({ theme }) => theme.text};
 }

  h1 {
    font-size: 2rem;
    line-height: 2.3rem;
  }
  h2 {
    font-size: 1.8rem;
    line-height: 2rem;
  }
  h3 {
    font-size: 1.5rem;
    line-height: 1.7rem;
  }
  h4 {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }
  h5 {
    font-size: 1.1rem;
    line-height: 1.3rem;
  }
  h6 {
    font-size: 1rem;
    line-height: 1.2rem;
  }
`

export default GlobalStyle