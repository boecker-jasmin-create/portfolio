const showcaseSection = document.querySelector('#showcase');
const showcaseSubmenu = document.querySelector('#showcaseSubmenu');

if (showcaseSection && showcaseSubmenu) {
	const showcaseObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					showcaseSubmenu.classList.remove('d-none');
				} else {
					showcaseSubmenu.classList.add('d-none');
				}
			});
		},
		{ threshold: 0.35 }
	);

	showcaseObserver.observe(showcaseSection);
}
