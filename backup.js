// let likeButton = document.createElement("button")
// let disLike = document.createElement("button")

let postForm = document.querySelector("#new-post");
let body = document.querySelector("body");
let posts = {};

fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((postsArr) => {
    postsArr.forEach(function (postObj) {
        posts = postsArr
      postToDom(postObj);
    });
  });


// HELPER FUNCTION
function postToDom(postObj) {
  let postContainer = document.createElement("div");
      postContainer.className = "postCont";
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
   
 let commentSubmit = document.createElement("button")
      commentSubmit.id = "commentSubmit"
      commentSubmit.type = "submit"
      commentSubmit.innerText = "Submit"
      commentForm.append(commentSubmit)

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
      // console.log(comments);
      
  let commentLi = document.createElement("li")
      commentLi.innerText = comments
      commentList.append(commentLi)
    })

// COMMENT FORM EVENT LISTENER   
commentForm.addEventListener("submit", (event) => {
      event.preventDefault()
      // console.log(commentInput.value)
      
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
        // update the object in memory
        // console.log(postObj)
        // render the comment to the DOM
        // console.log(updatedPost)

      updatedPost.comments.forEach((newComments) => {
      console.log(newComments)    
            
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
  // console.log(`http://localhost:3000/posts/${postObj.id}`)
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
      // console.log(event.target.titlePost.value);
      // console.log(event.target.postImage.value);
      // console.log(event.target.postText.value);
      
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


    

//   
// clickfunction.addeventListener("click", (event)=>{
//   if screen value === size value
//     return zoom 
//   else {
//      create/appened post form at x/y location
//     }
//    else if x/y === post location
//    bring post to front 
      // }

// 
//  
//      post form appends to clickfunction location
// 
// 
//      find x/y coordinates
// 
// 
// 

      
// newPostForm = document.createElement("form")
//   newPostForm.id = "newPostForm"  
//   newPostForm.type = "text"
//     body.append(newForm)
    
// let commentInput = document.createElement("input")
//     commentInput.name = "commentInput"
//     commentInput.type = "text"
//     commentInput.autocomplete = "off"
//     commentInput.placeholder = "Leave a comment"
//     commentForm.append(commentInput)
 
// let commentSubmit = document.createElement("button")
//     commentSubmit.id = "commentSubmit"
//     commentSubmit.type = "submit"
//     commentSubmit.innerText = "Submit"
//     commentForm.append(commentSubmit)


// <body>
//   <form id="new-post" >
//       <input
//           type="text"
//           name="titlePost"
//           value=""
//           placeholder="Enter Post title"
//           class="input-text"
//           autocomplete="off" 
//       />
//       <br/>
//       <input
//           type="text"
//           name="postImage"
//           value=""
//           placeholder="Enter Post Image URL"
//           class="input-text"
//           autocomplete="off" 
//       />
//       <br/>
//       <input
//           type="text"
//           name="postText"
//           value=""
//           placeholder="Enter Your Post"
//           class="input-text"
//           autocomplete="off" 
//       />
//       <br/>
//       <button 
//           id="new-post-submit" 
//           type="submit" 
//           class="ui primary button">
//           Submit Post
//       </button>





// <!-

//  <!-- The Modal -->
//  <div id="myModal" class="modal">
//     <!-- Modal content -->
// <div class="modal-content">
  
//   <div class="modal-header">
//     <span class="close">&times;</span>    
// </div>
//     <div class="modal-body">
//       <br>
//                   <div class="thumbnail">
//                     <a data-target=#myModal2 data-toggle="modal2" class="MainNavText2" id="MainNavHelp2" href="#myModal2"> 
//                       <img src="./images/folder-closed.png" alt="folder-closed" width="200px" height="200px">
//                       <!-- <h2 style="text-align:center;">a cat</h2>   -->
//                     </a>
                      
//                           <a href="https://youtu.be/Z0wAPztOO2U" target="_blank">
//                           <img src="./images/folder-closed.png" alt="folder-closed" width="200px" height="200px">
//                           </a>
//                           <!-- <h2 style="text-align:center;">a birds</h2> -->
//                       </div> 
//                       <div class="folder">
//                         <a data-target=#myModal2 data-toggle="modal2" class="MainNavText2" id="MainNavHelp2" href="#myModal2"> 
//                            <img src="./images/folder-closed.png" alt="folder-closed" width="150px" height="150px">
//                            <img src="./images/folder-open.png" class="folder-open" alt="folder-open" width="150px" height="150px">
//                           </a>

//                        </div> 
//                       <div class="thumbnail2">
                          
//                 </div>

      
//                 </div>
//                 <div class="modal-footer">
//                 </div>
// </div> --></a>

