import axios from "axios"

export const GetListCategory= async () => {
    const data = await axios.get("http://localhost:5013/api/Category")
    return data.data.data
}

export const GetCategory= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Category/${id}`)
    return data.data.data
}

export const PostCategory= async (dataPost) => {
    const data = await axios.post("http://localhost:5013/api/Category",dataPost)
    return data.data.data
}

export const PutCategory= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Category",dataPut)
    return data.data.data
}