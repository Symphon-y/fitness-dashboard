export const getLiftProgress = async (
  lifts: any,
  userId: any,
  setProgress: any
) => {
  var liftListKeys = Object.keys(lifts);
  liftListKeys.forEach((lift) => {
    let liftId = `${userId}${lift}`;
    return fetch(`/lift_progress/${liftId}`)
      .then((res) => {
        const response = res.json();
        return response;
      })
      .then((res) => {
        setProgress((progress: any) => ({
          ...progress,
          [lift]: { ...res },
        }));
      });
  });
};
