import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const setProduct = createAction(
    '[Product Component] Set Product',
    props<Product>()
);