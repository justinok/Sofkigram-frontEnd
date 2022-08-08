
import { Icomment, Ipost } from "../models/models.js"

export async function getAllPostsFromBackend () {
    const response:Response = await fetch('http://localhost:8080/post/')

    const posts:Ipost[] = await response.json()

    return posts;
}

export async function sendPostToBackend(post:Ipost) {

    fetch('http://localhost:8080/post/create/post', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => {
            console.log('error', error);
        })
        .then(response => {
            console.log('success', response.message)
        });

    
}

export async function sendCommentToBackend(comment:Icomment[]) {

    fetch('http://localhost:8080/post/create/comment', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => {
            console.log('error', error);
        })
        .then(response => {
            console.log('success', response.message)
        }) 

}

