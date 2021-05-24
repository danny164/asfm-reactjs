export const firstUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertAddress = (value) => {
    const allLowerCase = value.toLowerCase();
    const removeSpace = allLowerCase.replace(/[ ]{2,}/g, ' ').trim();

    const removeSpecialChars = removeSpace.replace(
        /\.|\,|\+|\-|\*|\-|\=|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\{|\}|\||\\|\:|\"|\;|\'|\<|\>|\?|\[|\]/g,
        ''
    );

    const splitString = removeSpecialChars.split(' ');

    const result = [];

    splitString.forEach((string) => {
        return result.push(firstUppercase(string));
    });

    return result.join(' ');
};
