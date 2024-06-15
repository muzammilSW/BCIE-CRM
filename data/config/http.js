// // http.ts
// import axios from 'axios'
// import { signOut } from "next-auth/react";

// const http = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_PATH,
// })

// const setAuthorizationHeader = (token) => {
//     http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// // console.log(token);
// if (token) {
//     // console.log('***', token);
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// }

// const setToken = (token) => {
//     // console.log('###', token);
//     if (typeof window !== 'undefined') {
//         setAuthorizationHeader(token);
//     }
// }
// http.interceptors.request.use((config) => {
//     config.params = {
//         api_token: localStorage.getItem('token'),
//         ...config.params,
//     };


//     config.headers = {
//         ...config.headers,
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//         "Cache-Control": "no-store",
//     };

//     return config;
// },
//     error => Promise.reject(error),
// );

// http.interceptors.response.use(
//     function (response) {
//         // Check if the response contains a specific message
//         if (response.status === 401 || response.statusText === 'Unauthorized') {
//             console.log("Sign out now");
//             signOut();
//         }

//         // Return the response for further processing
//         return response;
//     },
//     function (error) {
//         // Handle errors here if needed
//         return Promise.reject(error);
//     }
// );


// http.interceptors.response.use((response) =>
//     response,
//     async (error) => {
//         return Promise.reject(error.response?.data);
//     },
// );




// export { http, setToken }
import axios from 'axios';
import { signOut, useSession } from "next-auth/react";
// const session=useSession() 

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_PATH,
});

const setAuthorizationHeader = (token) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const setToken = (token) => {
    // console.log(token);
        // if (typeof window !== 'undefined') {
            setAuthorizationHeader(token);
        // }
    }

// Set Authorization header initially if token is available
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (token) {
    setAuthorizationHeader(token);
}

// Request interceptor
http.interceptors.request.use((config) => {
    // Append api_token to params if available
    config.params = {
        api_token: localStorage.getItem('token'),
        ...config.params,
    };

    // Set Authorization header if token is available
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Cache-Control header to prevent caching
    config.headers['Cache-Control'] = 'no-store';

    return config;
}, error => Promise.reject(error));

// Response interceptor for handling unauthorized errors
http.interceptors.response.use(
    'hello',
    function (response) {
        // console.log(response);
        // Check if the response contains a specific message
        if (response?.response?.status === 401 || response?.response?.statusText === 'Unauthorized') {
            // console.log(response);
            console.log("Sign out now");
            signOut();
        }
        return response;
    },
    function (error) {
        // Handle errors here if needed
        return Promise.reject(error);
    }
);

export { http,setToken };
