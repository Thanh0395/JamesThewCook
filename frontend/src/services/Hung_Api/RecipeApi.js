import axios from "axios"

export const GetListRecipe= async () => {
    const data = await axios.get("http://localhost:5013/api/Recipe/")
    return data.data.data
}

export const GetRecipe= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Recipe/${id}`)
    return data.data.data
}

export const PostRecipe= async (dataPost) => {
    try {
        const response = await axios.post('http://localhost:5013/api/Recipe', dataPost);
        console.log('API call successful:', response.data.data);
        // Perform any additional actions after the API call succeeds
      } catch (error) {
        console.error('API call failed:', error);
        // Perform any additional actions after the API call fails
      }
}

export const PutRecipe= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Recipe",dataPut)
    return data.data.data
}

export const DeleteRecipe= async (rId) => {
    const data = await axios.delete(`http://localhost:5013/api/Recipe/${rId}`)
    return data.data;
}