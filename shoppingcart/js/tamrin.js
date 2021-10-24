//variables
const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody")
clearCartBtn = document.querySelector("#clear-cart")

//eventListeners
eventListeners();

function eventListeners() {
    courses.addEventListener("click", buyCourse)

    //remove course from the cart
    shoppingCartContent.addEventListener("click" , removeCourse)

    //remove all courses from the cart
    clearCartBtn.addEventListener("click", clearCart)
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
function addToCart(cInfo){

//create <tr< tag
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
}

//remove course from the DOM
function removeCourse(e){
    if(e.target.classList.contains("remove")){
        console.log(e.target.parentElement.parentElement.remove());
    }
}

//remove all courses from DOM
function clearCart(e){
    // shoppingCartContent.innerHTML = ""

    while (shoppingCartContent.firstChild){
        shoppingCartContent.firstChild.remove()
    }
}