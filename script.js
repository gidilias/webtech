let articles = [];
const articleImages = [
  "https://www.luxcafeclub.com/cdn/shop/articles/240916-coffee-caffeine-heart-health-kh-d4d5cb_1100x.jpg?v=1726678632",
  "https://via.placeholder.com/600x400?text=Article+2",
  "https://via.placeholder.com/600x400?text=Article+3",
  "https://via.placeholder.com/600x400?text=Article+4",
  "https://via.placeholder.com/600x400?text=Article+5",
  "https://via.placeholder.com/600x400?text=Article+6",
  "https://via.placeholder.com/600x400?text=Article+7",
  "https://via.placeholder.com/600x400?text=Article+8",
  "https://via.placeholder.com/600x400?text=Article+9",
  "https://via.placeholder.com/600x400?text=Article+10"
];

fetch('Articles.json')
  .then(response => response.json())
  .then(data => {
    articles = data.articles;
    displayArticles(articles);
  });

function displayArticles(articles) {
  const container = document.getElementById('article-container');
  container.innerHTML = articles
    .map((article, index) => `
      <div class="col-md-4">
        <div class="card" onclick="openArticle(${index})">
          <img src="${articleImages[index]}" class="card-img-top" alt="${article.title}">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.content.substring(0, 100)}...</p>
            <p>
              <small class="text-muted">
                ${new Date(article.date).toLocaleDateString()} - ${calculateReadingTime(article.wordCount)} min read
              </small>
            </p>
            <p><strong>${article.views} views</strong></p>
          </div>
        </div>
      </div>
    `).join('');
}

function calculateReadingTime(wordCount) {
  return Math.ceil(wordCount / 200);
}

function openArticle(index) {
  const article = articles[index];
  document.getElementById('articleModalLabel').innerText = article.title;
  document.getElementById('articleModalImage').src = articleImages[index];
  document.getElementById('articleModalContent').innerText = article.content;
  document.getElementById('articleModalDetails').innerText = `
    Published on ${new Date(article.date).toLocaleDateString()} - ${article.views} views - ${calculateReadingTime(article.wordCount)} min read
  `;
  const modal = new bootstrap.Modal(document.getElementById('articleModal'));
  modal.show();
}

function sortArticles(criteria) {
  const sortedArticles = [...articles].sort((a, b) => {
    if (criteria === 'views') return b.views - a.views;
    if (criteria === 'date') return new Date(b.date) - new Date(a.date);
  });
  displayArticles(sortedArticles);
}
document.getElementById('getStartedBtn').addEventListener('click', function() {
  window.location.href = 'main.html';
});
