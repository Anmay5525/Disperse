import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Alert } from '../Alert/Alert';
import { TextArea } from '../TextArea/TextArea';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setHasDuplicateEntries(false);

    const submissionErrors = [];

    const inputLines = textAreaValue.split('\n');
    const hashMap = new Map();
    hashMapRef.current = hashMap;

    inputLines.forEach((line, idx) => {
      let result = line.trim().split(/,| |=/i);
      result = result.filter((val) => !!val);

      const address = result[0];
      const amount = result[1];

      if (result.length !== 2) {
        submissionErrors.push(
          `Error in line ${idx + 1}. Only 2 values are expected`
        );
      }
      if (isNaN(Number(amount))) {
        submissionErrors.push(`Line ${idx + 1} wrong amount`);
      }

      if (hashMap.has(address)) {
        hashMap.set(address, {
          lineIds: [...hashMap.get(address).lineIds, idx + 1],
          amounts: [...hashMap.get(address).amounts, amount],
        });
      } else {
        hashMap.set(address, { lineIds: [idx + 1], amounts: [amount] });
      }
    });

    for (const [key, value] of hashMap) {
      if (value.lineIds.length > 1) {
        setHasDuplicateEntries(true);
        submissionErrors.push(
          `Address ${key} encountered duplicate in Line: ${value.lineIds.join(
            ','
          )}`
        );
      }
    }

    setErrors(submissionErrors);

    if (!submissionErrors.length) {
      setIsSuccess(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Addresses with amounts</span>
        <TextArea
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
            resetErrorStates();
          }}
        />

        <span>Separated by ',' or ' ' or '='</span>
        {hasDuplicateEntries ? (
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
        ) : null}
        {errors.length ? (
          <Alert marginTop='5' variant='error'>
            <Flex flexDirection='column'>
              {errors.map((error, idx) => (
                <div key={`${error}-${idx}`}>{error}</div>
              ))}
            </Flex>
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert marginTop='5' variant='success'>
            <Text>Success!</Text>
          </Alert>
        ) : null}
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
