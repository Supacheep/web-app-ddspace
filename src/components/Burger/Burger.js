import styled from 'styled-components'

export const StyledBurger = styled.button`
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 100%;
    height: 2px;
    background: #000;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`

const Burger = (props) => (
  <StyledBurger {...props}>
    <div />
    <div />
    <div />
  </StyledBurger>
)

export default Burger
