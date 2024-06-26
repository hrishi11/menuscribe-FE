import axios from "axios";

export const optimizeRoutes = async (data,headers) => await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', data, {headers})
