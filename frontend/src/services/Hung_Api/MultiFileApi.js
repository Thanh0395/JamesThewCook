import axios from "axios"

export const GetListImages= async () => {
    const data = await axios.get("http://localhost:5013/api/MultiFile")
    return data.data.data
}

export const PostMultriFile= async (dataPost, rId) => {
    try {
        const response = await axios.post('http://localhost:5013/api/MultiFile',{ dataPost, rId});
        console.log('API call successful:', response.data.data);
        // Perform any additional actions after the API call succeeds
      } catch (error) {
        console.error('API call failed:', error);
        // Perform any additional actions after the API call fails
      }
}

export const GetImagesByRecipeId = async (rId) =>{
  const data = await axios.get(`http://localhost:5013/api/MultiFile/${rId}`)
  return data.data.data;
}

export const DeleteImagesByRecipeId = async (rId) => {
  const data = await axios.delete(`http://localhost:5013/api/MultiFile/${rId}`)
  return data.data
}


