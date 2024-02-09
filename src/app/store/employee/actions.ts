import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/models/Employee';

export const setEmployee = createAction(
    '[Employee Component] Set Employee',
    props<Employee>()
);