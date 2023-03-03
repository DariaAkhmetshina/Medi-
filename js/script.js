"use strict"

//Меню бургер
const iconMenu = document.querySelector('.icon__menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//Аккордеон
document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.accordion');

	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget;
			const control = self.querySelector('.accordion__control');
			const content = self.querySelector('.accordion__content');

			self.classList.toggle('open');

			//Если аккордеон открыт
			if (self.classList.contains('open')) {
				control.setAttribute('aria-expanded', true);
				content.setAttribute('aria-hidden', false);
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				control.setAttribute('aria-expanded', false);
				content.setAttribute('aria-hidden', true);
				content.style.maxHeight = null;
			}
		});
	});
});

//Слайдер

const slider = document.querySelector('#slider')
const sliderItems = Array.from(slider.children);
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');

sliderItems.forEach(function (slide, index) {
	console.log(slide);

	//Скрыть все слайды, кроме первого
	if (index !== 0) {
		slide.classList.add('hidden');
	}

	//Добавляем индексы
	slide.dataset.index = index;

	//Добавляем data атрибут active для первого/активного слайда
	sliderItems[0].setAttribute('data-active', '');

	//Клик по слайдам
	slide.addEventListener('click', function () {

		//Скрыть текущий слайд
		slide.classList.add('hidden');
		slide.removeAttribute('data-active');

		//Рассчет индекса следующего слайда
		let nextSlideIndex;
		if (index + 1 === sliderItems.length) {
			nextSlideIndex = 0;
		} else {
			nextSlideIndex = index + 1;
		}

		//Нахождение следуюшего слайда
		const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);

		//Отображение следующего слайда
		nextSlide.classList.remove('hidden');
		nextSlide.setAttribute('data-active', '');
	})
});

//Событие по клику
btnNext.onclick = function () {
	console.log('Next Slide');

	//Скрываем текущий слайд
	const currentSlide = slider.querySelector('[data-active]')
	const currentSlideIndex = +currentSlide.dataset.index;
	currentSlide.classList.add('hidden');
	currentSlide.removeAttribute('data-active');

	//Показываем следующий слайд
	let nextSlideIndex;
	if (currentSlideIndex + 1 === sliderItems.length) {
		nextSlideIndex = 0;
	} else {
		nextSlideIndex = currentSlideIndex + 1;
	}
	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	nextSlide.classList.remove('hidden');
	nextSlide.setAttribute('data-active', '');
}

btnPrev.onclick = function () {
	console.log('Prev Slide');

	//Скрываем текущий слайд
	const currentSlide = slider.querySelector('[data-active]')
	const currentSlideIndex = +currentSlide.dataset.index;
	currentSlide.classList.add('hidden');
	currentSlide.removeAttribute('data-active');

	//Показываем следующий слайд
	const nextSlideIndex = currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;

	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	nextSlide.classList.remove('hidden');
	nextSlide.setAttribute('data-active', '');
}
