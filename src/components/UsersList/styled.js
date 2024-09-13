import styled from 'styled-components';
import { Avatar, List } from 'antd';
import { breakpoints } from '../../constants';

export const LayoutWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const StyledList = styled(List)`
  flex: 1;
  max-width: ${breakpoints.md};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledAvatar = styled(Avatar)`
  background-color: rgba(255, 255, 255, 0);
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const SecondaryText = styled.div`
  font-weight: lighter;
  font-style: italic;
`;
