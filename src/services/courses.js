// fake Data provisioning module

import { getRandomNumber } from "../utils/random";

// data are regular JS array
export default class Courses {
    #courses
    #minId
    #maxId
    constructor(courses, minId, maxId) {
        this.#courses = courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 100000;
    }
    add(course) {
        course.id = this.#getId();
        this.#courses.push(course);
        return course;
    }
    #getId() {
        let id;
        do {
            id = getRandomNumber(this.#minId, this.#maxId);
        } while (this.exists(id));
      return id; 
    }
    exists(id) {
      return !!(this.#courses.find(course => {course.id === id}));
    }
}