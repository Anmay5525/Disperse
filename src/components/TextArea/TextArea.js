import React, { useMemo } from 'react';
import { Box, Flex, Textarea } from '@chakra-ui/react';

export const TextArea = ({ value, onChange }) => {
  const textAreaHeight = 200;

  const lineCount = useMemo(() => value.split('\n').length, [value]);

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <Flex backgroundColor='gray.100' position='relative'>
      <Flex
        paddingTop='2'
        flexDirection='column'
        height={textAreaHeight}
        overflowY='scroll'
        backgroundColor='gray.100'
        width='30px'
        lineHeight='base'
        fontSize='sm'
      >
        {Array.from({ length: lineCount }, (_, i) => i + 1).map((item, idx) => (
          <Box key={idx} textAlign='right' fontWeight='bold' color='gray.500'>
            {item}
          </Box>
        ))}
      </Flex>

      <Box
        height='90%'
        width='0'
        borderRight='1px'
        borderColor='gray.400'
        position='absolute'
        left='36px'
        style={{ top: 'calc(10% - 10px' }}
      />

      <Flex paddingLeft='3' paddingTop='2'>
        <Textarea
          padding='0'
          border='none'
          outline='none'
          _focusVisible={{ border: 'none' }}
          resize='none'
          height={textAreaHeight}
          width='2xl'
          lineHeight='base'
          fontSize='sm'
          fontWeight='bold'
          onChange={handleChange}
        />
      </Flex>
    </Flex>
  );
};
