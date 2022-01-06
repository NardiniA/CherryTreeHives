/* Swiper
 * ------------------------------------------------------ */
const mySwiper = new Swiper(".swiper-container", {
	slidesPerView: 1,
	effect: "fade",
	speed: 2000,
	autoplay: {
		delay: 5000,
	},
});

/* Glightbox
 * ------------------------------------------------------ */
const lightbox = GLightbox({
	selector: ".folio-item__thumb-link",
});