import { getAllPostsFromBackend } from "./requests/asyncRequests.js";
const CREATE_POSTS_URL = 'http://localhost:8080/post/create/post';
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
    singlePostContainer.classList.add('card');
    const singlePostContent = `
    <div class="card">
        <h2 class="single-post-name-${post.id}">${post.title}</h2>
        <p class="message-${post.id}">${post.message}</p>
        
        <div class="options">
          <button type="button" >Like</button>
          <button type="button" >Eliminar</button>
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
          <button type="button" >Eliminar</button>
        </div>
    </div>
    `;
    singleCommentContainer.innerHTML = singleCommentContent;
    postContainter.append(singleCommentContainer);
}
const createPost = () => {
    const formData = new FormData(document.querySelector('#formAdd'));
    if (!formData.get('title').length || !formData.get('message')) {
        document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
        return;
    }
    document.querySelector('#msgFormAdd').innerHTML = '';
    const post = {
        title: formData.get('title'),
        message: formData.get('message')
    };
    console.log(post);
    fetch(CREATE_POSTS_URL, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => {
        alertManager('error', error);
        document.querySelector('#formAdd').reset();
    })
        .then(response => {
        alertManager('success', response.message);
        //getPosts();
    });
};
// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');
btnAdd.onclick = () => openModalAdd();
window.onclick = function (event) {
    if (event.target == modalAdd) {
        //modalAdd.style.display = "none";
    }
};
const closeModalAdd = () => {
    modalAdd.style.display = 'none';
};
const openModalAdd = () => {
    modalAdd.style.display = 'block';
};
// MODAL ADIT MANAGER
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector('#modalEdit');
const openModalEdit = () => {
    modalEdit.style.display = 'block';
};
const closeModalEdit = () => {
    modalEdit.style.display = 'none';
};
window.onclick = function (event) {
    if (event.target == modalEdit) {
        //modalEdit.style.display = "none";
    }
};
// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById('modalConfirm');
window.onclick = function (event) {
    if (event.target == modalConfirm) {
        modalConfirm.style.display = "none";
    }
};
const closeModalConfirm = () => {
    modalConfirm.style.display = 'none';
};
const openModalConfirm = (id) => {
    deleteId = id;
    modalConfirm.style.display = 'block';
};
/** ALERT */
const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('#alert');
    alert.innerHTML = message || 'Se produjo cambios';
    alert.classList.add(typeMsg);
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove(typeMsg);
    }, 3500);
};
