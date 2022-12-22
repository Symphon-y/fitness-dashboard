import { AvailableLifts } from './../../types/commonTypes';

export const getTodaysLifts = async (
  today: any,
  userId: any,
  setLiftList: any,
  callback?: any
) => {
  let todaysLifts = {} as AvailableLifts;
  return await fetch(`/user-lifts/${userId}`)
    .then(async (res) => {
      const response = await res.json();
      response.forEach((lift: any) => {
        lift.selected_days.forEach((day: string) => {
          if (day === today) {
            todaysLifts[lift.lift_id] = { ...lift, progress: 0 };
          }
        });
      });
    })
    .then(async () => {
      await setLiftList(todaysLifts);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('get todays lifts: finally');
      return callback();
    });
};
