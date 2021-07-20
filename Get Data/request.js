const buttonRequest = document.querySelector('.request-api');
const showData = document.querySelector('.place-data');
buttonRequest.addEventListener('click', () => {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const datas = JSON.parse(request.responseText);
        console.log(datas);
        datas.forEach(data => {
          const elementPost = `<article class="blog-posts">
          <header class="blog-header">
            <h3>${data.title}</h3>
          </header>
          <div class="blog-body">
            <p>${data.body}</p>
          </div>
        </article>`;
        showData.innerHTML += elementPost;
        });
      } else {
        showData.textContent = `Sorry can't load data because : ${request.status}`;
      }
    }
  });
  request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  request.send();
});
