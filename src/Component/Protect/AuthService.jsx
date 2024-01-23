import axios from "axios";
import { config } from "../Config/Config";


export const login = async (values) => {
try {
  const response = await axios.post
  (`${config.userApi}/login`,values)
  console.log(response);

  if(!response || !response.data){
    throw new Error("Invalid response recieved");
  }

  if(response.data.isActivated === false){
    throw new Error(response.data.message);
  }
  localStorage.setItem("token",response.data.token);

} catch (error) {
  throw new Error(error.response?.data?.message || "Please activate your account" );
}  
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};