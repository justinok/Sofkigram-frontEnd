var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllPostsFromBackend() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/post/');
        const posts = yield response.json();
        return posts;
    });
}
export function sendPostToBackend(post) {
    return __awaiter(this, void 0, void 0, function* () {
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
            console.log('success', response.message);
        });
    });
}
export function sendCommentToBackend(comment) {
    return __awaiter(this, void 0, void 0, function* () {
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
            console.log('success', response.message);
        });
    });
}
