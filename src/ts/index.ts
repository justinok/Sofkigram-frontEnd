import { Ipost } from "./models/models.js";

import { getAllPostsFromBackend } from "./requests/asyncRequests.js";


console.log("te odio CORS");

let posts:Ipost[];
getAllPostsFromBackend().then(response => {
    posts = response
    console.log(posts);
} )