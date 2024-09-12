import styled from 'styled-components';
import { breakpoints } from '../../constants';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 1fr;
  grid-gap: 0.5rem;
    

  @media (max-width: ${breakpoints.xs}) {
    grid-template-columns: 2rem 1fr;
    & > :nth-child(3) {
      grid-column: 1 / -1;
    }
  }

    & > :nth-child(4) {
    grid-column: 1 / -1;
  }
`;
