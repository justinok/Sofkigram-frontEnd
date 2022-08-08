
import { Ipost } from "../models/models.js"

export async function getAllPostsFromBackend () {
    const response:Response = await fetch('http://localhost:8080/post/')

    const posts:Ipost[] = await response.json()

    return posts;
}

export async function createPost() {
    
    
}