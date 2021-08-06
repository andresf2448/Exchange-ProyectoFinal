import {
  CLIENT_SECRET_PAYMENT_INTENT,
  DELETE_CLIENT_SECRET_PAYMENT_INTENT,
  WAITING_CLIENT_SECRET_PAYMENT_INTENT,
  GET_ASSETS, GET_BALANCE,
  SET_ASSET, GET_ACCOUNT, 
  PROFILE_COMPLETE,
  GET_FULL_BALANCE
} from "../actions/actionsNames";

const initialState = {
  client_secret: null,
  detailsId: null,
  assets:[],
  asset: '',
  assetsCrypto: [],
  assetsFiat: [],
  account: {},
  profile: false,
  fullAssets: undefined
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

    case GET_BALANCE:
      return {
        ...state,
        assetsFiat: action.payload.filteredAssetsFiat,
        assetsCrypto: action.payload.filteredAssetsCrypto,
      }

    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      }

    case PROFILE_COMPLETE:
      return {
        ...state,
        profile: action.payload
      }

    case GET_FULL_BALANCE:
      return {
        ...state,
        fullAssets: action.payload
      }

    default:
      return state;
  }
}