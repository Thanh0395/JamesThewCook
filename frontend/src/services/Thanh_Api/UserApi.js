import axios from "axios";

export const getUserByIdAPI = async (uId) => {
  const data = await axios.get(`http://localhost:5013/api/User/${uId}`);
  return data.data.data;
}

export const GetListUser = async () => {
    const data = await axios.get("http://localhost:5013/api/User")
    return data.data.data
}

