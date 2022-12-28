export const getLiftProgress = async (
  lifts: any,
  userId: any,
  setProgress: any
) => {
  const liftListKeys = Object.keys(lifts);
  let liftProg = {};
  return fetch(`/todays-lift-progress/${userId}/${liftListKeys}`)
    .then((res) => {
      const response = res.json();
      return response;
    })
    .then((res) => {
      setProgress(res);
    });
};
