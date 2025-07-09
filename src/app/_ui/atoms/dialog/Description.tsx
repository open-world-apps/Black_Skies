import styled from 'styled-components';
import { mauve } from '@radix-ui/colors';
import { Description as D } from '@radix-ui/react-dialog';

const Description = styled(D)`
  margin: 10px 0 20px;
  color: ${mauve.mauve12};
  font-size: 15px;
  line-height: 1.5;
`;

export default Description;
