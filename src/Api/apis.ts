import axiosInstance from "./axios"
import toast from 'react-hot-toast';

export const signup = async (name: string, email: string, password: string, phone: number) => {
    try {
        const formData = await axiosInstance.post('/signUp', { name, email, password, phone })
        console.log(formData )
        const token = formData.data
        localStorage.setItem('user', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}
export const login = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/login', { email, password })
        localStorage.setItem('user', response.data.userData._id)
        console.log(response.data.userData.name + "<-response")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}
export const logout = async () => {
    try {
        const response = localStorage.removeItem('user')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getProfile = async (id :string) => {
    try {
        let response = await axiosInstance.get(`/getProfile/${id}`)
        console.log(response.data.data)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const editProfile = async (data: any) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        console.log(data)
        const response = await axiosInstance.patch('/editProfile', data, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const createCamp = async (data: any) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        console.log(data)
        const response = await axiosInstance.post('/createCamp', data, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getCamps = async () => {
    try {
        let response = await axiosInstance.get('/getCamps')
        return response.data.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getCampsOne = async (id:string) => {
    try {
        let response = await axiosInstance.get(`/getCampsOne/${id}`)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getParticipants = async (id:string) => {
    try {
        let response = await axiosInstance.get(`/getParticipants/${id}`)
        console.log("TURBO JOSE__"+response.data.data.participants[0])
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const enrollToCamp = async (campId:string,userId:string) => {
    try {
        let response = await axiosInstance.post(`/enrollToCamp/${campId}`,{userId})
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const isEnrolled = async (campId:string,userId:string) => {
    try {
        let response = await axiosInstance.get(`/isEnrolled/${campId}?userId=${userId}`)
        
        return response?.data.success
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getMyCamps = async (id:string) => {
    try {
        let response = await axiosInstance.get(`/getMyCamps/${id}`)
        return response.data.camps
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}