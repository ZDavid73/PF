import { Product } from "../types/products";
import { Actions, SomeActions } from "../types/store";
import firebase from "../utils/firebase";
import { Screens } from "../types/navigation";


export const saveProduct = async (product: Product): Promise<Actions> => {
    await firebase.saveProductInDB(product);
   return{
            action: SomeActions.SAVE_PRODUCTS,
            payload: product,
        };
    };
   
export const getProducts = async (): Promise<Actions> => {
    const products = await firebase.getProductsFromDB();
    return{
                action: SomeActions.GET_PRODUCTS,
                payload: products,
            };
    };

    export const navigate = (screen: Screens) => {
        return {
          type: "NAVIGATE",
          payload: screen,
        };
      };
      
      export const setUserCredentials = (user: string) => {
        return {
          type: "SETUSER",
          payload: user,
        };
      };