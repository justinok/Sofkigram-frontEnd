import { getAllPostsFromBackend } from "./requests/asyncRequests.js";
console.log("te odio CORS");
let posts;
getAllPostsFromBackend().then(response => {
    posts = response;
    console.log(posts);
});
