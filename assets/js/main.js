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

const moreGalleryBtn = document.getElementById('galleryViewMoreBtn');
const moreGallery = GLightbox({
	elements: [
		{
			href: "/assets/img/gallery/optimised/work7.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work8.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work9.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work10.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work11.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work12.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work13.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work14.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work15.webp",
			type: "image",
		},
		{
			href: "/assets/img/gallery/optimised/work16.webp",
			type: "image",
		},
	],
});

moreGalleryBtn.addEventListener('click', function() {
	moreGallery.open();
});


/* FAQ
 * ------------------------------------------------------ */
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach(function(item) {
	const accordionHeader = item.querySelector('.questions__header')

	accordionHeader.addEventListener('click', () =>{
		const openItem = document.querySelector('.accordion-open')

		toggleItem(item)

		// if(openItem && openItem!== item){
		//     toggleItem(openItem)
		// }
	})
})

const toggleItem = function(item) {
	const accordionContent = item.querySelector('.questions__content')

	if(item.classList.contains('accordion-open')){
		accordionContent.removeAttribute('style')
		item.classList.remove('accordion-open')
	}else{
		accordionContent.style.height = accordionContent.scrollHeight + 'px'
		item.classList.add('accordion-open')
	}

}

/* HEADER ACTIVE SECTIONS
 * ------------------------------------------------------ */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".header__nav a[href*=" + sectionId + "]")
				.parentElement.classList.add("current");
		} else {
			document
				.querySelector(".header__nav a[href*=" + sectionId + "]")
				.parentElement.classList.remove("current");
		}
	});
}

window.addEventListener("scroll", scrollActive);
