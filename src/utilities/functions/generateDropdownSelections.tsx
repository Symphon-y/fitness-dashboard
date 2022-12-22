export const generateDropdownSelections = (
  arrayOfOptions: string[],
  handleSelect: (e: any) => void
) => {
  return arrayOfOptions.map((option: string, index: number) => {
    return (
      <option
        key={option + index}
        onClick={(event: any) => handleSelect(event.target.value)}>
        {option}
      </option>
    );
  });
};
