const showcaseSection = document.querySelector('#showcase');
const showcaseSubmenu = document.querySelector('#showcaseSubmenu');

if (showcaseSection && showcaseSubmenu) {
	const showcaseObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					showcaseSubmenu.classList.remove('d-none');
					const activePanel = document.querySelector('.showcase-panel.is-active');
					if (activePanel) {
						showcaseSubmenu.querySelectorAll('[data-showcase-panel]').forEach((tab) => {
							tab.classList.toggle('active', tab.getAttribute('data-showcase-panel') === activePanel.id);
						});
					}
				} else {
					showcaseSubmenu.classList.add('d-none');
				}
			});
		},
		{ threshold: 0.35 }
	);

	showcaseObserver.observe(showcaseSection);
}
