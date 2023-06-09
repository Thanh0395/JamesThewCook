import axios from "axios"

export const GetListCategory= async () => {
    const data = await axios.get("http://localhost:5013/api/Category")
    return data.data.data
}

export const GetCategory= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Category/${id}`)
    return data.data.data
}

export const PostCategory= async (categoryName) => {
    const data = await axios.post("http://localhost:5013/api/Category",{categoryName})
    return data.data.data
}

export const PutCategory= async (cId, categoryName) => {
    const data = await axios.put("http://localhost:5013/api/Category",{cId, categoryName})
    return data.data.data
}