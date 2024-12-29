import store from './store';

export const useLoginStatus = () => {
    const { user } = store.getState();
    return user != null || !(Object.entries(obj).length === 0 && obj.constructor === Object)
}

export const useGetUserFromCookies = (cookies) => {
    let user_cookie = cookies.get('user')
    let user = null
    if (user_cookie) {
        const user_b64 = user_cookie.replace('\'', '').replace('\'', '')
        user = JSON.parse(window.atob(user_b64));
    }
    return user;
}