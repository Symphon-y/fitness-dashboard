import { AvailableLifts, LiftObjectType } from './../../types/commonTypes';

export const getAvailableLifts = async (
  setAvailableLifts: any,
  callback: any
) => {
  let availableLiftsFormatted = {} as AvailableLifts;
  return await fetch(`/available-lifts`)
    .then(async (res) => {
      const response = await res.json();
      // iterate over array
      response.forEach((liftObject: LiftObjectType) => {
        let id = liftObject.id;
        availableLiftsFormatted[id] = { ...liftObject };
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setAvailableLifts(availableLiftsFormatted);
    })
    .finally(() => {
      console.log('get available lifts: finally');
      return callback();
    });
};
