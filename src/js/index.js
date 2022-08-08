import { getAllPostsFromBackend } from "./requests/asyncRequests.js";
let posts;
getAllPostsFromBackend().then(response => {
    posts = response;
    materializePosts(posts);
});
function materializePosts(posts) {
    const divRoot = document.querySelector('#root');
    posts.forEach(post => renderPost(post, divRoot));
    console.log(posts);
    console.log(divRoot);
}
function renderPost(post, divRoot) {
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`;
    singlePostContainer.classList.add('single_post_container');
    const singlePostContent = `
     <h2 class="single-post-name-${post.id}">${post.title}</h2>
     <p class="message-${post.id}">${post.message}</p>
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
    singleCommentContainer.classList.add(`single_comment_container`);
    const singleCommentContent = `
    <h3 class ="comment_title_${comment.id}">Anonim Comment:</h3>
    <p class ="comment_message_${comment.id}">${comment.message}</p>
    `;
    singleCommentContainer.innerHTML = singleCommentContent;
    postContainter.append(singleCommentContainer);
}
