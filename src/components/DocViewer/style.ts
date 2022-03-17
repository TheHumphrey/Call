import styled from "styled-components"
import { Select as BaseSelect } from "lib/components/Select/Select"

type TEditorContainerProps = {
  isNotFound?: boolean;
}

export const Container = styled.div`
  margin: 0px 10px;
`;

export const Select = styled(BaseSelect)`
  width: 100%;
  margin: auto;
`

export const EditorContainer = styled.div<TEditorContainerProps>`
  max-width: 1100px;
  margin: auto;
  max-height: 900px;
  padding: 0px 15px;
  
  ${({ isNotFound }) => isNotFound && "display: flex;"}
  ${({ isNotFound }) => isNotFound && "justify-content: center;"}
  ${({ isNotFound }) => isNotFound && "align-items: center;"}
  ${({ isNotFound }) => isNotFound && "min-height: 150px;"}
`

export const SelectContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 24px;
  padding: 0px 15px;
  max-width: 1103px;
`

export const NotFoundDocument = styled.span`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 30px;
`
