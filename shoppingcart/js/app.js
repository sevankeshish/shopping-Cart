//variables
let course = document.querySelector("#courses-list")
let shoppingCartContent = document.querySelector("#cart-content tbody")
let clearCartBtn = document.querySelector("#clear-cart")
//eventlisteners
eventListeners()

function eventListeners() {
    course.addEventListener('click', buyCourse)
    shoppingCartContent.addEventListener('click', removeCourse)
    clearCartBtn.addEventListener('click', clearCart)
}


//functions
function buyCourse(e) {
    e.preventDefault()
    if (e.target.classList.contains('add-to-cart')) {
        // console.log(e.target.parentElement.parentElement);
        const course = e.target.parentElement.parentElement

        getCourseInfo(course)
    }
}

function getCourseInfo(course) {
    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector("span").textContent,
        id: course.querySelectorAll("a")[1].getAttribute("data-id")
    }
    // console.log(courseInfo);
    addToCart(courseInfo)
}

function addToCart(courseInfo) {
    let row = document.createElement("tr")
    row.innerHTML = `
     <tr>
        <td>
            <img src = "${courseInfo.image}" width = "100px">
        </td>
        <td>${courseInfo.title}</td>
        <td>${courseInfo.price}</td>
        <td>
            <a class = "remove" href = "#" data-id ="${courseInfo.id}">X</a>
        </td>
        </tr>
    
    `

    shoppingCartContent.appendChild(row)

    console.log(shoppingCartContent);
    console.log(row);

    saveToStorage(course)
}

function removeCourse(e) {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
    }
}

function clearCart() {
    // shoppingCartContent.innerHTML = " "

    while (shoppingCartContent.firstChild) {
        shoppingCartContent.firstChild.remove()
    }
}

function saveToStorage(course) {
    // get array of courses from storage
    let courses = getFromStorage()

    // add the new course to the array of courses
    courses.push(course)

    localStorage.setItem('courses', JSON.stringify(courses))

}

function getFromStorage(){
    let courses;

    // if courses exist before
    if (localStorage.getItem('courses')) {
        courses = JSON.parse(localStorage.getItem('courses'))
    } else {
        courses = []
    }

    return courses
}