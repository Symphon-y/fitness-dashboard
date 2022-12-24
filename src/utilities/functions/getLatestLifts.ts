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

export const getLatestLifts = async (lifts: any, userId: any) => {
  let latestLiftsFormatted: any;
  latestLiftsFormatted = {};
  const liftListKeys = Object.keys(lifts);
  liftListKeys.forEach((liftId: string) => {
    fetch(`/latest-lift/${userId}/${liftId}`).then(async (res) => {
      const response = await res.json();
      latestLiftsFormatted[liftId] = response;
    });
  });
  return latestLiftsFormatted;
};