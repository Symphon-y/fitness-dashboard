import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useUserContext } from '../../context';
import { AvailableLifts, LiftObjectType } from '../../types/commonTypes';
import { checkboxGenerator, generateDropdownSelections } from '../../utilities';
import './createLift.scss';

type weekDayObject = {
  [weekday: string]: boolean;
};

const CreateLift = () => {
  const [availableLifts, setAvailableLifts] = useState<AvailableLifts>({});
  const [selectedDays, setSelectedDays] = useState<weekDayObject>({});
  const [oneRepMax, setOneRepMax] = useState(0);
  const [selectedLift, setSelectedLift] = useImmer('');
  const user = useUserContext();

  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    let formatted = {} as AvailableLifts;
    // get lift list put in state
    fetch(`/available-lifts`)
      .then(async (res) => {
        const response = await res.json();
        // iterate over array
        response.forEach((liftObject: LiftObjectType) => {
          let liftName = liftObject.lift_name;
          formatted[liftName] = { ...liftObject };
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAvailableLifts(formatted);
      });
  }, []);

  const handleSelection = (e: any) => {
    if (selectedDays[e.target.value]) {
      setSelectedDays({
        ...selectedDays,
        [e.target.value]: !selectedDays[e.target.value],
      });
    } else {
      setSelectedDays({ ...selectedDays, [e.target.value]: true });
    }
  };

  const handleSubmit = () => {
    let days = [];
    for (var key in selectedDays) {
      if (selectedDays[key]) {
        days.push(key);
      }
    }

    const userLiftsPayload = {
      id: user.user.id + availableLifts[selectedLift].id,
      user_id: user.user.id,
      lift_id: availableLifts[selectedLift].id,
      selected_days: days,
      orm: oneRepMax,
    };

    const liftProgressPayload = {
      id: user.user.id + availableLifts[selectedLift].id,
      user_id: user.user.id,
      lift_id: availableLifts[selectedLift].id,
      target_met: false,
      target_stage: 0,
      days_missed: 0,
    };

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userLiftsPayload),
    };

    fetch('/user-lifts', requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .finally(() => {
        requestOptions = {
          ...requestOptions,
          body: JSON.stringify(liftProgressPayload),
        };
        fetch('/lift-progress', requestOptions)
          .then((response) => response.json())
          .catch((error) => console.log(error));
      });
  };

  return (
    <div className='form-container'>
      <div className='form-header'>Add A Lift</div>
      <form
        className='form-main-content'
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}>
        <div className='input-container'>
          <div className='input-label'>Select Lift</div>
          <select>
            {generateDropdownSelections(
              Object.keys(availableLifts),
              setSelectedLift
            )}
          </select>
        </div>
        <div className='input-container'>
          <div className='input-label'>One Rep Max</div>
          <input
            className='form-input'
            type='number'
            onChange={(e) => {
              setOneRepMax(Number(e.target.value));
            }}
          />
        </div>
        <div>{checkboxGenerator(week, handleSelection)}</div>
        <div className='form-footer'>
          <button className='form-btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLift;
