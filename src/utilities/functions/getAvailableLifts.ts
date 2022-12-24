import { AvailableLifts, LiftObjectType } from './../../types/commonTypes';

export const getAvailableLifts = async (setAvailableLifts: any) => {
  let availableLiftsFormatted = {} as AvailableLifts;
  return fetch(`/available-lifts`)
    .then((res: any) => {
      const response = res.json();
      // iterate over array
      return response;
    })
    .then((res) => {
      res.forEach((liftObject: LiftObjectType) => {
        let id = liftObject.id;
        availableLiftsFormatted[id] = { ...liftObject };
      });
    })
    .then(() => {
      setAvailableLifts(availableLiftsFormatted);
    });
};
