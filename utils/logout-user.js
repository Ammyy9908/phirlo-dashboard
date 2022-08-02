import Cookies from "js-cookies";

export default function logoutUser(){
    Cookies.removeItem('token');
    window.location.href = '/';
}