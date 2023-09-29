const getItem = (key: string) => localStorage.getItem(key);

const setItem = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Failed to save in local storage - ${key} - ${value}`);
    }
};

export default {
    getItem,
    setItem,
};
