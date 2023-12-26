import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  #root {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  body {
    font-family: sans-serif;
    background-color: #e2dbcc;
  }
`

export default GlobalStyles
