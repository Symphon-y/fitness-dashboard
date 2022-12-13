export interface testDataInterface {
  [key: string]: { values: number[]; labels: string[] };
}

export interface testDataObjectInterface {
  values: number[];
  labels: string[];
}
export const barChartTestData: { [key: string]: {} } = {
  'Test One': {
    values: [12, 20, 35, 88, 75],
    labels: ['Ash', 'Jake', 'Bill', 'Travis', 'Mike'],
  },
  'Test Two': {
    values: [100, 50, 75, 100, 25],
    labels: ['One', 'Two', 'Three', 'Four', 'Five'],
  },
  'Test Three': {
    values: [1, 3, 2, 3, 5],
    labels: ['A', 'B', 'C', 'D', 'E'],
  },
  'Test Four': {
    values: [10, 34, 23, 35, 55],
    labels: ['Another', 'One', 'DJ', 'Khalid', 'WEDABEST'],
  },
  'Test Five': {
    values: [1, 3, 2, 3, 5],
    labels: ['A', 'B', 'C', 'D', 'E'],
  },
  'Test Size': {
    values: [1, 3, 2, 3, 5],
    labels: ['A', 'B', 'C', 'D', 'E'],
  },
} as testDataInterface;
