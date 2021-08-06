import axios from 'axios'

export default function sendCode(code, number) {
  try {
    axios(`/whatsapp?code=${code}&number=${number}`);
  } catch (err) {
    console.log(err)
  }
}