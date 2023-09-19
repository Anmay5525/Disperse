import { Disperse } from './components/Disperse/Disperse';
import { Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      fontSize='14px'
      marginTop='10'
    >
      <Disperse />
    </Flex>
  );
}

export default App;
