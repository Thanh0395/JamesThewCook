import axios from "axios";

export const getUserByIdAPI = async (uId) => {
  const data = await axios.get(`http://localhost:5013/api/User/${uId}`);
  return data.data.data;
}

export const GetListUser = async () => {
    const data = await axios.get("http://localhost:5013/api/User")
    return data.data.data
}

export const PutUser = async (dataPut) => {
  const data = await axios.put("http://localhost:5013/api/User", dataPut)
  return data.data.data;
}

export const sendFeedback = async (dataPost) => {
  const data = await axios.post("http://localhost:5013/api/Email/sendfeedback", dataPost)
  return data.data;
}
