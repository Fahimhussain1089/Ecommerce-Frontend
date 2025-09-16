import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import Products from "../../components/Products";
import { errorReducer } from "./errorReducer";

export const store = configureStore({
    reducer:{
        Products: productReducer,
        errors: productReducer,
    },
    preloadedState: {},

});

export default store;