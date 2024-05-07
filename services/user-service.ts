export function getRandomNumber(maxLength: number) {
  const characters = '0123456789';
  let result = '';

  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

// function getFirstLetterName(name: string) {
//   if (name !== '') {
//     const firstLetter = name.split(' ').map((i: string) => i.charAt(0).toLowerCase());
//     return firstLetter[0];
//   } else {
//     return null;
//   }
// }
