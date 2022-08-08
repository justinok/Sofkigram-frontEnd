import { Ipost, Icomment} from "./models/models.js";

import { getAllPostsFromBackend } from "./requests/asyncRequests.js";


console.log("te odio CORS");

let posts:Ipost[];
getAllPostsFromBackend().then(response => {
    posts = response
    materializePosts(posts);
    
} )

function materializePosts(posts:Array<Ipost>){
    const divRoot = document.querySelector('#root') as
    HTMLDivElement;
    posts.forEach(post => renderPost(post, divRoot))
    console.log(posts)
    console.log(divRoot)

}

function renderPost(post:Ipost, divRoot:HTMLDivElement){
    // Ipost[]  ???
    
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`
    singlePostContainer.classList.add('single_post_container') 
    const singlePostContent = `
     <h2 class="single-post-name-${post.id}">${post.title}</h2>
     <p class="message-${post.id}">${post.message}</p>
     `
     singlePostContainer.innerHTML = singlePostContent;
     materializeComments(post.comments, singlePostContainer)
     divRoot.append(singlePostContainer)
}

function materializeComments(comments:Icomment[], postContainter:HTMLDivElement ){
    comments.forEach(comment => renderComment(comment, postContainter))
}

function renderComment(comment:Icomment, postContainter:HTMLDivElement){
    const singleCommentContainer:HTMLDivElement = document.createElement('div')
    singleCommentContainer.className = `single_comment_container_${comment.id}`
    singleCommentContainer.classList.add(`single_comment_container`)
    const singleCommentContent:string =`
    <h3 class ="comment_title_${comment.id}">Anonim Comment:</h3>
    <p class ="comment_message_${comment.id}">${comment.message}</p>
    `
    singleCommentContainer.innerHTML = singleCommentContent;
    postContainter.append(singleCommentContainer)
}