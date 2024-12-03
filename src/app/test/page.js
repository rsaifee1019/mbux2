export const dynamic = 'force-dynamic'
import axios from 'axios'

export default async function Test(){
  const response = await axios.get(`https://mbhec.edu.bd/api/teachersAll?timestamp=${Date.now()}`)
  
  return <div>Teach-{JSON.stringify(response.data)}</div>
}