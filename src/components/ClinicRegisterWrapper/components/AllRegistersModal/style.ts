import styled from "styled-components";

export const Container = styled.div`
  overflow: scroll;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TypeNameContainer = styled.div`
  background: #91c7f7;
  border-radius: 8px;
  height: 160px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 24px 0 5px;
`;

export const Name = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const RegisterContainerWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const RegisterContainer = styled.div<{ withoutRegister: boolean }>`
  background: #d3e9fc;
  border: 1px solid #91c7f7;
  box-sizing: border-box;
  border-radius: 8px;
  height: 160px;
  padding: 8px 16px;

  width: 301px;
  display: ${({ withoutRegister }) => withoutRegister && "flex"};
  justify-content: ${({ withoutRegister }) => withoutRegister && "center"};
  align-items: ${({ withoutRegister }) => withoutRegister && "center"};
  text-align: ${({ withoutRegister }) => withoutRegister && "center"};
  white-space: break-spaces;
  /* word-break: break-all; */

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Date = styled.p`
  font-size: 1.4rem;
  color: #334254;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Register = styled.p`
  font-size: 1.4rem;
  color: #66717f;
  margin-top: 8px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 2.4rem;
  color: #66717f;
  margin-left: 5px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  margin-right: 12px;
`;

export const PaginationButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-right: 2px;
`;

export const ArrowButton = styled.div<{ disabled?: boolean }>`
  background: #d3e9fc;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;
  display: ${({ disabled }) => disabled && "none"};
`;
