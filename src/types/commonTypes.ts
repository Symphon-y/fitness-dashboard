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
