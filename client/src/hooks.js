import store from './store';

export const useLoginStatus = () => {
    const { auth } = store.getState();
    const user = auth.user;
    if (user == null || user == undefined) { return false; }
    else { return !(Object.entries(user).length === 0 && user.constructor === Object); }
}

export const useGetUser = () => {
    const { auth } = store.getState();
    return auth.user;
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