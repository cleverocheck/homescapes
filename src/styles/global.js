import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    * {
        -webkit-box-sizing: border-box; 
        -moz-box-sizing: border-box;   
        box-sizing: border-box; 
    }
`

const CanvasBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export { GlobalStyle, CanvasBlock }