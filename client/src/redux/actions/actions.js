import axios from "axios";
import { supabase } from "../../supabase/supabase";  
import {
  CLIENT_SECRET_PAYMENT_INTENT,
  DELETE_CLIENT_SECRET_PAYMENT_INTENT,
  WAITING_CLIENT_SECRET_PAYMENT_INTENT,
  GET_ASSETS, SET_ASSET
} from "./actionsNames";

export function getClientSecret(payload) {
  return async function (dispatch) {
    try {
      let paymentIntent = await axios.post(
        "/create-payment-intent",
        payload
      );
      dispatch({
        type: CLIENT_SECRET_PAYMENT_INTENT,
        payload: paymentIntent.data.clientSecret,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteClientSecret() {
  return {
    type: DELETE_CLIENT_SECRET_PAYMENT_INTENT,
  };
}

export function waitingClientSecret() {
  return {
    type: WAITING_CLIENT_SECRET_PAYMENT_INTENT,
  };
}

export async function getAssets() {
  const { data:assets } = await supabase.from("assets").select("*");
  return {
    type: GET_ASSETS,
    payload: assets,
  };
}

export function setAset(payload) {
  return {
    type: SET_ASSET,
    payload
  }
}

export const GET_USER_DETAILS_ID = (id) => {
  return { type: "GET_USER_DETAILS_ID", payload: id };
};
