import axios from "axios"

export const GetListPost= async () => {
    const data = await axios.get("http://localhost:5013/api/Post/")
    return data.data.data
}

export const GetPost= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Post/${id}`)
    return data.data.data
}

export const CreatePost= async (dataPost) => {
    try {
        const response = await axios.post('http://localhost:5013/api/Post', dataPost);
        console.log('API call successful:', response.data.data);
        // Perform any additional actions after the API call succeeds
      } catch (error) {
        console.error('API call failed:', error);
        // Perform any additional actions after the API call fails
      }
}

export const PutPost= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Post",dataPut)
    return data.data.data
}

export const DeletePost= async (pId) => {
    const data = await axios.delete(`http://localhost:5013/api/Post/${pId}`)
    return data.data;
}