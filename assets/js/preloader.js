/*----- PRELOADER -----*/
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
	preloader.classList.add("fadeout");
	setTimeout(() => {
		preloader.classList.add("hide");
		document.body.classList.add("intro__show");
	}, 1100);
});
