import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Alert } from '../Alert/Alert';
import { TextAreaWithLineNumber } from '../TextAreaWithLineNumber/TextAreaWithLineNumber';
import { DuplicateEntries } from './DuplicateEntries';
import { FormErrors } from './FormErrors';
import { getValidationErrors } from './utils';

export const Disperse = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasDuplicateEntries, setHasDuplicateEntries] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hashMapRef = useRef();

  const resetErrorStates = () => {
    setErrors([]);
    setHasDuplicateEntries(false);
    setIsSuccess(false);
  };

  const keepFirstEntry = () => {
    let modifiedString = '';
    for (const [key, value] of hashMapRef.current) {
      const ans = `${key} ${value.amounts[0]}\n`;
      modifiedString += ans;
    }
    setTextAreaValue(modifiedString.trimEnd());
    resetErrorStates();
  };

  const combineBalance = () => {
    let outputString = '';
    for (const [key, value] of hashMapRef.current) {
      const totalAmount = value.amounts.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0
      );
      const ans = `${key} ${totalAmount}\n`;
      outputString += ans;
    }
    setTextAreaValue(outputString.trimEnd());
    resetErrorStates();
  };

  const onFindingDuplicate = () => {
    setHasDuplicateEntries(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setHasDuplicateEntries(false);

    const inputLines = textAreaValue.split('\n');
    const hashMap = new Map();
    hashMapRef.current = hashMap;

    const submissionErrors = getValidationErrors(
      inputLines,
      hashMap,
      onFindingDuplicate
    );
    setErrors(submissionErrors);

    if (!submissionErrors.length) {
      setIsSuccess(true);
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Text color='gray.600' fontWeight='semibold' marginBottom='2'>
          Addresses with amounts
        </Text>
        <TextAreaWithLineNumber
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
            resetErrorStates();
          }}
          name='user-input'
        />
        <Text color='gray.600' fontWeight='semibold'>
          Separated by ',' or ' ' or '='
        </Text>
        {hasDuplicateEntries ? (
          <DuplicateEntries
            keepFirstEntry={keepFirstEntry}
            combineBalance={combineBalance}
          />
        ) : null}
        {errors.length ? <FormErrors errors={errors} /> : null}
        {isSuccess ? (
          <Alert marginTop='5' variant='success'>
            <Text>Success!</Text>
          </Alert>
        ) : null}
        <Flex justifyContent='center' marginTop='10'>
          <Button
            type='submit'
            width='100%'
            bgColor='blue.600'
            color='white'
            _hover={{ backgroundColor: 'blue.500' }}
          >
            Next
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
