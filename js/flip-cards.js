const flipCards = document.querySelectorAll('.flip-card');

const syncFlipCardHeight = (card) => {
	const inner = card.querySelector('.flip-card-inner');
	const front = card.querySelector('.flip-card-front');
	const back = card.querySelector('.flip-card-back');

	if (!inner || !front || !back) {
		return;
	}

	const frontHeight = front.scrollHeight;
	const backHeight = back.scrollHeight;
	const targetHeight = Math.max(frontHeight, backHeight);

	card.style.minHeight = `${targetHeight}px`;
	inner.style.minHeight = `${targetHeight}px`;
};

const syncAllFlipCardHeights = () => {
	// Auf Desktop: alle Karten gleich hoch
	const isDesktop = window.matchMedia('(min-width: 768px)').matches;

	if (isDesktop) {
		let globalMaxHeight = 0;

		flipCards.forEach((card) => {
			const front = card.querySelector('.flip-card-front');
			const back = card.querySelector('.flip-card-back');

			if (!front || !back) {
				return;
			}

			const cardMaxHeight = Math.max(front.scrollHeight, back.scrollHeight);
			globalMaxHeight = Math.max(globalMaxHeight, cardMaxHeight);
		});

		flipCards.forEach((card) => {
			const inner = card.querySelector('.flip-card-inner');
			if (!inner || globalMaxHeight === 0) {
				return;
			}

			card.style.minHeight = `${globalMaxHeight}px`;
			inner.style.minHeight = `${globalMaxHeight}px`;
		});
	} else {
		// Auf Mobile: jede Karte individuell
		flipCards.forEach((card) => {
			syncFlipCardHeight(card);
		});
	}
};

syncAllFlipCardHeights();
window.addEventListener('resize', syncAllFlipCardHeights);

flipCards.forEach((card) => {
	card.addEventListener('click', () => {
		const isFlipped = card.classList.toggle('is-flipped');
		card.setAttribute('aria-pressed', String(isFlipped));
		syncFlipCardHeight(card);
	});

	card.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			const isFlipped = card.classList.toggle('is-flipped');
			card.setAttribute('aria-pressed', String(isFlipped));
			syncFlipCardHeight(card);
		}
	});
});
