import styled from 'styled-components/native';

export const ViewProfileUnanimated = styled.View`
  height: 200px;
  width: 100%;
  elevation: 6;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  margin-top: 70px;
  align-items: center;
`;

export const ViewPhoto = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 130px;
  width: 130px;
  border-radius: 65px;
  margin-horizontal: 20px;
`;

export const ViewAdress = styled.View`
  max-width: 100%;
`;
