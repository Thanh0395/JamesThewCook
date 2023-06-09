import axios from "axios"

export const GetListRecipe = async () => {
    const data = await axios.get("http://localhost:5013/api/Recipe/")
    return data.data.data
}

export const GetRecipe = async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Recipe/${id}`)
    return data.data.data
}

export const PostRecipe = async (dataPost) => {
    const response = await axios.post('http://localhost:5013/api/Recipe', dataPost);
    return response.data.data
}

export const PutRecipe = async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Recipe", dataPut)
    return data.data.data
}

export const DeleteRecipe = async (rId) => {
    const data = await axios.delete(`http://localhost:5013/api/Recipe/${rId}`)
    return data.data;
}

export const GetListRecentReCipe = async () => {
    const data = await axios.get("http://localhost:5013/api/Recipe/recent-recipe")
    return data.data.data
}

export const GetListCategoryByRecipeCount = async () => {
    const data = await axios.get("http://localhost:5013/api/Recipe/categories-by-recipe-count")
    return data.data.data
}

export const GetListPosts = async () => {
    const data = await axios.get("http://localhost:5013/api/Post")
    return data.data.data;
}

export const GetListUser = async () => {
    const data = await axios.get("http://localhost:5013/api/User")
    return data.data.data;
}

export const GetListFeebackPost = async  () =>  {
    const data = await axios.get("http://localhost:5013/api/Feedback")
    return data.data.data;
}

export const GetUserByUid = async (uId) => {
    const data = await axios.get(`http://localhost:5013/api/User/${uId}`)
    return data.data.data;
}

export const GetFeedbackByPostId = async (pId) => {
    const data = await axios.get(`http://localhost:5013/api/Feedback/GetFeedbackByPostId/${pId}`)
    return data.data.data;
}

export const PostFeedbackPost = async (uId, pId, content) => {
    const data  = await axios.post("http://localhost:5013/api/Feedback",{uId, pId, content})
    return data.data.data;
}

export const GetPostByUserId = async (uId) => {
    const data = await axios.get(`http://localhost:5013/api/Post/GetPostByUserId/${uId}`)
    return data.data.data;
}