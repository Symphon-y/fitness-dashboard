export const checkboxGenerator = (
  options: string[],
  handleSelection: (e: any) => void
) => {
  return options.map((option: string) => {
    return (
      <div>
        <input
          type='checkbox'
          id={option}
          name={option}
          value={option}
          onChange={(e) => handleSelection(e)}
        />
        {option}
      </div>
    );
  });
};
