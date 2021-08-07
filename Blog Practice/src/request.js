const parentBlogs = document.querySelector('.blogs-show');
const formsPost = document.getElementById('form-blogs');
const buttonSubmit = document.getElementById('button-publish');
const modalShow = document.getElementById('myModal');
const btnModalCancel = document.querySelector('.btn-cancel');
const btnModalConfirm = document.querySelector('.btn-confirm');
const btnNewBlog = document.querySelector('.btn-new');
const wrapperFormPost = document.querySelector('.blogs-post-header');
let autoIdIncrements = 1;

const getAllBlogs = () => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const datas = JSON.parse(request.responseText);
          resolve(datas);
        } else {
         reject(`Fail to fetch data`);
        }
      }
    });
    request.open('GET', 'json/testing.json');
    request.send();
  });
}

const addBlogs = () => {
  return new Promise((resolve, reject) => {
    let data  = JSON.stringify({
      id: autoIdIncrements,
      title: document.getElementById('title-post').value,
      slug: titleConverter(document.getElementById('title-post').value),
      body: document.getElementById('body-post').value,
    });
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4) {
        if(request.status === 200) {
          const datas = JSON.parse(request.responseText);
          resolve(datas);
        } else {
          reject(`Gagal Send Data`);
        }
      }
    });
    request.open('POST', 'json/receive.php', true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send(data);
  });
}

const updateBlogs = () => {
  return new Promise((resolve,reject) => {
    let data = JSON.stringify({
      id: document.getElementById('id-post').value,
      title: document.getElementById('title-post').value,
      slug: titleConverter(document.getElementById('title-post').value),
      body: document.getElementById('body-post').value,
    });
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const datas = JSON.parse(request.responseText);
          resolve(datas);
        } else {
          reject(`Fail to patch data`);
        }
      }
    })
    request.open('PUT', 'json/receive.php', true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send(data);
  });
}

const deleteBlogs = (_id) => {
  return new Promise((resolve, reject) => {
    let dataDelete = JSON.stringify({
      id: _id
    });
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
      if(request.readyState === 4) {
        if(request.status === 200) {
          const dataSuccess = JSON.parse(request.responseText);
          resolve(dataSuccess);
        } else {
          reject(`Gagal`);
        }
      }
    });
    request.open('DELETE', 'json/receive.php');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(dataDelete);
  });
}

const getBlogsById = (id, method) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const datas = request.responseText;
          resolve(datas);
        } else {
         reject(`Fail to fetch data`);
        }
      }
    });
    request.open('POST', 'json/receive.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(`id=${id}&method=${method}`);
  });
}

const renderBlogs = (datas) => {
  if (datas.length != 0) {
    parentBlogs.innerHTML = "";
    datas.forEach(e => {
      let idIncrement = parseInt(`${e.id}`);
      let post = `<div class="posts">
      <div class="posts-header">
        <h3>${e.title}</h3>
      </div>
      <div class="posts-body">
        <p>
          ${e.body}
        </p>
      </div>
      <div class="posts-action">
        <button class="btn btn-edit" id="post-${e.id}">Edit</button>
        <button class="btn btn-delete" id="post-${e.id}">Delete</button>
      </div>
    </div>`;
    idIncrement += 1;
    autoIdIncrements = idIncrement;
    parentBlogs.innerHTML += post;
    });
    // section get data
    const editButtons = Array.from(document.querySelectorAll('.btn-edit'));
    const deleteButtons = Array.from(document.querySelectorAll('.btn-delete'));
    editButtons.forEach(e => {
      e.addEventListener('click', function() {
        const data = this;
        const id = parseInt(data.id.split("-")[1])
        const method = data.innerHTML;
        getBlogsById(id, method)
          .then(values => {
            const dataEdit = JSON.parse(values);
            const idPost = document.getElementById('id-post').value = dataEdit.id;
            const title = document.getElementById('title-post').value = dataEdit.title;
            const body = document.getElementById('body-post').value = dataEdit.body;
            const button = document.getElementById('button-publish').textContent = `Update`;
          })
          .catch(rejectReason => {
            console.log(rejectReason);
          });
      })
    });
    deleteButtons.forEach(e => {
      e.addEventListener('click', function() {
        const data = this;
        const id = parseInt(data.id.split("-")[1]);
        const method = data.innerHTML;
        modalShow.style.display = 'block';
        getBlogsById(id, method)
          .then(values => {
            const dataDelete = JSON.parse(values);
            btnModalConfirm.setAttribute('id', `post-${dataDelete.id}`);
          })
          .catch(rejectReason => {
            console.log(rejectReason);
          });
      });
    })
  } else {
    parentBlogs.innerHTML = `Data Kosong`;
  }
}

function titleConverter (title) {
  const separator = title.toLowerCase()
    .split(" ")
    .join('-');
  return separator;
}

getAllBlogs()
  .then(values => {
    renderBlogs(values);
  })
  .catch(rejectReason => {
    console.log(rejectReason);
  })

formsPost.addEventListener('submit', function(e) {
  e.preventDefault();
  if (buttonSubmit.textContent == `Publish`) {
    addBlogs()
    .then(values => {
      renderBlogs(values);
      document.getElementById('title-post').value = '';
      document.getElementById('body-post').value = '';
    })
    .catch(rejectReason => {
      console.log(rejectReason);
    })
  } else {
    updateBlogs()
      .then(values => {
        renderBlogs(values);
        document.getElementById('button-publish').textContent = `Publish`;
        document.getElementById('title-post').value = '';
        document.getElementById('body-post').value = '';
      })
      .catch(rejectReason => {
        console.log(rejectReason);
      });
  }
});

btnModalCancel.addEventListener('click', function() {
  modalShow.style.display = 'none';
});

btnModalConfirm.addEventListener('click', function() {
  const data = this;
  const idBlog = data.id.split("-")[1];
  deleteBlogs(idBlog)
    .then(values => {
      modalShow.style.display = 'none';
      setTimeout(() => {
        renderBlogs(values);
      }, 1000);
    })
    .catch(rejectReason => {
      console.log(rejectReason);
    });
});

btnNewBlog.addEventListener('click', function () {
  if (wrapperFormPost.style.display == 'block') {
    wrapperFormPost.style.display = 'none';
  } else {
    wrapperFormPost.style.display = 'block';
  }
});