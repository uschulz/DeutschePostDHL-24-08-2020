import { Action } from '@ngrx/store';
import { DemoItem } from '../../demo-item.model';

export enum DemosActionTypes {
  LoadDemos = '[Demos] Load Demos',
  LoadDemosSuccess = '[Demos] Load Demos Success',
  LoadDemosError = '[Demos] Load Demos Error',
  AddDemo = '[Demos] Add Demo',
  AddDemoSuccess = '[Demos] Add Demo Success',
  AddDemoFailure = '[Demos] Add Demo Failure',
  DeleteDemo = '[Demos] DeleteDemo',
  DeleteDemoSuccess = '[Demos] DeleteDemo Success',
  DeleteDemoError = '[Demos] DeleteDemo Error',
  ToggleVisiblity = '[Demos] ToggleVisiblity',
  SetSelected = '[Demos] SetSelected',
  ApplyFilter = '[Demos] ApplyFilter',
}

export class LoadDemos implements Action {
  readonly type = DemosActionTypes.LoadDemos;
}

export class LoadDemosSuccess implements Action {
  readonly type = DemosActionTypes.LoadDemosSuccess;
  constructor(public payload: DemoItem[]) {}
}

export class LoadDemosError implements Action {
  readonly type = DemosActionTypes.LoadDemosError;
  constructor(public payload: Error) {}
}

// Not persisted to DB for simpler testing
export class AddDemo implements Action {
  readonly type = DemosActionTypes.AddDemo;
  constructor(public payload: DemoItem) {}
}

export class AddDemoSuccess implements Action {
  readonly type = DemosActionTypes.AddDemoSuccess;
  constructor(public payload: DemoItem) {}
}

export class AddDemoFailure implements Action {
  readonly type = DemosActionTypes.AddDemoFailure;
  constructor(public payload: DemoItem) {}
}

export class DeleteDemo implements Action {
  readonly type = DemosActionTypes.DeleteDemo;
  constructor(public payload: DemoItem) {}
}

export class DeleteDemoSuccess implements Action {
  readonly type = DemosActionTypes.DeleteDemoSuccess;
  constructor(public payload: DemoItem) {}
}

export class DeleteDemoError implements Action {
  readonly type = DemosActionTypes.DeleteDemoError;
  constructor(public payload: Error) {}
}

export class ToggleVisiblity implements Action {
  readonly type = DemosActionTypes.ToggleVisiblity;
  constructor(public payload: DemoItem) {}
}

export class SetSelected implements Action {
  readonly type = DemosActionTypes.SetSelected;
  constructor(public payload: DemoItem) {}
}

export class SetFilter implements Action {
  readonly type = DemosActionTypes.SetSelected;
  constructor(public payload: string) {}
}

export type DemosActions =
  | LoadDemos
  | LoadDemosSuccess
  | LoadDemosError
  | AddDemo
  | AddDemoSuccess
  | AddDemoFailure
  | DeleteDemo
  | DeleteDemoSuccess
  | DeleteDemoError
  | ToggleVisiblity
  | SetSelected
  | SetFilter;
