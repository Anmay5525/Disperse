import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TextArea } from '../TextArea/TextArea';

export const Disperse = () => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Addresses with amounts</span>
        <TextArea
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <span>Separated by ',' or ' ' or '='</span>
        <Flex justifyContent='center' marginTop='10'>
          <Button
            type='submit'
            width='100%'
            bgColor='blue.400'
            color='white'
            _hover={{ backgroundColor: 'blue.300' }}
          >
            Next
          </Button>
        </Flex>
      </form>
    </div>
  );
};
