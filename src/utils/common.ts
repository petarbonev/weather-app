export const capitalize = (value: string) => {
    const firstLetter = value.charAt(0);

    return `${firstLetter.toUpperCase()}${value.substring(1)}`;
};
