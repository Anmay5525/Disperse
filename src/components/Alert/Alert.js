import { Flex } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import React from 'react';

export const Alert = ({ children, marginTop }) => {
  return (
    <Flex
      border='1px'
      borderColor='red.400'
      borderRadius='md'
      padding='3'
      color='red.500'
      alignItems='center'
      marginTop={marginTop}
    >
      <InfoOutlineIcon style={{ rotate: '180deg' }} marginRight='2' />

      {children}
    </Flex>
  );
};
