import decode from 'jwt-decode';
import axios from 'axios'

export function getAuthToken() {
    return localStorage.getItem('token');
}
export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}
export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(localStorage.getItem('token'))
}
function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
}
export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}