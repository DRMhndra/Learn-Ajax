const parentBlogs = document.querySelector('.blogs-show');
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
const renderBlogs = (datas) => {
  console.log(datas);
  datas.forEach(e => {
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
  parentBlogs.innerHTML += post;
  });
}
getAllBlogs()
  .then(values => {
    // console.log(values);
    renderBlogs(values);
  })
  .catch(rejectReason => {
    console.log(rejectReason);
  })