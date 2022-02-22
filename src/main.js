import courseData from './config/courseData.json';
import { getRandomCourse } from './utils/randomCourse';

(() => {
    const N_COURSES = 100;
    const element = document.getElementById("courses");
    element.innerHTML = `${getCourse(createCourses(N_COURSES))}`
})();

function createCourses(numberOfCourses) {
    const courses = [];
    for (let i = 0; i < numberOfCourses; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}

function getCourse(arr) {
    return arr.map(el => `<li>${JSON.stringify(el).replaceAll('"', '')}</li>`).join('');
}
