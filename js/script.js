// Product color swatches
document.querySelectorAll('.product-card').forEach((card) => {
  const image = card.querySelector('.product-card__img');
  const dots = card.querySelectorAll('.dot');

  if (!image) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const newImage = dot.dataset.image;

      if (!newImage) return;

      image.src = newImage;
      dots.forEach((item) => item.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});

// Reviews carousel and mobile review dots
const reviewSlider = document.getElementById('reviewsSlider');
const firstReviewDot = document.getElementById('firstDot');
const secondReviewDot = document.getElementById('secondDot');
const mobileReviewDots = document.querySelectorAll('.mobile-review-dot');
const reviewPages = document.querySelectorAll('.review-page');

const showReviewPage = (pageIndex) => {
  if (!reviewSlider) return;

  reviewSlider.style.transform = `translateX(-${pageIndex * 50}%)`;
  firstReviewDot?.classList.toggle('active', pageIndex === 0);
  secondReviewDot?.classList.toggle('active', pageIndex === 1);
};

firstReviewDot?.addEventListener('click', () => showReviewPage(0));
secondReviewDot?.addEventListener('click', () => showReviewPage(1));

mobileReviewDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const reviewIndex = Number(dot.dataset.reviewIndex);
    const pageIndex = Math.floor(reviewIndex / 2);
    const cardIndex = reviewIndex % 2;
    const page = reviewPages[pageIndex];
    const card = page?.querySelectorAll('.review-card')[cardIndex];

    if (!page || !card || !reviewSlider) return;

    showReviewPage(pageIndex);
    page.scrollTo({
      left: card.offsetLeft - page.offsetLeft,
      behavior: 'smooth'
    });

    mobileReviewDots.forEach((item) => item.classList.remove('active'));
    dot.classList.add('active');
  });
});

// Mobile navigation menu
const menuButton = document.getElementById('burgerBtn');
const closeMenuButton = document.getElementById('closeBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (menuButton && closeMenuButton && mobileMenu) {
  const setMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  };

  menuButton.addEventListener('click', () => setMenuOpen(true));
  closeMenuButton.addEventListener('click', () => setMenuOpen(false));
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const row = item.querySelector('.faq-item__row');
  const arrow = row?.querySelector('.chev');
  const closeButton = item.querySelector('.faq-close');

  if (!row || !arrow) return;

  const closeItem = () => {
    item.classList.remove('open');
    row.setAttribute('aria-expanded', 'false');
    arrow.src = 'assests/drop_down.png';
  };

  row.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      const otherRow = otherItem.querySelector('.faq-item__row');
      const otherArrow = otherRow?.querySelector('.chev');

      otherItem.classList.remove('open');
      otherRow?.setAttribute('aria-expanded', 'false');
      if (otherArrow) otherArrow.src = 'assests/drop_down.png';
    });

    if (!isOpen) {
      item.classList.add('open');
      row.setAttribute('aria-expanded', 'true');
      arrow.src = 'assests/arrow_up.png';
    }
  });

  closeButton?.addEventListener('click', closeItem);
});