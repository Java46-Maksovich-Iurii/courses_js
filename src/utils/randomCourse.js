import { createCourse } from "../models/course";
import { getRandomDate, getRandomElement, getRandomNumber } from "./random";

export function getRandomCourse(courseData) {
    const randomID = getRandomNumber(courseData.minID, courseData.maxID);
    const randomName = getRandomElement(courseData.courses);
    const randomLecturer = getRandomElement(courseData.lectors);
    const randomHours = Math.round(getRandomNumber(courseData.minHours, courseData.maxHours) / 10) * 10;
    const randomCost = Math.round(getRandomNumber(courseData.minCost, courseData.maxCost) / 100) * 100;
    const randomDate = getRandomDate(courseData.minYear, courseData.maxYear);
    return createCourse(randomID, randomName, randomLecturer, randomHours, randomCost, randomDate);
}

