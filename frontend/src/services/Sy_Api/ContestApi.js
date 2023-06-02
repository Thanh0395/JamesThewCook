import axios from "axios"

export const GetListContest= async () => {
    const data = await axios.get("http://localhost:5013/api/Contest")
    return data.data.data
}

export const GetContest= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Contest/${id}`)
    return data.data.data
}

export const PostContest= async (dataPost) => {
    const data = await axios.post("http://localhost:5013/api/Contest",dataPost)
    return data.data.data
}

export const PutContest= async (dataPut) => {
    const data = await axios.put("http://localhost:5013/api/Contest",dataPut)
    return data.data.data
}

export const DeleteContest= async (contestId) => {
    const data = await axios.delete(`http://localhost:5013/api/Contest/${contestId}`)
    return data.data;
}