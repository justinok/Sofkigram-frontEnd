import { isPostfixUnaryExpression } from "../../node_modules/typescript/lib/typescript.js";
import { Ipost, Icomment} from "./models/models.js";

import { getAllPostsFromBackend, sendPostToBackend,sendCommentToBackend,editPostFromBackend} from "./requests/asyncRequests.js";


window.addEventListener('DOMContentLoaded', () => {
    getPosts();
})

function getPosts(){
    let posts:Ipost[];
    getAllPostsFromBackend().then(response => {
    posts = response
    materializePosts(posts);
    
} )
}

function materializePosts(posts:Array<Ipost>){
    const divRoot = document.querySelector('#root') as
    HTMLDivElement;
    posts.forEach(post => renderPost(post, divRoot))
    console.log(posts)
    console.log(divRoot)

}
function sayHi(){
    console.log("hi")
}

function renderPost(post:Ipost, divRoot:HTMLDivElement){

    
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`
    singlePostContainer.classList.add('card') 
    const singlePostContent = `
    <div class="card">
        <h2 class="single-post-name-${post.id}">${post.title}</h2>
        <p class="message-${post.id}">${post.message}</p>
        

    </div>
    
     `

     const deleteButton:HTMLButtonElement = document.createElement('button')
     deleteButton.className = 'single-post-delete-button'
     deleteButton.innerText = 'Delete'
     deleteButton.addEventListener('click', ()=> testalerts())
     const editButton:HTMLButtonElement = document.createElement('button')
     editButton.className = 'single-post-edit-button'
     editButton.innerText = 'Edit'
     editButton.addEventListener('click', ()=> sayHi())


     const addComment:HTMLButtonElement = document.createElement('button')
     addComment.className = 'single-post-addComment-button'
     addComment.innerText = 'Comment'
     addComment.addEventListener('click', ()=> handleNewComment(post.id))

    
    const addForm: HTMLInputElement = document.createElement('input')
    addForm.className = 'new-comment-form'
    addForm.innerText = 'write here your comment'



     singlePostContainer.innerHTML = singlePostContent;
     singlePostContainer.append(editButton,  deleteButton)
     materializeComments(post.comments, singlePostContainer)
     //newwwwcoment(post,singlePostContainer)
     divRoot.append(singlePostContainer)
}

function testalerts(){
}

function materializeComments(comments:Icomment[], postContainter:HTMLDivElement ){
    comments.forEach(comment => renderComment(comment, postContainter))
}


const postsForm: HTMLFormElement |null = document.querySelector('.post-form');
postsForm?.addEventListener('submit', (e) => handleNewPost(e))
function handleNewPost(e : SubmitEvent){
    e.preventDefault();

    const inputTitle = (document.getElementById("title-input") as HTMLInputElement).value
    const inputMessage = (document.getElementById("message-input") as HTMLInputElement).value

    if((inputTitle.length >= 5 && inputTitle.length <= 100)){
        if((inputMessage.length >= 10 && inputMessage.length <= 400)){
            
            const newPost: Ipost = {
              title: inputTitle,
              message: inputMessage,
              comments: []
            }

            sendPostToBackend(newPost).then(
                response => {
                  if(!response === 200){
                    window.location.reload()
                    alert("Your Post has been created :D" )
                }
                window.location.reload()
                alert("Your Post has been created :D" )
            })

        } else {
            alert("Title must be between 10 and 45 characters long!" )
        }
    } else {
        alert("message must be between 5 and 400 characters long!")
    }
}

/**
 * Comments section
 */
 function renderComment(comment:Icomment, postContainter:HTMLDivElement){
    const singleCommentContainer:HTMLDivElement = document.createElement('div')
    singleCommentContainer.className = `single_comment_container_${comment.id}`
    singleCommentContainer.classList.add(`card2`)
    const singleCommentContent:string =`
    <div class="card2">
        <h3 class ="comment_title_${comment.id}">Anonim Comment:</h3>
        <p class ="comment_message_${comment.id}">${comment.message}</p>
    
    </div>
    `

    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-comment-edit-button'
    editButton.innerText = 'Edit'
    editButton.addEventListener('click', ()=> sayHi())
    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-comment-delete-button'
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', ()=> sayHi())


    singleCommentContainer.innerHTML = singleCommentContent;
   
    singleCommentContainer.append(deleteButton,editButton)
    postContainter.append(singleCommentContainer)
}


/**
 * try to show the fucking form
 */


/** 
const commentForm: HTMLFormElement |null = document.querySelector('.post-form');
commentForm?.addEventListener('Comment', (e) => handleNewComment(e))
 */


function handleNewComment(id:number){
    
    const inputComment = (document.getElementById("comment-input") as HTMLInputElement).value

    if((inputComment.length >= 3 && inputComment.length <= 400)){
            
            const newComment: Icomment = {
              message: inputComment,
              fkPostId: id
            }

            sendCommentToBackend(newComment).then(
                response => {
                  if(!response === 200){
                    window.location.reload()
                    alert("Your Comment has been created :D" )
                }
                window.location.reload()
                alert("Your comment has been created :D" )
            })

        } else {
            alert("Comment must be between 5 and 45 characters long!" )
        }
}

function newwwwcoment(post:Ipost, postContainter:HTMLDivElement){
    const comment1Container:HTMLFormElement = document.createElement('form')
    //comment1Container =document.querySelector('.form-new-comment') as HTMLFormElement;
    const postid= post.id
    comment1Container.className = `form-new-comment_${post.id}`

    comment1Container.classList.add(`comment-form`)
    const formComment:string = `
      <form class="comment-form">
        <input class="text-input" id="comment-input" placeholder="Write your comment..."  type="text" required>
        <button class="comment-form-button">Add Comment</button>
      </form>`
    //commentContainer.innerHTML = formComment;

    const submitCommentButton = document.querySelector('.comment-form-button') as HTMLButtonElement
    submitCommentButton.className = 'add-new-comment-button'
    submitCommentButton.innerText = 'push new comment'
    submitCommentButton.addEventListener('click', ()=> handleNewComment(postid))

    comment1Container.innerHTML = formComment;
   
    comment1Container.append(submitCommentButton)
    postContainter.append(comment1Container)
}






  



 







