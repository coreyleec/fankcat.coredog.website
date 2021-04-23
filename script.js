// let likeButton = document.createElement("button")
// let disLike = document.createElement("button")

let postForm = document.querySelector("#new-post");
let body = document.querySelector("body");
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


    

//   ZOOM CLICK EVENT BLUEPRINT
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






