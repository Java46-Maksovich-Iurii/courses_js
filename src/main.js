import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const N_COURSES = 10;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
const courses = createCourses();

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: "Cost (ILS)"},
    {key: 'hours', displayName: "Course Duration (h)"}
], "courses-table", "sortCourses");


const tableStatistics = new TableHandler([
    {key: 'minInterval', displayName: 'Min Interval'},
    {key: 'maxInterval', displayName: 'Max Interval'},
    {key: 'amount', displayName: 'Amount'}
], "courses-table")


const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);

window.showForm = () => {
    formHandler.show();
    tableHandler.hideTable();
    tableStatistics.hideTable();
}
window.showCourses = () => {
    tableHandler.showTable(dataProcessor.getAllCourses());
    formHandler.hide();
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key));
}
window.showHoursTable = () => {
    tableStatistics.showTable(dataProcessor.getStatistics(courseData.intervalHours, "hours"));
    formHandler.hide();
}
window.showCostTable = () => {
    tableStatistics.showTable(dataProcessor.getStatistics(courseData.intervalCost, "cost"));
    formHandler.hide();
}
