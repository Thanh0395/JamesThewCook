const { default: axios } = require("axios")

export const GetListRecipeFeedback = async () =>{
    const data = await axios.get("http://localhost:5013/api/RecipeFeedbackFeedback")
    return data.data.data;
}

export const GetRecipeFeedbackByRfbId = async (rfbId) =>{
    const data = await axios.get(`http://localhost:5013/api/RecipeFeedbackFeedback/${rfbId}`)
    return data.data.data;
}

export const PostRecipeFeedback = async (uId, rId, content) => {
    const response = await axios.post("http://localhost:5013/api/RecipeFeedbackFeedback", {uId, rId, content});
    return response.data.data
}

export const PutRecipeFeedback = async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/RecipeFeedbackFeedback", dataPut)
    return data.data.data
}

export const DeleteRecipeFeedbackbyRecipeId = async (rId) => {
    const data = await axios.delete(`http://localhost:5013/api/RecipeFeedbackFeedback/${rId}`)
    return data.data;
}

export const GetListRecipeIdByRIdCount = async () => {
    const data = await axios.get("http://localhost:5013/api/RecipeFeedbackFeedback/GetListByRecipeIdByRIdCount")
    return data.data.data
}

export const GetRecipeFeedbackByRecipeId = async (rId) => {
    const data = await axios.get(`http://localhost:5013/api/RecipeFeedbackFeedback/GetRecipeFeedbackByRecipeId/${rId}`)
    return data.data.data;
}
