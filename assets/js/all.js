/*----- HEADER -----*/
const hdr = document.querySelector(".header");

window.addEventListener("scroll", function () {
	let loc = window.scrollY;

	if (loc > 50) {
		hdr.classList.add("sticky");
	} else {
		hdr.classList.remove("sticky");
	}

	if (loc > 70) {
		hdr.classList.add("offset");
	} else {
		hdr.classList.remove("offset");
	}

	if (loc > 200) {
		hdr.classList.add("scrolling");
	} else {
		hdr.classList.remove("scrolling");
	}
});

const toggleButton = document.querySelector(".header__menu-toggle");
const mainNavWrap = document.querySelector(".header__nav");
const siteBody = document.querySelector("body");

toggleButton.addEventListener("click", function (event) {
	event.preventDefault();
	toggleButton.classList.toggle("iclicked");
	siteBody.classList.toggle("menu-iopen");
});

mainNavWrap.querySelectorAll(".header__nav a").forEach(function (link) {
	link.addEventListener("click", function (event) {
		// at 800px and below
		if (window.matchMedia("(max-width: 800px)").matches) {
			toggleButton.classList.toggle("iclicked");
			siteBody.classList.toggle("menu-iopen");
		}
	});
});

window.addEventListener("resize", function () {
	// above 800px
	if (window.matchMedia("(min-width: 801px)").matches) {
		if (siteBody.classList.contains("menu-iopen"))
			siteBody.classList.remove("menu-iopen");
		if (toggleButton.classList.contains("iclicked"))
			toggleButton.classList.remove("iclicked");
	}
});
