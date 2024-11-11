document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const articlesList = document.getElementById("articles-list");
    const mostPopularContent = document.getElementById("most-popular-content");

    let articles = [];

    fetch("Articles.json")
        .then(response => response.json())
        .then(data => {
            articles = data.articles;
            displayArticles(articles);
            displayMostPopularArticle();
        });

    const currentTheme = localStorage.getItem("theme") || "light-mode";
    document.body.className = currentTheme;
    themeToggle.textContent = currentTheme === "light-mode" ? "Dark Mode" : "Light Mode";

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
        const theme = document.body.className;
        localStorage.setItem("theme", theme);
        themeToggle.textContent = theme === "light-mode" ? "Dark Mode" : "Light Mode";
    });

    function displayArticles(articles) {
        articlesList.innerHTML = "";
        articles.forEach(article => {
            const readingTime = Math.ceil(article.wordCount / 200);
            const articleCard = `
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.date} - ${article.category}</p>
                            <p class="card-text">Estimated Reading Time: ${readingTime} min</p>
                            <p class="card-text">${article.content.substring(0, 100)}...</p>
                            <button class="btn btn-primary" onclick="showArticle(${article.id})">Read More</button>
                        </div>
                    </div>
                </div>
            `;
            articlesList.innerHTML += articleCard;
        });
    }

    window.showArticle = function(id) {
        const article = articles.find(a => a.id === id);
        document.getElementById("articleTitle").innerText = article.title;
        document.getElementById("articleContent").innerText = article.content;
        $('#articleModal').modal('show');
    }

    document.getElementById("sort-by-views").addEventListener("click", () => {
        articles.sort((a, b) => b.views - a.views);
        displayArticles(articles);
        displayMostPopularArticle();
    });

    document.getElementById("sort-by-date").addEventListener("click", () => {
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayArticles(articles);
    });

    function displayMostPopularArticle() {
        const mostPopular = articles.reduce((prev, current) => (prev.views > current.views) ? prev : current);
        mostPopularContent.innerHTML = `
            <h6>${mostPopular.title}</h6>
            <p>${mostPopular.date}</p>
            <p>${mostPopular.views} views</p>
        `;
    }
});
