import moment from 'moment';

export const getLiftData = async (
  liftId: number,
  userId: string,
  setLiftData: any
) => {
  fetch(`/lifts/${userId}/${liftId}`)
    .then(async (res) => {
      const response = await res.json();
      // loop through array
      response.forEach((item: any) => {
        // for each index, format date with moment
        let date = moment(item.created_at).format('L');
        setLiftData((draft: any) => {
          // push date to label array in state
          draft.labels.push(date);
          // add weight and reps together to get total volume
          let volumn = 0;
          //TODO Fix this equation, currently the += is incorrect if no reps were completed should return 0 volumn
          volumn +=
            Number(item.wu_weight_1) +
            Number(item.wu_reps_1) +
            (Number(item.wu_weight_2) + Number(item.wu_reps_2)) +
            (Number(item.wu_weight_3) + Number(item.wu_reps_3)) +
            (Number(item.ws_weight_1) + Number(item.ws_reps_1)) +
            (Number(item.ws_weight_2) + Number(item.ws_reps_2)) +
            (Number(item.ws_weight_3) + Number(item.ws_reps_3));

          // push volume to data array
          draft.datasets[0].data.push(volumn);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
