$(document).ready(function () {
   // Настройки слайдера
   $('.release__slider').slick({
      arrows: true,
      appendArrows: $('.release__arrows'),
      centerMode: false,
      speed: 800,
      slidesToShow: 4,
      focusOnSelect: true,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               centerMode: true,
               centerPadding: '40px',
               slidesToShow: 3
            }
         },
         {
            breakpoint: 768,
            settings: {
               centerPadding: '40px',
               slidesToShow: 2
            }
         },
         {
            breakpoint: 520,
            settings: {
               centerPadding: '40px',
               slidesToShow: 1
            }
         }
      ]
   });
   // Настройки слайдера

   // Замена тега картинок на background
   function ibg() {
      $.each($('.ibg'), function (index, val) {
         const getImgUrl = $(this).find('img').attr('src');
         console.log(`Got Url ${getImgUrl}`);
         if ($(this).find('img').attr('src') != 0) {
            $(this).css('background-image', 'url(' + getImgUrl + ')');
         }
      });
   }
   ibg();
   // Замена тега картинок на background

   // Звездный рейтинг
   if ($(document).find('.popular-item__rating')) {
      initRatings();
   }

   function initRatings() {
      let ratingActive, ratingValue;
      $('.popular-item__rating').each((index, value) => {
         initRating(value);
      })
   }

   function initRating(rating) {
      initratingVars(rating);

      setActiveWidth();

      if ($(rating).hasClass('rating__set')) {
         setRating(rating);
      }
   }

   function initratingVars(rating) {
      ratingActive = $(rating).find('.popular-item__rating-active');
      ratingValue = $(rating).find('.popular-item__rating-value');
   }

   function setActiveWidth(index = ratingValue.text()) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.css('width', `${ratingActiveWidth}%`);
   }

   function setRating(rating) {
      const ratingItems = $(rating).find('.popular-item__rating-item');
      $(ratingItems).each((index, value) => {
         let itemValue = $(value).val();
         $(value).on('mouseenter', function () {
            initratingVars(rating);

            setActiveWidth(itemValue);
         })
         $(value).on('mouseleave', function () {
            initratingVars(rating);

            setActiveWidth();
         })
         $(value).on('click', function () {
            initratingVars(rating);
            if ($(rating).attr('data-ajax') == 'true') {

            } else {
               $(ratingValue).text(itemValue);
               setActiveWidth();
            }
            setActiveWidth();
         })
      })
   }
   // Звездный рейтинг


   // Вешаем класс active при нажатии на бургер
   $('.header__burger').on('click', function () {
      $('.header__burger').toggleClass('active');
      $('.header__menu').toggleClass('active');
      $('body').toggleClass('lock');
   });
   // Вешаем класс active при нажатии на бургер

   // Инициализация пагинации на сайте
   let counter = 1;
   let displayPages = 5;
   let maxPages = 10;
   let PagItems = [];
   let contentOffSet = getCoords(document.querySelector('.content')).top;
   const headerHeight = getHeaderHeight()
   const PaginationBody = document.querySelector('.pagination__body');
   const leftArrow = document.querySelector('._icon-arrow-left');
   const rightArrow = document.querySelector('._icon-arrow-right');

   function initPagination(maxPage, page) {
      let pagInHtml = '';
      if (page > 1) { leftArrow.classList.add('active'); } else { leftArrow.classList.remove('active'); }

      if (page - 2 <= 0) {
         pagInHtml = createPagList(1, page);
      } else if (page - 2 >= 1 && page - 2 < maxPage - displayPages) {
         pagInHtml = createPagList(page - 2, page);
      } else if (maxPage - displayPages >= page - displayPages) {
         pagInHtml = createPagList(maxPage - displayPages, counter);
      }

      if (page < maxPage) { rightArrow.classList.add('active'); } else { rightArrow.classList.remove('active'); }

      PaginationBody.innerHTML = pagInHtml;
      PagItems = document.querySelectorAll('.pagination__item');
      checkPagItem();
   }
   initPagination(maxPages, counter);

   function createPagList(start, active) {
      let pagList = '';
      for (let index = start; index <= start + 5; index++) {
         if (index == active) {
            pagList += `<li class="pagination__item active">${index}</li>`
         } else {
            pagList += `<li class="pagination__item">${index}</li>`
         }
      }
      return pagList;
   }

   leftArrow.addEventListener('click', () => {
      if (counter > 1) { counter-- };
      initPagination(maxPages, counter);
      if (leftArrow.classList.contains('active')) scroll();
   });
   rightArrow.addEventListener('click', () => {
      if (counter < maxPages) {
         counter++;
      }
      initPagination(maxPages, counter);
      if (rightArrow.classList.contains('active')) scroll();
   });

   function checkPagItem() {
      for (let index = 0; index < PagItems.length; index++) {
         const pagItem = PagItems[index];
         pagItem.addEventListener('click', () => {
            counter = pagItem.innerHTML;
            initPagination(maxPages, counter);
            scroll();
         })
      }
   }
   // Инициализация пагинации на сайте

   function getCoords(elem) {
      const rect = elem.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
         top: rect.top + scrollTop,
         left: rect.left + scrollLeft
      };
   }
   function getHeaderHeight() {
      let search = document.querySelector('.search');
      let header = document.querySelector('.header');

      return search.offsetHeight + header.offsetHeight
   }
   function scroll() {
      window.scrollTo({
         top: contentOffSet - headerHeight - 20,
         behavior: 'smooth'
      });
   }

   const animItems = document.querySelectorAll('._anim-item');
   if (animItems.length > 0) {
      function animOnScroll() {
         const winBottomHeight = window.pageYOffset + window.innerHeight;
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemOffset = getCoords(animItem);
            const animCoef = animItem.offsetHeight / 4;

         }
      }
   }

   // Класс active для пагинации на сайте

   // Вложенное меню
   $('.header__link').on('click', function () {
      if ($(this).parent().hasClass('active')) {
         $(this).parent().removeClass('active');
      } else {
         $('.header__li').removeClass('active');
         $(this).parent().toggleClass('active');
      }
   });
   $('.header__li-level1').on('click', function () {
      if ($(this).hasClass('active')) {
         $(this).removeClass('active');
      } else {
         $('.header__li-level1').removeClass('active');
         $(this).toggleClass('active');
      }
   });
   // Вложенное меню



});

