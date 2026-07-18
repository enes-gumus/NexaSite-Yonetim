import axios from "axios";


const api = axios.create({

    baseURL: "http://127.0.0.1:8000"

});



api.interceptors.request.use(

    (config) => {


        const token = localStorage.getItem("token");



        if (token) {


            config.headers.Authorization =
            `Bearer ${token}`;


            console.log(
                "TOKEN GÖNDERİLİYOR:",
                token
            );


        } else {


            console.log(
                "TOKEN YOK"
            );


        }



        return config;


    },


    (error) => {

        return Promise.reject(error);

    }

);



api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {


        console.error(
            "API HATASI:",
            error.response?.status,
            error.response?.data
        );


        return Promise.reject(error);

    }

);



export default api;
