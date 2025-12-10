// === Переключение вкладок (только на главной странице) ===
document.querySelectorAll('.tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    // Убираем активный класс у всех вкладок
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Скрываем все контентные блоки
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Показываем нужный блок
    const target = tab.getAttribute('data-tab');
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});

// === Слайдер (только если есть элементы слайдера) ===
const sliderImgs = document.querySelectorAll('.slider-img');
if (sliderImgs.length > 0) {
  const dots = document.querySelectorAll('.dot');
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  let currentSlide = 0;
  const totalSlides = sliderImgs.length;
  let slideInterval;

  function showSlide(index) {
    // Нормализуем индекс для зацикленности
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    // Обновляем изображения
    sliderImgs.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });

    // Обновляем точки
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  // Запуск авто-прокрутки
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4000);
  }

  // Остановка авто-прокрутки
  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Инициализация
  startAutoSlide();

  // Кнопка "Назад"
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  // Кнопка "Вперёд"
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  // Точки-индикаторы
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      const index = parseInt(dot.dataset.index, 10);
      showSlide(index);
      startAutoSlide();
    });
  });
}