interface ITransectPoint {
  x: number,
  y: number,
  z: number
}

interface ITransect {
  [index: number]: ITransectPoint
}

const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomZIndex = () => {
  return Math.floor(Math.random() *7);
};

const xValues = [-40, -20, 0, 20];
const yValues = [-6, -4, -2, 0, 2, 4, 6];
const zValues = Array.from(Array(7), (el) => el = getRandomValue(.5, 2));

const createFakeData = () => {
  const aggregatedData: Array<ITransect> = [{}, {}, {}, {}];

  aggregatedData.forEach((el, idx) => {
    for (let j = 0; j < 7; j++){
      el[j] = {
        x: xValues[idx],
        y: yValues[j],
        z: zValues[getRandomZIndex()]
      };
    }
  });

  return aggregatedData;
};

export const fakeAggregatedData = createFakeData();
