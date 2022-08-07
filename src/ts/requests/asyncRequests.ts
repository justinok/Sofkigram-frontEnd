import { Icomment } from "../models/models.js"
import { Ipost } from "../models/models.js"

export async function getAllPostsFromBackend () {
    const response:Response = await fetch('http://localhost:8080/post/')

    const post:Ipost[] = await response.json

    return post;
}