import { Actions, AppState, SomeActions } from "../types/store";

export const reducer = (actions: Actions, state: AppState) => {
const {action, payload} =actions;
    switch (action) {
    case SomeActions.SAVE_PRODUCTS:
        state.products = [...state.products, payload]
        return state;
    case SomeActions.GET_PRODUCTS:
        state.products = payload;
        return state;

    default:
        return state;
}
}
export const reducers = (action: any, prevState: any) => {
    switch (action.type) {
      case "NAVIGATE":
        prevState.screen = action.payload;
        break;
  
        case "SETUSER":
        prevState.user = action.payload;
        break;
    }
  
    return prevState;
  };