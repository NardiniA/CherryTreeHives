window.addEventListener('DOMContentLoaded', () => {
	emailjs.init("user_pwnrSymGTUtZ4MVyEqwmT");

	let formValid = {
		name: false,
		subject: false,
		email: false,
		item: false,
		msg: false,
	};

	// Validate on Typing
	document.querySelectorAll(".form__input").forEach((input) => {
		input.addEventListener("input", function () {
			if (input.value !== "" || input.value.length !== 0) {
				// Validate on input and show errors, if any.
				const valid = validate(input);
				if (!valid[0]) {
					showError(input.parentNode, valid[1]);
					formValid[input.id] = false;
				} else {
					removeError(input.parentNode);
					formValid[input.id] = true;
				}
			} else {
				// If empty remove errors
				removeError(input.parentNode);
			}

			// All Inputs are valid, then enable form submission
			if (Object.values(formValid).every((item) => item)) {
				document
					.querySelector(".form__button .btn")
					.classList.remove("disabled");
			} else {
				document
					.querySelector(".form__button .btn")
					.classList.add("disabled");
			}
		});
	});

	// Form Submission
	document
		.querySelector("form.form")
		.addEventListener("submit", function (event) {
			// Prevent form from submitting
			event.preventDefault();
			// Remove Errors before processing
			removeAllErrors();

			const form = event.target;
			const groups = form.querySelectorAll(".form__group");
			let data = [];

			// Validate Inputs
			groups.forEach((group) => {
				let input = group.querySelector(".form__input");
				let valid = validate(input);
				if (!valid[0]) {
					// Invalid Inputs
					data.push({
						valid: false,
						value: input.value,
					});
					// Show Errors
					showError(group, valid[1]);
				} else {
					// Valid Inputs
					data.push({
						valid: true,
						value: input.value,
					});
					// Remove Any Errors
					removeError(group);
				}
			});

			// Check all inputs are valid
			const formData = data;
			if (
				!formData.every(function (input) {
					return input.valid;
				})
			) {
				return;
			}

			// All inputs are valid; continue
			// Show Progress Spinner
			document.querySelector(".form__button .btn").innerHTML =
				"<div></div>";

			// Send the Email
			emailjs.send("service_4gn38jh", "template_feqr0nx", {
                name: formData[0].value,
                subject: formData[1].value,
                email: formData[2].value,
                phone: formData[3].value,
                message: formData[4].value,
                to: "techteacher.pershore@gmail.com",
            })
            .then(function(response) {
                console.log(response);
                // Show Success
                showNotification("success", "Email Sent!");
            }, function(error) {
                console.error(error);
                // Show Notification Error
                showNotification("error", "Unable to send email");
            });

			// Reset Form
			document.querySelector(".form__button .btn").innerHTML =
				"Send Message";
			form.reset();
		});

	// Error Messages
	function showError(group, msg) {
		if (!group.classList.contains("error")) {
			group.classList.add("error");
			let label = group.querySelector(".form__label");
			let l = label.innerHTML;
			label.innerHTML = `${l} 
            <div class="form__message">
                <span>${msg}</span>
                <i class="bx bx-error"></i>
            </div>`;
		}
	}

	function removeError(group) {
		group.classList.remove("error");
		let message = group.querySelector(".form__message");
		if (message) message.remove();
	}

	function removeAllErrors() {
		document.querySelectorAll(".form__group").forEach((g) => {
			g.classList.remove("error");
			let m = g.querySelector(".form__message");
			if (m) m.remove();
		});
	}

	// Validation Functions
	function validate(input) {
		if (!isEmpty(input.value)) return [false, "Field Empty"];
		if (
			!isNaN(input.value) &&
			(input.type !== "number" || input.type !== "phone")
		)
			return [false, "Invalid Field"];
		let reg = regexValidate(input.type, input.value);
		if (!reg[0]) return [false, reg[1]];
		return [true];
	}

	function isEmpty(value) {
		if (value.length === 0 || value === "") return false;
		return true;
	}

	function regexValidate(type, value) {
		if (type === "email") {
			const email_re =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			return [email_re.test(value), "Invalid Email"];
		} else {
			const re = /^[a-zA-Z0-9'-,. ]{2,55}$/;
			return [re.test(value), "Invalid Field"];
		}
	}

	// Notifications
	function showNotification(status, msg) {
		console.log("Creating Notification");
		let notification = document.createElement("div");
		notification.classList.add("notification");

		let icon = "";
		if (status === "success") {
			icon = '<i class="bx bx-check notification__icon"></i>';
			notification.classList.add("success");
		} else if (status === "error") {
			icon = '<i class="bx bx-error-alt notification__icon"></i>';
			notification.classList.add("error");
		}

		notification.innerHTML = `
            <div class="notification__inner">
                <span>
                    ${icon}
                    ${msg}
                </span>
                <i class="bx bx-x notification__close" onClick="hideNotification();"></i>
            </div>
        `;

		let notif = document.body.appendChild(notification);

		setTimeout(function () {
			notif.classList.add("show");
		}, 500);

		setTimeout(() => {
			notif.classList.remove("show");
		}, 5000);
	}

	function hideNotification() {
		document.querySelector(".notification.show").classList.remove("show");
	}
});