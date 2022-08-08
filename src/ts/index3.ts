import { Ipost, Icomment} from "./models/models.js";

import { getAllPostsFromBackend } from "./requests/asyncRequests.js";



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

    
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`
    singlePostContainer.classList.add('card') 
    const singlePostContent = `
    <div class="card">
        <h2 class="single-post-name-${post.id}">${post.title}</h2>
        <p class="message-${post.id}">${post.message}</p>
        
        <div class="options">
        <button type="button" >Leave a Comment</button>
          <button type="button" >Like</button>
          <button type="button" >Eliminar</button>
        </div>

    </div>
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
    singleCommentContainer.classList.add(`card2`)
    const singleCommentContent:string =`
    <div class="card2">
        <h3 class ="comment_title_${comment.id}">Anonim Comment:</h3>
        <p class ="comment_message_${comment.id}">${comment.message}</p>
        <div class="options">
          <button type="button" >Like</button>
          <button type="button" >Eliminar</button>
        </div>
    </div>
    `
    singleCommentContainer.innerHTML = singleCommentContent;
    postContainter.append(singleCommentContainer)
}

