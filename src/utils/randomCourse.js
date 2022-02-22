import { createCourse } from "../models/course";
import { getRandomDate, getRandomElement, getRandomNumber } from "./random";

export function getRandomCourse(courseData) {
    const randomID = getRandomNumber(courseData.minID, courseData.maxID);
    const randomName = getRandomElement(courseData.courses);
    const randomLecturer = getRandomElement(courseData.lectors);
    const randomHours = getRandomNumber(courseData.minHours, courseData.maxHours);
    const randomCost = getRandomNumber(courseData.minCost, courseData.maxCost);
    const randomDate = getRandomDate(courseData.minYear, courseData.maxYear);
    return createCourse(randomID, randomName, randomLecturer, randomHours, randomCost, randomDate);
}

