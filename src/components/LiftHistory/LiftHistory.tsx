import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAvailableLifts } from '../../utilities';
import { AvailableLifts } from '../../types/commonTypes';

import './liftHistory.scss';
import { UserContext } from '../../context';
const LiftHistory = () => {
  const [selectedLift, setSelectedLift] = useState(1);
  const [availableLifts, setAvailableLifts] = useState<AvailableLifts>();
  const [rows, setRows] = useState([
    {
      id: 1,
      created_at: '2022-09-25 00:00:00',
      wu_weight_1: 135,
      wu_reps_1: 5,
      wu_weight_2: 165,
      wu_reps_2: 3,
      wu_weight_3: 195,
      wu_reps_3: 1,
      ws_weight_1: 215,
      ws_reps_1: 4,
      ws_weight_2: 190,
      ws_reps_2: 7,
      ws_weight_3: 175,
      ws_reps_3: 10,
    },
    {
      id: 12,
      created_at: '2023-01-02 10:01:08',
      wu_weight_1: 145,
      wu_reps_1: 5,
      wu_weight_2: 180,
      wu_reps_2: 3,
      wu_weight_3: 215,
      wu_reps_3: 1,
      ws_weight_1: 240,
      ws_reps_1: 4,
      ws_weight_2: 210,
      ws_reps_2: 6,
      ws_weight_3: 185,
      ws_reps_3: 8,
    },
  ]);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'created_at', headerName: 'Date', type: 'date', width: 130 },
    {
      field: 'wu_weight_1',
      headerName: 'Warm Up 1 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'wu_reps_1',
      headerName: 'Warm Up 1 | Reps',
      type: 'number',
      width: 130,
    },
    {
      field: 'wu_weight_2',
      headerName: 'Warm Up 2 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'wu_reps_2',
      headerName: 'Warm Up 2 | Reps',
      type: 'number',
      width: 130,
    },
    {
      field: 'wu_weight_3',
      headerName: 'Warm Up 3 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'wu_reps_3',
      headerName: 'Warm Up 3 | Reps',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_weight_1',
      headerName: 'Working Set 1 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_reps_1',
      headerName: 'Working Set 1 | Reps',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_weight_2',
      headerName: 'Working Set 2 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_reps_2',
      headerName: 'Working Set 2 | Reps',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_weight_3',
      headerName: 'Working Set 3 | Weight',
      type: 'number',
      width: 130,
    },
    {
      field: 'ws_reps_3',
      headerName: 'Working Set 3 | Reps',
      type: 'number',
      width: 130,
    },
  ];
  const userContext = useContext(UserContext);
  useEffect(() => {
    getAvailableLifts(setAvailableLifts);
  }, []);

  useEffect(() => {
    fetch(`/lifts/${userContext.user.id}/${selectedLift}`).then(async (res) => {
      const response = await res.json();
      console.log(response);
      setRows([...response]);
    });
  }, [selectedLift]);
  const drawOptions = () => {
    if (availableLifts) {
      const liftKeys = Object.keys(availableLifts);
      return liftKeys.map((key) => {
        return (
          <option key={key} id={key} onClick={(e) => handleLiftSelection(e)}>
            {availableLifts[key].lift_name}
          </option>
        );
      });
    }
  };
  const handleLiftSelection = (e: any) => {
    console.log(e.target);
    console.log('e.target.id', e.target.id);
    setSelectedLift(e.target.id);
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className='lift-history-table-container'>
      <div className='lift-history-header'></div>
      <div className='lift-history-section-container'>
        <select>{drawOptions()}</select>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default LiftHistory;
