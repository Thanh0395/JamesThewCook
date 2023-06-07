import axios from "axios"

export const GetListCountry= async () => {
    const data = await axios.get("http://localhost:5013/api/Country")
    return data.data.data
}

export const GetCountry= async (id) => {
    const data = await axios.get(`http://localhost:5013/api/Country/${id}`)
    return data.data.data
}

export const PostCountry= async (countryName) => {
    const data = await axios.post("http://localhost:5013/api/Country",{countryName})
    return data.data.data
}

export const PutCountry= async (countryId,countryName) => {
    const data = await axios.put("http://localhost:5013/api/Country",{countryId,countryName})
    return data.data.data
}