import axios from 'axios';


export const AddRating = async (uId, scId, score) => {
    const data = await axios.post('http://localhost:5013/api/Rating', {
    uId,
    scId,
    score,
  });
  return data.data.data;
}
export const GetAvg= async () => {
    const data = await axios.get("http://localhost:5013/api/Sc/GetAvgScore");
    return data.data.data
}

export const GetWinner = async (contestId) => {
  const data = await axios.get(`http://localhost:5013/api/Sc/${contestId}/GetWinner`);
  return data.data.data
}
