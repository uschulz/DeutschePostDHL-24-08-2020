import { Action } from '@ngrx/store';
import { DemoItem } from '../../demo-item.model';

export enum DemosActionTypes {
  LoadDemos = '[Demos] Load Demos',
  LoadDemosSuccess = '[Demos] Load Demos Success',
  LoadDemosError = '[Demos] Load Demos Error',
  DeleteDemo = '[Demos] DeleteDemo',
  DeleteDemoSuccess = '[Demos] DeleteDemo Success',
  DeleteDemoError = '[Demos] DeleteDemo Error',
  ToggleVisiblity = '[Demos] ToggleVisiblity',
  SetSelected = '[Demos] SetSelected',
  ApplyFilter = '[Demos] ApplyFilter'
}

export class LoadDemos implements Action {
  readonly type = DemosActionTypes.LoadDemos;
}

export class LoadDemos_Success implements Action {
  readonly type = DemosActionTypes.LoadDemosSuccess;
  constructor(public payload: DemoItem[]) {}
}

export class LoadDemos_Error implements Action {
  readonly type = DemosActionTypes.LoadDemosError;
  constructor(public payload: Error) {}
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
  | LoadDemos_Success
  | LoadDemos_Error
  | DeleteDemo
  | DeleteDemoSuccess
  | DeleteDemoError
  | ToggleVisiblity
  | SetSelected
  | SetFilter;
