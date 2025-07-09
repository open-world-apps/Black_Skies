import styled from 'styled-components';
import { Title as T } from '@radix-ui/react-dialog';
import { mauve } from '@radix-ui/colors';

const Title = styled(T)`
  margin: 0;
  font-weight: 500;
  color: ${mauve.mauve12};
  font-size: 17px;
`;

export default Title;
