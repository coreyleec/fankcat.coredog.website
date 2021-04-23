
// NAV ALERT ON LOAD
window.alert("use CMD + F or CTRL + F to navigate")

// ZOOM ON LOAD
document.body.style.zoom = "75%"
let body = document.querySelector("body")

 //  CLICK APPEND FORM & X/Y COORDINATES
          
          
          //   body.addEventListener('click', function (x) {
          //   body.append(newPostForm)
          //   newPostForm.append(postTitleInput, imageInput, postText, createPost)
          // });

          // let mouse = {
          //   position : {x:0, y:0},
          //   down : false,
          //   downedPos :{x:0, y:0},
          //   upedPos :{x:0, y:0},
          //   }
          //   mouse.getPosition = function(element, event) {
          //   let rect = element.getBoundingClientRect(), 
          //   root = document.documentElement;
            
          //   this.position.x = event.clientX - rect.left - root.scrollLeft
          //   this.position.y = event.clientY - rect.top - root.scrollTop
          //   return this.position
          //   // console.log(this.position)
          //   }


          // $('#element').append('<div id="close">Close</div>');
          
          // $(document).on('click', '#close', function() {
                
          // });

          // body.addEventListener('mousedown', function(e){
          //   mouse.down = true;
          //   mouse.downedPos = mouse.getPosition(this, e);
          //   console.log(mouse.downedPos)
          //   console.log(e)
          // });

          // body.addEventListener('mousemove', function(e){
          //     ms = mouse.getPosition(this, e);
          //     if(mouse.down){
          //         mouse.upedPos = ms;
          //     }
          // });




let postForm = document.querySelector("#new-post");
// let posts = {};

fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((postsArr) => {
    postsArr.forEach(function (postObj) {
        // posts = postsArr
      postToDom(postObj);
    });
  });


// HELPER FUNCTION
function postToDom(postObj) {
  let postContainer = document.createElement("div");
      postContainer.className = "draggable";
      body.append(postContainer);
      postContainer.dataset.id = postObj.id

// POST TITLE
  let postTitle = document.createElement("h2");
      postTitle.innerText = postObj.name;
      postContainer.append(postTitle);
// POST IMAGE
  let postImg = document.createElement("img");
      postImg.src = postObj.image;
      postContainer.append(postImg);
      postImg.className = "postImg";
// POST TEXT
  let post = document.createElement("h3");
      post.innerText = postObj.post;
      postContainer.append(post);

// COMMENT LIST
  let commentList = document.createElement("ul");
      commentList.className = "postUl"
      postContainer.append(commentList)
//  COMMENT FORM
  let commentForm = document.createElement("form")
      commentForm.id = "commentForm"
      commentForm.type = "text"
      postContainer.append(commentForm)
      
 let commentInput = document.createElement("input")
      commentInput.name = "commentInput"
      commentInput.type = "text"
      commentInput.autocomplete = "off"
      commentInput.placeholder = "Leave a comment"
      commentForm.append(commentInput)
   
 let createPost = document.createElement("button")
      createPost.id = "createPost"
      createPost.type = "submit"
      createPost.innerText = "Submit"
      commentForm.append(createPost)

// LIKE BUTTON
  let likeButton = document.createElement('button')
      likeButton.innerText = "👍"
      likeButton.className = 'likeButton'
// LIKE NUMBER
  let likeNumber = document.createElement('span')
      likeNumber.innerText = postObj.likes
      likeNumber.className = "ammountLikes"
      likeButton.append(likeNumber)
// DISLIKE BUTTON
  let dislikeButton = document.createElement('button')
      dislikeButton.innerText = "👎"
      dislikeButton.className = "dislikeButton"
// DISLIKE NUMBER
  let dislikeNumber = document.createElement('span')
      dislikeNumber.innerText = postObj.dislikes
      dislikeNumber.className = "ammountOfDislike"
      dislikeButton.append(dislikeNumber)

  postContainer.append(likeButton, dislikeButton)
//DELETE POST BUTTON
  let deletePostButton = document.createElement(`button`)
      deletePostButton.innerText = "Delete Post"
      deletePostButton.className = "delete"
 
  postContainer.append(deletePostButton)


// TURNS ARRAY OF COMMENTS INTO OBJECTS & APPENDS TO PAGE
postObj.comments.forEach((comments) => {
      
  let commentLi = document.createElement("li")
      commentLi.innerText = comments
      commentList.append(commentLi)
    })

// COMMENT FORM EVENT LISTENER   
commentForm.addEventListener("submit", (event) => {
      event.preventDefault()
      
  let newComment = commentInput.value
      fetch(`http://localhost:3000/posts/${postObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comments: [ ...postObj.comments, newComment ]
      }),
      })
      .then((res) => res.json())
      .then((updatedPost) => {
        commentList.innerText = " "  

      updatedPost.comments.forEach((newComments) => { 
                   
      let commentLi = document.createElement("li");
          commentLi.innerText = newComments
          commentList.append(commentLi)
        //   posts.comments = updatedPost.comments
          postObj.comments = updatedPost.comments
          event.target.reset()
      })  
    })
  })

// LIKE BUTTON EVENT LISTENER 
  likeButton.addEventListener(`click`, (e) =>{
        fetch(`http://localhost:3000/posts/${postObj.id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          likes: postObj.likes + 1
          })
        })
        .then(res => res.json())
        .then((upDatedLikes) => {
          
            likeNumber.innerText = `${upDatedLikes.likes}`
        })
        })

  // DISLIKE BUTTON EVENT LISTENER
  dislikeButton.addEventListener(`click`, (b) => {
  fetch(`http://localhost:3000/posts/${postObj.id}`, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
          dislikes: postObj.dislikes - 1
      })    
    })
  .then(res => res.json())
  .then((upDatedDislikes) => {

      dislikeNumber.innerText = `${upDatedDislikes.dislikes}`
  })
  })

  // DELETE POST BUTTON
  deletePostButton.addEventListener("click", function(event){
        // DELETE THE LIST IN THE BACKEND
        console.log(deletePostButton)
       fetch(`http://localhost:3000/posts/${postObj.id}`, {
           method: "DELETE"
       })
        .then(res => res.json())
        .then(emptyObj => {
            postContainer.remove()
        })
      })
}

// POST FORM
  postForm.addEventListener("submit", function (event) {
      event.preventDefault();
        
      let whatUserTitles = event.target.titlePost.value;
      let imgLink = event.target.postImage.value;
      let postText = event.target.postText.value;
      
      fetch("http://localhost:3000/posts/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: whatUserTitles,
          post: postText,
          image: imgLink,
          likes: 0,
          dislikes: 0,
          comments: []
        }),
      })
        .then((res) => res.json())
        .then((newlyCreatedPost) => {

          console.log(newlyCreatedPost)
          postToDom(newlyCreatedPost);
          event.target.reset();
        })
    })





// POST FORM IN JS
      
let newPostForm = document.createElement("form")
    newPostForm.id = "new-post"  
    newPostForm.type = "text"
      
let postTitleInput = document.createElement("input")
    postTitleInput.name = "titlePost"
    postTitleInput.class = "input-text"
    postTitleInput.type = "text"
    postTitleInput.autocomplete = "off"
    postTitleInput.placeholder = "Enter Post Title"
    
let imageInput = document.createElement("input")
    imageInput.name = "postImage"
    imageInput.type = "text"
    imageInput.autocomplete = "off"
    imageInput.placeholder = "Enter an Image URL"
    
let postText = document.createElement("input")
    postText.name = "postText"
    postText.type = "text"
    postText.autocomplete = "off"
    postText.placeholder = "Leave a comment"

let createPost = document.createElement("button")
    createPost.id = "new-post-submit"
    createPost.type = "submit"
    createPost.innerText = "Submit Post"
    
// Form Modal
let modalForm = document.createElement("div")
    modalForm.id = "myModal"
    modalForm.append(newPostForm)
    newPostForm.append(postTitleInput, imageInput, postText, createPost)

// When the user clicks on the button, open the modalForm
body.onclick = function() {
  modalForm.style.display = "block";
}

// When the user clicks anywhere outside of the modalForm, close it
window.onclick = function(event) {
  if (event.target == modalForm) {
    modalForm.style.display = "none";
  }
}





   



