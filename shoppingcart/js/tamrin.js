//variables
const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody")
clearCartBtn = document.querySelector("#clear-cart")

//eventListeners
eventListeners();

function eventListeners() {
    courses.addEventListener("click", buyCourse)

    //remove course from the cart
    shoppingCartContent.addEventListener("click", removeCourse)

    //remove all courses from the cart
    clearCartBtn.addEventListener("click", clearCart)

    //show courses from storage when loaded
    document.addEventListener("DOMContentLoaded", showCoursesOnLoad)
}


//function
//add the course to the cart
function buyCourse(e) {
    e.preventDefault();
    //use delegation to access to the course that selected
    if (e.target.classList.contains('add-to-cart')) {
        //access to the card div with parentElement
        const course = e.target.parentElement.parentElement
        //read values
        getCourseInfo(course)
    }
}

//getting the course info that selected by user
function getCourseInfo(course) {
    // console.log(course);
    //course info
    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector("span").textContent,
        id: course.querySelectorAll("a")[1].getAttribute("data-id")
    }
    // console.log(courseInfo);
    //adding the course to the cart
    addToCart(courseInfo)
}

//adding the course to the cart
function addToCart(cInfo) {

    //create <li. tag
    let row = document.createElement("tr")

    //build HTML template
    row.innerHTML = `
    <tr>
        <td>
            <img src= "${cInfo.image}" width = "100px">
        </td>
        <td>${cInfo.title}</td>
        <td>${cInfo.price}</td>
        <td>
            <a class = "remove" href ="#" data-id ="${cInfo.id}">X</a>
        </td>
    </tr>
`

    shoppingCartContent.appendChild(row)
    // console.log(row)
    // console.log(shoppingCartContent);

    saveToStorge(cInfo)
}

//add to localstorage
function saveToStorge(course) {
    //get array of courses to the array of courses
    let courses = getFromStorage()

    //add the new course to the array of courses
    courses.push(course)

    localStorage.setItem("courses", JSON.stringify(courses))

}

//get content from Localstorage
function getFromStorage() {
    let courses;
    if (localStorage.getItem("courses")) {
        courses = JSON.parse(localStorage.getItem("courses"))
    } else {
        courses = []
    }
    return courses
}

//remove course from the DOM
function removeCourse(e) {
    let course, courseId;

    if (e.target.classList.contains("remove")) {
        //delete one by one
        // console.log(e.target.parentElement.parentElement.remove());
        // console.log("yes");
        e.target.parentElement.parentElement.remove()
        course = e.target.parentElement.parentElement
        courseId = course.querySelector("a").getAttribute("data-id")
    }

    //remove course from LS
    removeCourseLS(courseId)
}

//remove course from local storage 
function removeCourseLS(id) {
    let coursesLS = getFromStorage()

    coursesLS.forEach(function (course, index) {
        if (course.id === id) {
            coursesLS.splice(index, 1)
        }
    });

    localStorage.setItem("courses" , JSON.stringify(coursesLS))
}

//remove all courses from DOM
function clearCart(e) {
    // shoppingCartContent.innerHTML = ""

    while (shoppingCartContent.firstChild) {
        shoppingCartContent.firstChild.remove()
    }

    clearCartLS()
}

//clear all courses from Local Storage
function clearCartLS() {
    localStorage.clear()
}

//show courses when document loaded and add courses into the cart
function showCoursesOnLoad() {
    let coursesLs = getFromStorage();

    //add courses into the cart
    coursesLs.forEach(function (cInfo) {
        //create <li. tag
        let row = document.createElement("tr")

        //build HTML template
        row.innerHTML = `
    <tr>
        <td>
            <img src= "${cInfo.image}" width = "100px">
        </td>
        <td>${cInfo.title}</td>
        <td>${cInfo.price}</td>
        <td>
            <a class = "remove" href ="#" data-id ="${cInfo.id}">X</a>
        </td>
    </tr>
`

        shoppingCartContent.appendChild(row)
        // console.log(row);
    });
}