import { getAllPostsFromBackend, sendPostToBackend } from "./requests/asyncRequests.js";
window.addEventListener('DOMContentLoaded', () => {
    getPosts();
});
function getPosts() {
    let posts;
    getAllPostsFromBackend().then(response => {
        posts = response;
        materializePosts(posts);
    });
}
function materializePosts(posts) {
    const divRoot = document.querySelector('#root');
    posts.forEach(post => renderPost(post, divRoot));
    console.log(posts);
    console.log(divRoot);
}
function sayHi() {
    console.log("hi");
}
function renderPost(post, divRoot) {
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`;
    singlePostContainer.classList.add('card');
    const singlePostContent = `
    <div class="card">
        <h2 class="single-post-name-${post.id}">${post.title}</h2>
        <p class="message-${post.id}">${post.message}</p>
        
        <div class="options">
        <button type="button" >Leave a Comment</button>
          <button type="button" >Like</button>
          <button type="button" >Delete</button>
        </div>

    </div>
     `;
    singlePostContainer.innerHTML = singlePostContent;
    materializeComments(post.comments, singlePostContainer);
    divRoot.append(singlePostContainer);
}
function materializeComments(comments, postContainter) {
    comments.forEach(comment => renderComment(comment, postContainter));
}
function renderComment(comment, postContainter) {
    const singleCommentContainer = document.createElement('div');
    singleCommentContainer.className = `single_comment_container_${comment.id}`;
    singleCommentContainer.classList.add(`card2`);
    const singleCommentContent = `
    <div class="card2">
        <h3 class ="comment_title_${comment.id}">Anonim Comment:</h3>
        <p class ="comment_message_${comment.id}">${comment.message}</p>
        <div class="options">
          <button type="button" >Like</button>
          <button type="button" >Delete</button>
        </div>
    </div>
    `;
    singleCommentContainer.innerHTML = singleCommentContent;
    postContainter.append(singleCommentContainer);
}
const postsForm = document.querySelector('.post-form');
postsForm === null || postsForm === void 0 ? void 0 : postsForm.addEventListener('submit', (e) => handleNewPost(e));
function handleNewPost(e) {
    e.preventDefault();
    const inputTitle = document.getElementById("title-input").value;
    const inputMessage = document.getElementById("message-input").value;
    if ((inputTitle.length >= 5 && inputTitle.length <= 100)) {
        if ((inputMessage.length >= 10 && inputMessage.length <= 400)) {
            const newPost = {
                title: inputTitle,
                message: inputMessage,
                comments: []
            };
            sendPostToBackend(newPost).then(response => {
                if (response.ok) {
                    window.location.reload();
                }
            });
        }
        else {
            alert("Title must be between 10 and 45 characters long!");
        }
    }
    else {
        alert("message must be between 5 and 400 characters long!");
    }
}
