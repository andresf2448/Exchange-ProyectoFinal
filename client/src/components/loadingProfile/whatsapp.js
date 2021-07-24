import axios from 'axios'

export default function sendCode(code, number) {
  try {
    axios(`http://localhost:3001/whatsapp?code=${code}&number=${number}`);
  } catch (err) {
    console.log(err)
  }
}