import axios from "axios"

export const GetListSc= async () => {
    const data = await axios.get("http://localhost:5013/api/Sc")
    return data.data.data
}

export const GetSc= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Sc/${id}`)
    return data.data.data
}

export const PostSc= async (dataPost) => {
    const data = await axios.post("http://localhost:5013/api/Sc",dataPost)
    return data.data.data
}

export const PutSc= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Sc",dataPut)
    return data.data.data
}