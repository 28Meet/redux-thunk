import axios from "axios";

export default UserApi =  axios.create({
    baseURL : "http://localhost:4005"
})