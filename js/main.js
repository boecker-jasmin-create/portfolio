const navbar = document.querySelector('#mainNavbar');
const mainNavbarList = document.querySelector('#mainNavbarList');
const navLinks = mainNavbarList ? mainNavbarList.querySelectorAll('.nav-link[href^="#"]') : [];
const sections = Array.from(document.querySelectorAll('main > section[id]'));
const navOffset = 120;

const setActiveLink = (targetId) => {
	navLinks.forEach((link) => {
		const isActive = link.getAttribute('href') === `#${targetId}`;
		link.classList.toggle('active', isActive);
		if (isActive) {
			link.setAttribute('aria-current', 'page');
		} else {
			link.removeAttribute('aria-current');
		}
	});
};

const scrollToTarget = (targetId) => {
	const target = document.getElementById(targetId);
	if (!target) {
		return;
	}

	const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
	window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
};

if (window.bootstrap && navbar) {
	bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
		target: '#mainNavbar',
		offset: navOffset
	});
}

let collapseInstance = null;
if (window.bootstrap && navbar) {
	collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbar, { toggle: false });
}

navLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		const href = link.getAttribute('href');
		if (!href || !href.startsWith('#')) {
			return;
		}

		event.preventDefault();
		const targetId = href.slice(1);
		setActiveLink(targetId);
		window.dispatchEvent(new CustomEvent('portfolio:navigation-start'));
		scrollToTarget(targetId);

		if (collapseInstance && navbar.classList.contains('show')) {
			collapseInstance.hide();
		}
	});
});

if (sections.length > 0 && navLinks.length > 0) {
	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

			if (visible.length > 0) {
				setActiveLink(visible[0].target.id);
			}
		},
		{
			root: null,
			rootMargin: `-${navOffset}px 0px -45% 0px`,
			threshold: [0.2, 0.4, 0.6]
		}
	);

	sections.forEach((section) => observer.observe(section));
}

const reducedMotionPreferred = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealSelector = [
	'h1',
	'h2',
	'h3',
	'p',
	'.btn',
	'.showcase-stage',
	'.contact-step',
	'.contact-result',
	'form'
].join(', ');

const sectionRevealTargets = sections.map((section) => {
	const targets = Array.from(section.querySelectorAll(revealSelector)).filter(
		(target) => !target.closest('#showcaseDetailModal') && !target.closest('.flip-card')
	);

	targets.forEach((target, index) => {
		target.classList.add('reveal-on-scroll');
		target.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
	});

	return { section, targets };
});

if (reducedMotionPreferred) {
	sectionRevealTargets.forEach(({ targets }) => {
		targets.forEach((target) => {
			target.classList.add('is-visible');
		});
	});
} else {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const matchedSection = sectionRevealTargets.find(({ section }) => section === entry.target);
				if (matchedSection) {
					window.requestAnimationFrame(() => {
						matchedSection.targets.forEach((target) => {
							target.classList.add('is-visible');
						});
					});
				}

				observer.unobserve(entry.target);
			});
		},
		{
			root: null,
			threshold: 0.2,
			rootMargin: '0px 0px -12% 0px'
		}
	);

	sectionRevealTargets.forEach(({ section }) => {
		revealObserver.observe(section);
	});
}
