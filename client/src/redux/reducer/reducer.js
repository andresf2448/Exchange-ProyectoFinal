import {
  CLIENT_SECRET_PAYMENT_INTENT,
  DELETE_CLIENT_SECRET_PAYMENT_INTENT,
  WAITING_CLIENT_SECRET_PAYMENT_INTENT,
  GET_ASSETS,
  SET_ASSET
} from "../actions/actionsNames";

const initialState = {
  client_secret: null,
  detailsId: null,
  assets:[],
  asset: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SECRET_PAYMENT_INTENT:
      return {
        ...state,
        client_secret: action.payload,
      };

    case DELETE_CLIENT_SECRET_PAYMENT_INTENT:
      return {
        ...state,
        client_secret: null,
      };

    case WAITING_CLIENT_SECRET_PAYMENT_INTENT:
      return {
        ...state,
        client_secret: undefined,
      };

    case "GET_USER_DETAILS_ID":
      return {
        ...state,
        detailsId: action.payload,
      };
      case GET_ASSETS:
        return {
          ...state,
          assets: action.payload,
        };
        
        case SET_ASSET:
        return {
          ...state,
          asset: action.payload
        }

    default:
      return state;
  }
}