import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const DuplicateEntries = ({ keepFirstEntry, combineBalance }) => {
  return (
    <Flex justifyContent='space-between' color='red.400' marginTop='5'>
      <Box as='span' fontWeight='bold'>
        Duplicated
      </Box>
      <Flex gap='3'>
        <Button variant='link' color='red.400' onClick={keepFirstEntry}>
          Keep the first one
        </Button>
        <Text>|</Text>
        <Button variant='link' color='red.400' onClick={combineBalance}>
          Combine Balance
        </Button>
      </Flex>
    </Flex>
  );
};
