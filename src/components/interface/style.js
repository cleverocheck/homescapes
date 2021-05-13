import styled, { keyframes } from 'styled-components'

const visible_logo = keyframes`
    from {
        visibility: visible;
        transform: scale(0.4);
    }
    80% {
        transform: scale(1.1);
    }
    to {
        visibility: visible;
        transform: scale(1);
    }
`

const open_pulse = keyframes`
    from {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    to {
        transform: scale(1);
    }
`

const blackout = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const LogoBlock = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
    user-select: none;
    img {
        visibility: hidden;
        animation: ${visible_logo} 0.2s linear 1s;
        animation-fill-mode: forwards;
        width: 20vw;
    }
`

const OpenBlock = styled.div`
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    user-select: none;
    img {
        cursor: pointer;
        animation: ${open_pulse} 2s linear infinite 0.5s;
        width: 25vw;
    }
`

const Blackout = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    background: #000000b7;
    animation: ${blackout} 0.25s linear;
    animation-fill-mode: forwards;
    img {
        margin-bottom: 20vh;
        width: 45vw;
    }
`

export { LogoBlock, OpenBlock, Blackout }