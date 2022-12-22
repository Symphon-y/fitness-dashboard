export interface LiftListInterface {
  id: string;
  user_id: string;
  lift_id: number;
  orm: number;
  selected_days: string[];
  progress: number;
}

export type LiftListType = {
  [lift_id: string]: LiftListInterface;
};

export const getLatestLifts = async (
  userId: string,
  liftList: LiftListType,
  setPrevHistory: any,
  callback?: any
) => {
  console.log('get latest lifts: start');
  let latestLiftsFormatted: any;
  latestLiftsFormatted = {};
  const liftListKeys = Object.keys(liftList);
  console.log(liftListKeys);
  liftListKeys.forEach((liftId: string) => {
    console.log('getLatestLifts', liftId);
    fetch(`/latest-lift/${userId}/${liftId}`)
      .then(async (res) => {
        const response = await res.json();
        latestLiftsFormatted[liftId] = response;
      })
      .then(() => {
        console.log();
        setPrevHistory(latestLiftsFormatted);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('get latest lifts: finallly');
        callback && callback();
      });
  });
};
