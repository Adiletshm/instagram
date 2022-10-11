const API = "http://localhost:8000/posts";

//  сохроняем переменные для добавления поста
let nickName = document.getElementById("posts__nick-name");
let imgUrl = document.getElementById("posts__img-url");
let postDiscription = document.getElementById("posts__discreption");
let btnaAddPost = document.getElementById("add-post");
let btnCloseaAddPost = document.getElementById("close-add-post");
let addNewPostBtn = document.querySelector(".add__new_post");
let addPostBlock = document.querySelector(".container9");

//  переменные для изменения и редоктирования поста
// let btnAddCommit = document.getElementById("posts__add-commit");
// let heart = document.getElementsByClassName("heart");
// let like = document.getElementsByClassName("like-text");
// let count = 1;
let deletePostBtn = document.querySelector(".deletePost");
// переменные  для изменения и удаления поста
let mainPostMenu = document.getElementsByClassName("main__post-menu")[0];
// let deletePost = document.querySelector(".deletePost");
let closePostWindow = document.querySelector(".close");
let chanchePost = document.querySelector(".chanche");
// console.log(deletePostBtn);
// переменные для изменения поста
let mainModal = document.querySelector(".main-modal");
let editNickName = document.querySelector("#edit__nick-name");
let editImgUrl = document.querySelector("#edit__img-url");
let editDiscription = document.querySelector("#edit__discreption");
let editCloseModalBtn = document.querySelector("#edit__close_modal");
let editSaveModalBtn = document.querySelector("#edit__save_btn");

// ! ---------------------------- CREATE START -------------------------
function createPost(parametr) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(parametr),
  }).then(() => readPost());
}

btnaAddPost.addEventListener("click", () => {
  if (
    !imgUrl.value.trim() ||
    !postDiscription.value.trim() ||
    !nickName.value.trim()
  ) {
    alert("Заполните поля!");
  }

  let obj = {
    Url: imgUrl.value,
    discription: postDiscription.value,
    nickName: nickName.value,
  };
  createPost(obj);
  imgUrl.value = "";
  postDiscription.value = "";
  nickName.value = "";
});
// ! ---------------------------- CREATE END -------------------------

// ! ========================== Read start =============================
let postCard = document.getElementById("posts");
function readPost() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      postCard.innerHTML = "";
      data.reverse().forEach(post => {
        postCard.innerHTML += `
          <div id="posts__card">
          <div id="posts__card-header">
            <div class="left__post_card-header">
              <img
                class="icon instagram"
                src="./image/instagram-svgrepo-com.svg"
                alt=""
              />
               <p>${post.nickName}</p>
            </div>
            <div class="right__post_card-header">
              <img
                class="icon"
                src="./image/menu-svgrepo-com.svg"
                alt="menu"
                onclick="deletedPost(${post.id});editedPost(${post.id})"
              />
            </div>
          </div>
          <img
            src=${post.Url}
            alt="img"
          />
          <span class="icon-block">
            <div>
              <img
                class="icon heart"
                src="./image/heart-svgrepo-com.svg"
                alt="like"
              />
              <img
                class="icon comment"
                src="./image/comment-bubble-svgrepo-com.svg"
                alt="comment"
              />
              <img
                class="icon send"
                src="./image/send-svgrepo-com.svg"
                alt="send"
              />
              <p class="like-text" >Нравится: 1</p>
            </div>
            <div>
              <img
                class="icon bookmark"
                src="./image/bookmark-save-svgrepo-com.svg"
                alt="save"
              />
            </div>
          </span>
          <p class="discreption-text" >${post.discription}</p>
        </div>
        `;
      });
    });
}
// ? ========================== Read end =============================
let editId = "";
let deleteId = "";
//  ! ============================ EDIT START ==============================
function editPost(id, postEditObj) {
  if (
    !editNickName.value.trim() ||
    !editImgUrl.value.trim() ||
    !editDiscription.value.trim()
  ) {
    alert("Заполните поля!");
  }
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postEditObj),
  }).then(() => readPost());
}
// ! ========================= БЛОК ДЛЯ ДОБАВЛЕНИЯ ПОСТА START ===================
addNewPostBtn.addEventListener("click", () => {
  console.log("jhj");
  addPostBlock.style.display = "block";
});
btnCloseaAddPost.addEventListener("click", () => {
  addPostBlock.style.display = "none";
});
// ! ========================= БЛОК ДЛЯ ДОБАВЛЕНИЯ ПОСТА END ===================

// ! ========================= POST WINDOW START =======================
closePostWindow.addEventListener("click", () => {
  mainPostMenu.style.display = "none";
});
chanchePost.addEventListener("click", () => {
  mainModal.style.display = "block";
  mainPostMenu.style.display = "none";
});
//?========================= POST WINDOW FINISH ======================
function editedPost(id) {
  mainPostMenu.style.display = "block";
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(postObj => {
      editNickName.value = postObj.nickName;
      editImgUrl.value = postObj.Url;
      editDiscription.value = postObj.discription;
      editId = postObj.id;
    });
}

editSaveModalBtn.addEventListener("click", () => {
  let postEditObj = {
    nickName: editNickName.value,
    Url: editImgUrl.value,
    discription: editDiscription.value,
  };
  editPost(editId, postEditObj);
  mainModal.style.display = "none";
});

editCloseModalBtn.addEventListener("click", () => {
  mainModal.style.display = "none";
});
//  ? ============================ EDIT FINISH =============================
// ! ============================= DELETE START ===============================
function deletedPost(id) {
  deleteId = id;
}

function deletePost(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readPost());
}

deletePostBtn.addEventListener("click", () => {
  deletePost(deleteId);
});

// ? ============================= DELETE FINISH ===============================
readPost();
