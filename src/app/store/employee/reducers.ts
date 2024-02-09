import { createReducer, on } from "@ngrx/store";
import { setEmployee } from "./actions";
import { Employee } from "src/app/models/Employee";

export const initialState: Employee = {
    UserID: '',
    Name: '',
};

export const employeeReducer = createReducer(
    initialState, on(setEmployee, (state, payload) => ({ ...payload }))
);