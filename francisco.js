
let postForm = document.querySelector("#new-post");
let body = document.querySelector("body");
let posts = [];


// Get information
fetch("http://localhost:3000/Posts")
  .then((res) => res.json())
  .then((postsArr) => {
    postsArr.forEach(function (postObj) {
      posts = postsArr;
      postToDom(postObj);
    });
  });

function postToDom(postObj) {
  //creating elements in Dom

  // added a div
  let postContainer = document.createElement("div");
  postContainer.className = "postCont";
  body.append(postContainer);
 
  // added a "h2" for Title
  let postTitle = document.createElement("h2");
  postTitle.innerText = postObj.name;
  postContainer.append(postTitle);

  // added a Img
  let postImg = document.createElement("img");
  postImg.src = postObj.image;
  postContainer.append(postImg);
  postImg.className = "postImg";

  // added a "h3" for post
  let post = document.createElement("h3");
  post.innerText = postObj.Post;
  postContainer.append(post);

  // added a "ul" for comments
  let commentList = document.createElement("ul");
  postContainer.append(commentList);

  // added a 'button' for the like button
    let likeButton = document.createElement('button')
  likeButton.innerText = "👍"
  likeButton.className = 'likeButton'

  // added a 'button' for the dislike button
  let dislikeButton = document.createElement('button')
  dislikeButton.innerText = "👎"
  dislikeButton.className = "dislikeButton"
  
  // added a 'span' for the ammount of likes
    let likeNumber = document.createElement('span')
    likeNumber.innerText = postObj.likes
    likeNumber.className = "ammountLikes"

    // added a 'span' for the ammount of dislikes
    let dislikeNumber = document.createElement('span')
    dislikeNumber.innerText = postObj.Dislikes
    dislikeNumber.className = "ammountOfDislike"

  likeButton.append(likeNumber)
  dislikeButton.append(dislikeNumber)

  postContainer.append(likeButton, dislikeButton)
  
  //added delete button
  let deletePost = document.createElement(`button`)
  deletePost.innerText = "Delete Post"
  deletePost.className = "delete"
  
  postContainer.append(deletePost)

  // added comments 
  let commentForm = document.createElement("form")
  commentForm.id = "commentForm"
  commentForm.type = "text"
  postContainer.append(commentForm)
  
  let commentInput = document.createElement("input")
  commentInput.id = "commentInput"
  commentInput.type = "text"
  commentInput.placeholder = "Leave a comment"
  commentForm.appendChild(commentInput),
  
  commentSubmit = document.createElement("button")
  commentSubmit.id = "commentSubmit"
  commentSubmit.type = "submit"
  commentSubmit.innerText = "Submit"
  commentForm.appendChild(commentSubmit)


  //add an evenListener for every Submit button
commentForm.addEventListener("submit",(e)  => {
e.preventDefault()
// debugger
let whatsInCommit = e.target.commentInput.value
fetch(`http://localhost:3000/Posts/${postObj.id}`, {
   method:"PATCH",
   headers:{'Content-type':'application/Json'},
   body:JSON.stringify({
       Comments: whatsInCommit
   })
})
.then(res=>res.json())
.then((newCommit) =>{
let li = document.createElement('li')
let deleteComment = document.createElement('button')
deleteComment.innerText = 'X'
  li.append(deleteComment)
  li.innerText = newCommit.Comments
  postContainer.append(li)
})
})

//add eventListener for every delete button
deletePost.addEventListener('click', (f) =>{
    console.log(`http://localhost:3000/Posts/${postObj.id}`)
    fetch(`http://localhost:3000/Posts/${postObj.id}`,{
        method:"DELETE"  
    })
    .then(res => res.json)
    .then((deleted) => {
    postContainer.remove()
    })
})


//added eventListener for every like button
likeButton.addEventListener(`click`, (e) =>{
fetch(`http://localhost:3000/Posts/${postObj.id}`,{
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
//added an eventListener for every Dislike button 
dislikeButton.addEventListener(`click`, (b) => {
console.log(`http://localhost:3000/Posts/${postObj.id}`)
fetch(`http://localhost:3000/Posts/${postObj.id}`, {
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        Dislikes: postObj.Dislikes - 1
    })    
})
.then(res => res.json())
.then((upDatedDislikes) => {
    dislikeNumber.innerText = `${upDatedDislikes.Dislikes}`
})
})
// });
}
// added a eventListener for new post
postForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event.target.titlePost.value);
  // console.log(event.target.postImage.value);
  // console.log(event.target.postText.value);

  let disLikeCount = document.querySelector('span.ammountOfDislike')
  let likeCount = document.querySelector('span.ammountLikes')
  let whatUserTitles = event.target.titlePost.value;
  let imgLink = event.target.postImage.value;
  let postText = event.target.postText.value;
  likeVar = likeCount
 dislikeVar = disLikeCount
//  debugger;
  fetch("http://localhost:3000/Posts/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: whatUserTitles,
      Post: postText,
      image: imgLink,
      likes: 0,
      Dislikes: 0,
      Comments: []
    }),
  })
    .then((res) => res.json())
    .then((newlyCreatedPost) => {
      console.log(newlyCreatedPost)
      postToDom(newlyCreatedPost);
      event.target.reset();
    })
})
