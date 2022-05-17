import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: left;
  max-width: 200px;
`

export const Input = styled.input`
  width: 18px;
  margin-right: 10px;
`

export const Label = styled.label`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  
  color: ${({ theme }) => theme.colors.cinza1};
`