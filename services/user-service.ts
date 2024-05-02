export function getRandomNumber(maxLength: number) {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}
