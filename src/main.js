import courseData from './config/courseData.json';
import { getRandomCourse } from './utils/randomCourse';

const N_COURSES = 100;
const courses = createCourses();

function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}

function getCourse(arr) {
    return arr.map(el => `<li>${JSON.stringify(el).replaceAll('"', '')}</li>`).join('');
}

function rendering() {
    const element = document.getElementById("courses");
    element.innerHTML = `${getCourse(courses)}`
}

rendering();