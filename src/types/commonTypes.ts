export interface User {
  id: string;
  username: string;
}

export interface LiftObjectType {
  id: number;
  compound_or_isolation: string;
  lift_name: string;
  push_or_pull: string;
  upper_or_lower: string;
}

export type AvailableLifts = {
  [liftName: string]: LiftObjectType;
};

// Lift Entry Types --------------------------------
export interface LiftEntryInterface {
  lift_id: string;
  user_id: string;
  created_at: string | Date;
  wu_weight_1: number;
  wu_reps_1: number;
  wu_weight_2: number;
  wu_reps_2: number;
  wu_weight_3: number;
  wu_reps_3: number;
  ws_weight_1: number;
  ws_reps_1: number | string;
  ws_weight_2: number;
  ws_reps_2: number | string;
  ws_weight_3: number;
  ws_reps_3: number | string;
}

export type LiftEntryType = {
  [lift_id: string]: LiftEntryInterface;
};
