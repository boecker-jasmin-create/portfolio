const contactForm = document.querySelector('#contactMultiStepForm');

if (contactForm) {
	const steps = Array.from(contactForm.querySelectorAll('.contact-step'));
	const stepIndicator = contactForm.querySelector('.contact-step-indicator');
	const successResult = contactForm.querySelector('#contactSuccessResult');
	const errorResult = contactForm.querySelector('#contactErrorResult');
	const submitButton = contactForm.querySelector('[data-submit-button]');
	const totalSteps = steps.length;

	const fields = {
		company: contactForm.querySelector('#contactCompany'),
		email: contactForm.querySelector('#contactEmail'),
		message: contactForm.querySelector('#contactMessage')
	};

	const summaryFields = {
		company: contactForm.querySelector('#summaryCompany'),
		email: contactForm.querySelector('#summaryEmail'),
		message: contactForm.querySelector('#summaryMessage')
	};

	let currentStep = 1;
	let isSubmitting = false;

	const setFieldError = (field, message) => {
		const feedback = field.nextElementSibling;
		field.classList.add('is-invalid');
		if (feedback) {
			feedback.textContent = message;
		}
	};

	const clearFieldError = (field) => {
		field.classList.remove('is-invalid');
		const feedback = field.nextElementSibling;
		if (feedback) {
			feedback.textContent = '';
		}
	};

	const validateStep = (step) => {
		if (step === 1) {
			let isValid = true;

			const companyValue = fields.company.value.trim();
			if (companyValue.length < 2) {
				setFieldError(fields.company, 'Bitte geben Sie einen gültigen Firmennamen ein (mindestens 2 Zeichen).');
				isValid = false;
			} else {
				clearFieldError(fields.company);
			}

			const emailValue = fields.email.value.trim();
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(emailValue)) {
				setFieldError(fields.email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
				isValid = false;
			} else {
				clearFieldError(fields.email);
			}

			return isValid;
		}

		if (step === 2) {
			const value = fields.message.value.trim();
			if (value.length < 10) {
				setFieldError(fields.message, 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.');
				return false;
			}
			clearFieldError(fields.message);
			return true;
		}

		return true;
	};

	const updateSummary = () => {
		summaryFields.company.textContent = fields.company.value.trim();
		summaryFields.email.textContent = fields.email.value.trim();
		summaryFields.message.textContent = fields.message.value.trim();
	};

	const hideResults = () => {
		if (successResult) {
			successResult.classList.add('d-none');
		}
		if (errorResult) {
			errorResult.classList.add('d-none');
		}
	};

	const showResult = (type) => {
		steps.forEach((stepElement) => {
			stepElement.classList.add('d-none');
		});

		if (stepIndicator) {
			stepIndicator.classList.add('d-none');
		}

		hideResults();

		if (type === 'success' && successResult) {
			successResult.classList.remove('d-none');
		}

		if (type === 'error' && errorResult) {
			errorResult.classList.remove('d-none');
		}
	};

	const showStep = (step) => {
		hideResults();

		steps.forEach((stepElement) => {
			const stepNumber = Number(stepElement.getAttribute('data-step'));
			stepElement.classList.toggle('d-none', stepNumber !== step);
		});

		currentStep = step;
		if (stepIndicator) {
			stepIndicator.classList.remove('d-none');
			stepIndicator.textContent = `Schritt ${step} von ${totalSteps}`;
		}
	};

	const validateAll = () => validateStep(1) && validateStep(2);

	const sendFormData = async () => {
		const action = contactForm.getAttribute('action');
		const method = (contactForm.getAttribute('method') || 'POST').toUpperCase();

		if (!action) {
			await new Promise((resolve) => {
				window.setTimeout(resolve, 350);
			});
			return;
		}

		const response = await fetch(action, {
			method,
			body: new FormData(contactForm)
		});

		if (!response.ok) {
			throw new Error('Übertragungsfehler');
		}
	};

	const submitForm = async () => {
		if (isSubmitting) {
			return;
		}

		if (!validateAll()) {
			if (!validateStep(1)) {
				showStep(1);
				return;
			}
			if (!validateStep(2)) {
				showStep(2);
				return;
			}
		}

		isSubmitting = true;
		if (submitButton) {
			submitButton.disabled = true;
			submitButton.textContent = 'Sende...';
		}

		try {
			await sendFormData();
			showResult('success');
		} catch (error) {
			showResult('error');
		} finally {
			isSubmitting = false;
			if (submitButton) {
				submitButton.disabled = false;
				submitButton.textContent = 'Absenden';
			}
		}
	};

	const resetForm = () => {
		contactForm.reset();
		Object.values(fields).forEach((field) => clearFieldError(field));
		updateSummary();
		showStep(1);
	};

	contactForm.addEventListener('click', (event) => {
		const nextButton = event.target.closest('[data-next-step]');
		const prevButton = event.target.closest('[data-prev-step]');
		const retryButton = event.target.closest('[data-retry-submit]');
		const backSummaryButton = event.target.closest('[data-back-summary]');
		const resetButton = event.target.closest('[data-reset-form]');

		if (nextButton) {
			if (!validateStep(currentStep)) {
				return;
			}

			if (currentStep === 2) {
				updateSummary();
			}

			showStep(Math.min(currentStep + 1, totalSteps));
		}

		if (prevButton) {
			showStep(Math.max(currentStep - 1, 1));
		}

		if (retryButton) {
			submitForm();
		}

		if (backSummaryButton) {
			showStep(3);
		}

		if (resetButton) {
			resetForm();
		}
	});

	Object.values(fields).forEach((field) => {
		field.addEventListener('input', () => {
			clearFieldError(field);
		});
	});

	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();
		submitForm();
	});
}
