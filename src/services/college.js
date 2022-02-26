// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        const errorMessage = this.getValidationMessage(course);
        if (errorMessage) return errorMessage; 
        
        course.hours = +course.hours;
        course.cost = +course.cost;
        this.#courses.add(course);
        return course;
    }

    getValidationMessage(course) {
        let {cost , hours, lecturer, name, openingDate} = course;
        const validation = [];
        const openingYear = new Date(openingDate).getFullYear();
        if (!this.#courseData.courses.includes(course.name)) validation.push(`name should be in ${this.#courseData.courses.join(', ')}`);
        if (!this.#courseData.lectors.includes(course.lecturer)) validation.push(`lecturer should be in ${this.#courseData.lectors.join(', ')}`);
        if (!hours || hours < this.#courseData.minHours || hours > this.#courseData.maxHours) validation.push(`hours should be in range [${[this.#courseData.minHours, this.#courseData.maxHours].join(' - ')}]`);
        if (!cost || cost < this.#courseData.minCost || cost > this.#courseData.maxCost) validation.push(`cost should be in range [${[this.#courseData.minCost, this.#courseData.maxCost].join(' - ')}]`);
        if (openingYear < this.#courseData.minYear || openingYear > this.#courseData.maxYear) validation.push(`year should be in range [${[this.#courseData.minYear, this.#courseData.maxYear].join(' - ')}]`);
        if (validation.length == 0) return '';
        return validation.join(', \n');
    }
}