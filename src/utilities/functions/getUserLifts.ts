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

export const getUserLifts = async (userId: any, today: any) => {
  let todaysLifts = {} as LiftListType;
  return fetch(`/user-lifts/${userId}`).then(async (res) => {
    const response = await res.json();
    response.forEach((lift: any) => {
      lift.selected_days.forEach((day: string) => {
        if (day === today) {
          todaysLifts[lift.lift_id] = { ...lift };
        }
      });
    });
    return todaysLifts;
  });
};
