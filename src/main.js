import courseData from './config/courseData.json'
import College from './services/college';
//import Courses from './services/courses';
import { dataProvider } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import Spinner from './ui/spinner';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash';
import NavigatorButtons from './ui/navigator_buttons';

const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]

//const dataProvider = new Courses(courseData.minId, courseData.maxId);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" },
    { key: 'openingDate', displayName: "Opening date"}
    ], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2", "3", "4"]);
const spinner = new Spinner("spinner", "alert");

formHandler.addHandler(async course => {
    const res = await spinner.awaitWithSpinner(dataProcessor.addCourse(course));
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;
})

generationHandler.addHandler(async generation => {
    await spinner.awaitWithSpinner(
        (async () => {
            for (let i=0; i < generation.nCourses; i++) {
                await dataProcessor.addCourse(getRandomCourse(courseData));
            }
        })()
    );
    return '';
});

formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
const tableHoursStatistics = new TableHandler(statisticsColumnDefinition, "courses-table");
const tableCostStatistics = new TableHandler(statisticsColumnDefinition, "courses-table");

function hide() {
    tableHandler.hideTable();
    formHandler.hide();
    generationHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();
}

window.showGeneration = () => {
    hide();
    navigator.setActive(4);
    generationHandler.show();
}

window.showForm = () => {
    hide();
    navigator.setActive(0);
    formHandler.show();
}

window.showCourses = async () => {
    hide();
    navigator.setActive(1);
    tableHandler.showTable(await spinner.awaitWithSpinner(dataProcessor.getAllCourses()));
}
window.showHoursStatistics = async () => {
    hide();
    navigator.setActive(2);
    tableHoursStatistics.showTable(await spinner.awaitWithSpinner(dataProcessor.getHoursStatistics(courseData.hoursInterval)));
}
window.showCostStatistics = async () => {
    hide();
    navigator.setActive(3);
    tableCostStatistics.showTable(await spinner.awaitWithSpinner(dataProcessor.getCostStatistics(courseData.costInterval)));
}
window.sortCourses = async (key) => {
    tableHandler.showTable(await spinner.awaitWithSpinner(dataProcessor.sortCourses(key)));
}

window.removeCourse = async (id) => {
    if (window.confirm(`you are going to remove course id: ${id}`)) {
        await spinner.awaitWithSpinner(
            (async () => {
                await dataProcessor.removeCourse(+id)
                tableHandler.showTable(await dataProcessor.getAllCourses())
            }
            )()
        );
    }
}
