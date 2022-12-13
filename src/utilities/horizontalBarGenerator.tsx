import { barChartTestData, testDataObjectInterface } from '../assets';
import { ProgressBars } from '../components';

const horizontalBarGenerator = (
  data?: testDataObjectInterface | { [key: string]: {} }
) => {
  data = data || barChartTestData;
  let titleArray: string[];
  titleArray = [];
  let objArrayy: { values: number[]; labels: string[] }[];
  objArrayy = [];

  for (var key in barChartTestData) {
    objArrayy.push(barChartTestData[key] as testDataObjectInterface);
    titleArray.push(key);
  }

  return objArrayy.map((dataSet, index) => {
    const title = titleArray[index];
    return <ProgressBars title={title} data={dataSet} />;
  });
};

export default horizontalBarGenerator;
