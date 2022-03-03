import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-direction: column;
`;

export const TypeNameContainer = styled.div`
  background: #91c7f7;
  border-radius: 8px;
  height: 160px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
`;

export const RegisterContainerWrapper = styled.div`
  display: flex;
  width: calc(100% - 60px);
  flex-direction: column;
  position: relative;
`;

export const RegisterContainer = styled.div<{withoutRegister?: boolean}>`
  background: #d3e9fc;
  border: 1px solid #91c7f7;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  margin: 0 32px;
  width: 480px;
  overflow-y: scroll;
  white-space: break-spaces;

  justify-content: ${({ withoutRegister }) => withoutRegister && "center"};
  align-items: ${({ withoutRegister }) => withoutRegister && "center"};
  text-align: ${({ withoutRegister }) => withoutRegister && "center"};

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Date = styled.p`
  font-size: 1.4rem;
  color: #334254;
`;

export const Register = styled.p`
  font-size: 1.4rem;
  color: #66717f;
  margin-top: 8px;
`;

export const NewRegisterArea = styled.textarea`
  background: #f4f9fe;
  border: 1px solid #91c7f7;
  box-sizing: border-box;
  border-radius: 8px;
  height: 160px;
  resize: none;
  width: 100%;
  outline: none;
  font-size: 1.4rem;
  padding: 8px 16px;
  min-width: 470px;
`;

export const ButtonMoreRegister = styled.p`
  font-size: 1.4rem;
  color: #238fef;
  cursor: pointer;
`;

export const ReferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  top: -25px;
  left: 50px;
  position: absolute;
  width: 460px;
`;

export const Text = styled.p`
  font-size: 1.4rem;
`;

export const NewRegisterText = styled.p`
  font-size: 1.4rem;
  position: absolute;
  top: -25px;
  right: 360px;
`;
