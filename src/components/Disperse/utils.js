export const getValidationErrors = (
  inputLines,
  hashMap,
  onFindingDuplicate
) => {
  const submissionErrors = [];

  inputLines.forEach((line, idx) => {
    let result = line.trim().split(/,| |=/i);
    result = result.filter((val) => !!val);

    const address = result[0];
    const amount = result[1];

    //check if key value pair exists
    if (result.length !== 2) {
      submissionErrors.push(
        `Error in line ${idx + 1}. Expecting a key value pair.`
      );
    }
    //check if 2nd element is a nunber
    if (isNaN(Number(amount))) {
      submissionErrors.push(`Line ${idx + 1} wrong amount.`);
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
      onFindingDuplicate();
      //check for duplicates
      submissionErrors.push(
        `Address ${key} encountered duplicate in Line: ${value.lineIds.join(
          ','
        )}.`
      );
    }
  }

  return submissionErrors;
};
