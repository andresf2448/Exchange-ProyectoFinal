import {
  CLIENT_SECRET_PAYMENT_INTENT,
  DELETE_CLIENT_SECRET_PAYMENT_INTENT,
  WAITING_CLIENT_SECRET_PAYMENT_INTENT,
  GET_ASSETS, SET_ASSET, GET_BALANCE,
  GET_ACCOUNT, PROFILE_COMPLETE,
  GET_FULL_BALANCE
} from "./actionsNames";
import axios from "axios";
import { supabase } from "../../supabase/supabase";  
import StellarSdk from "stellar-sdk";  

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
const session = supabase.auth.session();

export function profileComplete(){
  return async function(dispatch) {
    let { data } = await supabase
      .from("UserAnchor")
      .select("firstName")
      .eq("id_user", session.user.id);
    
    if (data.length !== 0) {
      dispatch({
        type: PROFILE_COMPLETE,
        payload: true
      })
    } else {
      dispatch({
        type: PROFILE_COMPLETE,
        payload: false
      })
    }
  }
}


export function getAccount(){
  return async function(dispatch) {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) {
      return dispatch({
        type: GET_ACCOUNT,
        payload: undefined
      })
    }
    
    let secret = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    const payload = {publicKey: data[0].public_key, secretKey: secret.data[0].secret_key}
    return dispatch({
      type: GET_ACCOUNT,
      payload
    })
  
}
}

export function getFullBalance(){
  return async function(dispatch) {
    let { data } = await supabase
    .from("datauser")
    .select("public_key")
    .eq("id_user", session.user.id);
  if (data.length > 0){
  await server
    .loadAccount(data[0]?.public_key)
    .then((response) => {
      dispatch({
        type: GET_FULL_BALANCE,
        payload: response.balances
      })
    })
    .catch((err) => console.log(err));
  } else {
    dispatch({
      type: GET_FULL_BALANCE,
      payload: undefined
    })
  }
  }
}

export function getBalance() {
  return async function(dispatch) {
    let { data } = await supabase
        .from("datauser")
        .select("public_key")
        .eq("id_user", session.user.id);
        
      if (data.length !== 0) {

        await server
          .loadAccount(data[0].public_key)
          .then((response) => { 
            let filteredAssetsFiat = response.balances.filter(element => element.asset_code === 'ARSR' || element.asset_code === 'USDR' || element.asset_code === 'EURR')
            let filteredAssetsCrypto = response.balances.filter(element => element.asset_type === 'native' || element.asset_code === 'HenryCoin' )
            let payload = { filteredAssetsFiat, filteredAssetsCrypto }
            dispatch({
              type: GET_BALANCE,
              payload
            })
          })
          .catch((err) => console.log(err));
      } else {
        let payload = {filteredAssetsFiat: undefined, filteredAssetsCrypto: undefined}
        dispatch({
          type: GET_BALANCE,
          payload
        })
      }

  }
}

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
