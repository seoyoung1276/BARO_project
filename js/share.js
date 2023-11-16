let posts;
axios.get(`${BASE_URL}/share/post`)
.then(Response => {
    getUserName(Response.data);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function getUserName(posts){
    for(let post of posts){
        console.log(post.user_no)
        axios.get(`${BASE_URL}/user/${post.user_no}`)
        .then(Response => {
            showPosts(post, Response.data.result.name)
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
    
}

function showPosts(post, userName){
    let finalDiv = document.createElement('div');
    finalDiv.className = "share-content-div";
    finalDiv.onclick = () => showPost();

    let titleDiv = document.createElement('div');
    titleDiv.className = "content-title-div";

    let stu_id = document.createElement('div');
    stu_id.className = "stu-id";
    stu_id.innerText = `${userName}`

    titleDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
    titleDiv.appendChild(stu_id);
    titleDiv.innerHTML += `<iconify-icon icon="simple-line-icons:check" class="content-check"></iconify-icon>`;

    let hr = document.createElement('div');
    hr.className = "hr";

    let contentDiv = document.createElement('div');
    contentDiv.className = "content-text";
    contentDiv.innerText = `${post.content}`;

    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-cnt-div";
    commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;

    let commentNum = document.createElement('comment-cnt-num');
    commentNum.className = "comment-cnt-num";
    commentDiv.appendChild(commentNum);

    finalDiv.appendChild(titleDiv);
    finalDiv.appendChild(titleDiv);
    finalDiv.appendChild(hr);
    finalDiv.appendChild(contentDiv);
    finalDiv.appendChild(commentDiv);

    document.body.appendChild(finalDiv);
}