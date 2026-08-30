import axios from 'axios';


const axisoInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
});


const useAxios = () =>{
    return axisoInstance;
};

export default useAxios;