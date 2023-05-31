import axios from "axios"

export const GetListCountry= async () => {
    const data = await axios.get("http://localhost:5013/api/Country")
    return data.data.data
}

export const GetCountry= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Country/${id}`)
    return data.data.data
}

export const PostCountry= async (dataPost) => {
    const data = await axios.post("http://localhost:5013/api/Country",dataPost)
    return data.data.data
}

export const PutCountry= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Country",dataPut)
    return data.data.data
}