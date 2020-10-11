export const pushSessionStorage = (key, value) => {
    if (value !== undefined) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

export const extractSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

export const sessionClearByKey = (key) => {
    sessionStorage.removeItem(key)
} 

export const signOutSessionClean = () => {
    sessionStorage.clear();
}