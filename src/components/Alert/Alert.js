import { Flex } from '@chakra-ui/react';
import { InfoOutlineIcon, CheckIcon } from '@chakra-ui/icons';
import React from 'react';

export const Alert = ({ children, marginTop, variant }) => {
  const isError = variant === 'error';
  return (
    <Flex
      border='1px'
      borderColor={isError ? 'red.400' : 'green.400'}
      borderRadius='md'
      padding='3'
      color={isError ? 'red.400' : 'green.400'}
      alignItems='center'
      marginTop={marginTop ?? '0'}
    >
      {isError ? (
        <InfoOutlineIcon style={{ rotate: '180deg' }} marginRight='2' />
      ) : (
        <CheckIcon marginRight='2' />
      )}

      {children}
    </Flex>
  );
};
