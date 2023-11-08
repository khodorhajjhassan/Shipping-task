import axiosClient from "./axios-client";

export const login = (body) =>{
    return axiosClient.post('/login',body)
}

export const register = (body) =>{
    return axiosClient.post('/register',body)
}

export const logout= () =>{
    return axiosClient.post('/logout')
}

export const getUser= () =>{
    return axiosClient.get('/user')
}

export const viewShipments= () =>{
    return axiosClient.get('/viewShipments')
}

export const addShipment= (body) =>{
    return axiosClient.post('/addShipment',body)
}

export const editShipment= (id,body) =>{
    return axiosClient.put(`/editShipment/${id}`,body)
}

export const deletShipment= (id) =>{
    return axiosClient.delete(`/deleteShipment/${id}`)
}

export const trackShipment= (waybill) =>{
    return axiosClient.get(`/track/${waybill}`)
}


