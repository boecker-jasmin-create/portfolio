const centeredSections = Array.from(document.querySelectorAll('main > section[id]'));

const CENTER_SCROLL_LOCK_MS = 650;
const SECTION_ENTER_RATIO = 0.45;
const SECTION_EXIT_RATIO = 0.25;
const SCROLL_DIRECTION_DEADZONE = 2;

let isProgrammaticCentering = false;
let suppressCenteringUntil = 0;
let lastCenteredSectionId = '';
let scrollTicking = false;
let pendingCenterTimer = null;
let lastScrollY = window.scrollY;
let scrollDirection = 0;

const suppressCentering = (ms) => {
	suppressCenteringUntil = Date.now() + ms;
};

const getSectionVisibilityRatio = (section) => {
	const rect = section.getBoundingClientRect();
	const visibleTop = Math.max(rect.top, 0);
	const visibleBottom = Math.min(rect.bottom, window.innerHeight);
	const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
	if (visibleHeight <= 0 || rect.height <= 0) {
		return 0;
	}
	return visibleHeight / rect.height;
};

const getSectionIndexById = (sectionId) => centeredSections.findIndex((section) => section.id === sectionId);

const getMostVisibleSection = (minRatio = 0) => {
	let bestSection = null;
	let bestRatio = minRatio;

	centeredSections.forEach((section) => {
		const ratio = getSectionVisibilityRatio(section);
		if (ratio >= bestRatio) {
			bestRatio = ratio;
			bestSection = section;
		}
	});

	return bestSection;
};

const getTriggeredSection = () => {
	if (centeredSections.length === 0) {
		return null;
	}

	if (!lastCenteredSectionId) {
		return getMostVisibleSection(SECTION_ENTER_RATIO);
	}

	const currentIndex = getSectionIndexById(lastCenteredSectionId);
	if (currentIndex === -1) {
		return getMostVisibleSection(SECTION_ENTER_RATIO);
	}

	const currentSection = centeredSections[currentIndex];
	const currentRatio = getSectionVisibilityRatio(currentSection);

	if (currentRatio > SECTION_EXIT_RATIO) {
		return null;
	}

	if (scrollDirection === 0) {
		return null;
	}

	const step = scrollDirection > 0 ? 1 : -1;
	let candidateSection = null;
	let candidateRatio = SECTION_ENTER_RATIO;

	for (let index = currentIndex + step; index >= 0 && index < centeredSections.length; index += step) {
		const section = centeredSections[index];
		const ratio = getSectionVisibilityRatio(section);
		if (ratio >= candidateRatio) {
			candidateRatio = ratio;
			candidateSection = section;
		}
	}

	return candidateSection;
};

const centerSection = (section) => {
	const rect = section.getBoundingClientRect();
	const targetY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
	const clampedTargetY = Math.max(targetY, 0);
	const delta = Math.abs(window.scrollY - clampedTargetY);

	if (delta < 24) {
		return;
	}

	isProgrammaticCentering = true;
	lastCenteredSectionId = section.id;
	window.scrollTo({
		top: clampedTargetY,
		behavior: 'smooth'
	});

	window.setTimeout(() => {
		isProgrammaticCentering = false;
	}, CENTER_SCROLL_LOCK_MS);
};

const runCentering = () => {
	if (isProgrammaticCentering) {
		return;
	}

	const now = Date.now();
	if (now < suppressCenteringUntil) {
		if (pendingCenterTimer) {
			window.clearTimeout(pendingCenterTimer);
		}
		pendingCenterTimer = window.setTimeout(() => {
			pendingCenterTimer = null;
			runCentering();
		}, suppressCenteringUntil - now + 20);
		return;
	}

	const section = getTriggeredSection();
	if (!section) {
		return;
	}
	if (section.id === lastCenteredSectionId) {
		return;
	}

	centerSection(section);
};

const onScroll = () => {
	const currentScrollY = window.scrollY;
	const delta = currentScrollY - lastScrollY;
	if (Math.abs(delta) > SCROLL_DIRECTION_DEADZONE) {
		scrollDirection = delta > 0 ? 1 : -1;
	}
	lastScrollY = currentScrollY;

	if (scrollTicking) {
		return;
	}

	scrollTicking = true;
	window.requestAnimationFrame(() => {
		runCentering();
		scrollTicking = false;
	});
};

if (centeredSections.length > 0) {
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('portfolio:navigation-start', () => {
		suppressCentering(1600);
		scrollDirection = 0;
		if (pendingCenterTimer) {
			window.clearTimeout(pendingCenterTimer);
			pendingCenterTimer = null;
		}
	});

	const initialSection = getMostVisibleSection();
	if (initialSection) {
		lastCenteredSectionId = initialSection.id;
	}
}


