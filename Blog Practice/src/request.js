const parentBlogs = document.querySelector('.blogs-show');
const formsPost = document.getElementById('form-blogs');
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
    })
    request.open('POST', 'json/receive.php', true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send(data);
  })
}

const renderBlogs = (datas) => {
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
  addBlogs()
    .then(values => {
      renderBlogs(values);
    })
    .catch(rejectReason => {
      console.log(rejectReason);
    })
});