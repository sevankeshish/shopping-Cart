//variables
const courses = document.querySelector("#courses-list");

//eventListeners
eventListeners();
function eventListeners (){
    courses.addEventListener("click" , buyCourse)
}


//function
//add the course to the cart
function buyCourse(e){
    e.preventDefault();
    //use delegation to access to the course that selected
    if(e.target.classList.contains('add-to-cart')){
        //access to the card div with parentElement
        const course = e.target.parentElement.parentElement
        //read values
        getCourseInfo(course)
    }
}

//getting the course info that selected by user
function getCourseInfo(course){
    console.log(course);
}