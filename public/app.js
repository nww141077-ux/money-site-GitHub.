// Подставляем ссылки из config
const DEFAULTS = {
  boostyUrl: 'https://boosty.to/ТВОЙ_НИК',
  dzenUrl: 'https://dzen.ru/ТВОЙ_НИК'
};

fetch('config.json')
  .then(r => r.json())
  .then(cfg => {
    document.title = cfg.siteTitle || 'Мой проект';
    document.querySelectorAll('.logo').forEach(el => el.textContent = cfg.siteTitle || 'Мой проект');
    const donate = cfg.boostyUrl || DEFAULTS.boostyUrl;
    document.querySelectorAll('#donateBtn, #donateBtn2').forEach(el => {
      el.href = donate;
      el.target = '_blank';
    });
  })
  .catch(() => {});

// Рендерим статьи
fetch('data/articles.json')
  .then(r => r.json())
  .then(data => {
    const list = document.getElementById('articleList');
    list.innerHTML = data.articles.map(a => `
      <article class="card">
        <div class="date">${a.date}</div>
        <h3><a href="article.html?slug=${a.slug}">${a.title}</a></h3>
        <p>${a.excerpt}</p>
      </article>
    `).join('');
  })
  .catch(() => {
    document.getElementById('articleList').innerHTML =
      '<p>Не удалось загрузить статьи. Проверь, что сервер запущен.</p>';
  });
