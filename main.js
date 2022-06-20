const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
var titleValue = document.getElementById('title-value');
var bodyValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('.btn');
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light">
         <div class="card-body" data-id=${post.id}>
          <h5 class="card-title">${post.firstName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.lastName}</h6>
          <p class="card-text">${post.email}</p>
          <a href="#" class="card-link text-decoration-none" id="edit-post">Edit</a>
          <a href="#" class="card-link text-decoration-none" id="delete-post">Delete</a>
         </div>
       </div>`;
    });
    postsList.innerHTML = output;
}

const url = 'https://reqres.in/api/users';
//const url = 'http://localhost:4000/users';

//Get - read the posts
// Method: GET
fetch(url)
 .then(res => res.json())
 .then(data =>  renderPosts(data))

 postsList.addEventListener('click', (e) => {
     e.preventDefault();
     let delBtnIsPressed = e.target.id == 'delete-post';
     let editBtnIsPressed = e.target.id == 'edit-post';

     let id = e.target.parentElement.dataset.id; 
     // delete - Remove the existing post
     // method - DELETE
     if(delBtnIsPressed){
         fetch(`${url}/${id}`, {
             method: 'DELETE',
         })
         .then(res => res.json())
         .then(() => location.reload())
     }
     if(editBtnIsPressed){
         const parent = e.target.parentElement;
         let firstNameContent = parent.querySelector('.card-title').textContent;
         let emailContent = parent.querySelector('.card-text').textContent;

         titleValue.value= firstNameContent;
         bodyValue.value= emailContent;
     }
     // update - update the existing post
     // method : PATCH
     btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
       fetch(`${url}/${id}` , {
           method: 'PATCH',
           headers:{
            'Content-Type': 'application/json' 
           },
           body: JSON.stringify({
            firstName: titleValue.value,
            email : bodyValue.value
           })
       })
       .then(res => res.json())
       .then(() => location.reload())
     })
 })

// Create - Insert new post
// Method : POST
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method:'POST',
        body: JSON.stringify({
         firstName: titleValue.value,
         email : bodyValue.value
        }),
        headers:{
           'Content-Type': 'application/json' 
        }
    })
    .then(res => res.json())
    .then(data => {
        const dataArr =[];
        dataArr.push(data);
        renderPosts(dataArr);
    })
    // reset input field to empty
    titleValue.value = '';
    bodyValue.value = '';
})