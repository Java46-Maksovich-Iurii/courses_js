export function getRandomNumber (min, max) {
    min > max ? [min, max] = [max, min] : [min, max];
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomElement (array) {
   return array[Math.floor(Math.random()*array.length)];
}

export function getRandomDate(minYear, maxYear) {
    const randomMonth = getRandomNumber(0, 11);
    const randomDay = getRandomNumber(1, 31);
    const randomYear = getRandomNumber(minYear, maxYear);
    const date = new Date(randomYear, randomMonth, randomDay);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

