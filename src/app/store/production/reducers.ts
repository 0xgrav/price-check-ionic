import { createReducer, on } from "@ngrx/store";
import { setProduct } from "./actions";
import { Product } from "src/app/models/Product";

export const initialState: Product = {
    LABEL: "",
    Name: "",
    ART_CODE: "",
    details: "",
    prijs: "",
    NewPrijs: "",
    AFDE: "",
    BeginDateTime: "",
    EndDateTime: "",
};

export const productReducer = createReducer(
    initialState, on(setProduct, (state, payload) => ({ ...payload }))
);