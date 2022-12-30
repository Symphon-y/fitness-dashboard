import { LiftProgressType } from '../../components/Exercise/Exercise';

interface FormattedType {
  [id: string]: LiftProgressType;
}

export const getLiftProgress = async (
  lifts: any,
  userId: any,
  setProgress: any
) => {
  let formatted = {} as FormattedType;
  const liftListKeys = Object.keys(lifts);
  return fetch(`/todays-lift-progress/${userId}/${liftListKeys}`)
    .then((res) => {
      const response: any = res.json();
      console.log(response);

      return response;
    })
    .then((res) => {
      res.forEach((lift: any) => {
        formatted[lift.lift_id] = lift;
      });
      setProgress(formatted);
    });
};
