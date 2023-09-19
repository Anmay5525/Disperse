import React, { useMemo, useRef } from 'react';
import { Box, Flex, Textarea } from '@chakra-ui/react';

const textAreaHeight = 200;

export const TextAreaWithLineNumber = ({ value, onChange, name }) => {
  const lineNumberRef = useRef();
  const textareaRef = useRef();

  const lineCount = useMemo(() => value.split('\n').length, [value]);

  const handleChange = (e) => {
    onChange(e);
  };

  const handleTextAreaScroll = () => {
    if (lineNumberRef.current && textareaRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
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
        ref={lineNumberRef}
        css={{
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          '&::-webkit-scrollbar-track': {
            width: '0px',
          },
        }}
      >
        {Array.from({ length: lineCount }, (_number, i) => i + 1).map(
          (item, idx) => (
            <Box key={idx} textAlign='right' fontWeight='bold' color='gray.500'>
              {item}
            </Box>
          )
        )}
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
          name={name || 'textarea'}
          padding='0'
          border='none'
          outline='none'
          _focusVisible={{ border: 'none' }}
          resize='none'
          height={textAreaHeight}
          width='50vw'
          lineHeight='base'
          fontSize='sm'
          fontWeight='bold'
          onChange={handleChange}
          value={value}
          onScroll={handleTextAreaScroll}
          ref={textareaRef}
        />
      </Flex>
    </Flex>
  );
};
