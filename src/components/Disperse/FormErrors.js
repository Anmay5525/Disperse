import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Alert } from '../Alert/Alert';

export const FormErrors = ({ errors }) => {
  return (
    <Alert marginTop='5' variant='error'>
      <Flex flexDirection='column'>
        {errors.map((error, idx) => (
          <div key={`${error}-${idx}`}>{error}</div>
        ))}
      </Flex>
    </Alert>
  );
};
