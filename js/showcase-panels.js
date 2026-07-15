const showcaseTabs = document.querySelectorAll('[data-showcase-panel]');
const showcasePanels = document.querySelectorAll('.showcase-panel');
const showcaseData = window.showcaseData || {};
const mainFixedNavbar = document.querySelector('header .navbar.fixed-top');
const showcaseSubmenuElement = document.querySelector('#showcaseSubmenu');
const detailModalElement = document.getElementById('showcaseDetailModal');
const detailModalTitle = document.getElementById('showcaseDetailModalLabel');
const detailModalBody = document.getElementById('showcaseDetailModalBody');
let detailModalInstance = null;
let activeShowcasePanel = document.querySelector('.showcase-panel.is-active');
const fluidLayoutTypes = new Set(['iframe', 'iframe-srcdoc', 'image', 'video', 'code']);

const updateDetailModalViewportOffsets = () => {
	if (!detailModalElement) {
		return;
	}

	const topOffset = (mainFixedNavbar ? mainFixedNavbar.offsetHeight : 0) + 12;
	const submenuVisible = showcaseSubmenuElement && !showcaseSubmenuElement.classList.contains('d-none');
	const submenuHeight = submenuVisible ? showcaseSubmenuElement.offsetHeight : 0;
	const bottomOffset = (submenuHeight > 0 ? submenuHeight : 0) + 12;

	detailModalElement.style.setProperty('--showcase-modal-top-offset', `${topOffset}px`);
	detailModalElement.style.setProperty('--showcase-modal-bottom-offset', `${bottomOffset}px`);
};

const createElement = (tag, className, text) => {
	const element = document.createElement(tag);
	if (className) {
		element.className = className;
	}
	if (typeof text === 'string') {
		element.textContent = text;
	}
	return element;
};

const setActiveShowcaseTab = (activePanelId) => {
	showcaseTabs.forEach((tab) => {
		const isActiveTab = tab.getAttribute('data-showcase-panel') === activePanelId;
		tab.classList.toggle('active', isActiveTab);
		if (isActiveTab) {
			tab.setAttribute('aria-current', 'page');
		} else {
			tab.removeAttribute('aria-current');
		}
	});
};

const getBlockDimensions = (block) => {
	const width = Number(block.width || 0);
	const height = Number(block.height || 0);

	if (width > 0 && height > 0) {
		return { width, height };
	}

	const sizeFromTitle = (block.title || '').match(/(\d{2,4})\s*[x×]\s*(\d{2,4})/i);
	if (sizeFromTitle) {
		return {
			width: Number(sizeFromTitle[1]),
			height: Number(sizeFromTitle[2])
		};
	}

	return null;
};

const getDetailCellClassName = (block) => {
	if (block.columns === 3) {
		return 'showcase-detail-cell--third';
	}

	if (!fluidLayoutTypes.has(block.type)) {
		return 'showcase-detail-cell--full';
	}

	if (block.type === 'code' || block.type === 'image') {
		return 'showcase-detail-cell--full';
	}

	const dimensions = getBlockDimensions(block);
	if (!dimensions) {
		return 'showcase-detail-cell--wide';
	}

	const ratio = dimensions.width / dimensions.height;
	if (ratio >= 2.2 || dimensions.width >= 700) {
		return 'showcase-detail-cell--full';
	}

	if (ratio >= 1.25) {
		return 'showcase-detail-cell--wide';
	}

	return 'showcase-detail-cell--compact';
};

const renderModalBlock = (block) => {
	const wrapper = createElement('section', `showcase-detail-block ${getDetailCellClassName(block)}`);

	if (block.title) {
		wrapper.appendChild(createElement('h5', 'mb-2', block.title));
	}

	if (block.type === 'text') {
		wrapper.appendChild(createElement('p', 'mb-0', block.content || ''));
		return wrapper;
	}

	if (block.type === 'image') {
		const image = createElement('img', 'img-fluid rounded border');
		image.src = block.src || '';
		image.alt = block.title || 'Vorschau';
		wrapper.appendChild(image);
		return wrapper;
	}

	if (block.type === 'video') {
		const video = createElement('video', 'w-100 rounded border');
		video.controls = true;
		video.preload = 'metadata';
		if (block.poster) {
			video.poster = block.poster;
		}
		const source = createElement('source');
		source.src = block.src || '';
		source.type = 'video/mp4';
		video.appendChild(source);
		wrapper.appendChild(video);
		return wrapper;
	}

	if (block.type === 'iframe-srcdoc' || block.type === 'iframe') {
		const frame = createElement('iframe', 'showcase-detail-banner-frame w-100 bg-white');
		frame.loading = 'lazy';
		frame.referrerPolicy = 'no-referrer';
		frame.setAttribute('scrolling', block.responsive ? 'yes' : 'no');

		const dimensions = getBlockDimensions(block);
		if (dimensions) {
			wrapper.classList.add('showcase-detail-block--banner');

			const shell = createElement('div', 'showcase-detail-banner-shell');
			shell.style.width = `${dimensions.width}px`;
			shell.style.height = `${dimensions.height}px`;

			frame.width = String(dimensions.width);
			frame.height = String(dimensions.height);
			frame.style.width = '100%';
			frame.style.height = '100%';

			frame.setAttribute('title', block.title || 'Embed Vorschau');
			if (block.type === 'iframe-srcdoc') {
				frame.srcdoc = block.srcdoc || '';
				frame.setAttribute('sandbox', 'allow-scripts');
			} else {
				frame.src = block.src || '';
			}

			shell.appendChild(frame);
			wrapper.appendChild(shell);
			return wrapper;
		} else if (block.responsive) {
			wrapper.classList.add('showcase-detail-block__responsive-iframe');
		} else {
			frame.style.height = `${block.height || 320}px`;
		}

		frame.setAttribute('title', block.title || 'Embed Vorschau');
		if (block.type === 'iframe-srcdoc') {
			frame.srcdoc = block.srcdoc || '';
			frame.setAttribute('sandbox', 'allow-scripts');
		} else {
			frame.src = block.src || '';
		}
		wrapper.appendChild(frame);
		return wrapper;
	}

	if (block.type === 'code') {
		const pre = createElement('pre', 'bg-dark text-light rounded p-3 mb-0');
		const code = createElement('code', block.language ? `language-${block.language}` : '');
		code.textContent = block.content || '';
		pre.appendChild(code);
		wrapper.appendChild(pre);
		return wrapper;
	}

	if (block.type === 'link') {
		const link = createElement('a', 'btn btn-primary btn-lg w-100');
		link.href = block.href || '#';
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		link.textContent = block.text || 'Besuchen';
		wrapper.appendChild(link);
		return wrapper;
	}

	wrapper.appendChild(createElement('p', 'mb-0', 'Keine darstellbaren Details vorhanden.'));
	return wrapper;
};

const openShowcaseDetail = (panelId, itemIndex) => {
	const panelData = showcaseData[panelId];
	if (!panelData || !Array.isArray(panelData.items)) {
		return;
	}

	const item = panelData.items[itemIndex];
	if (!item || !detailModalElement || !detailModalTitle || !detailModalBody) {
		return;
	}

	detailModalTitle.textContent = item.title || panelData.title || 'Details';
	detailModalBody.innerHTML = '';

	if (item.teaser) {
		detailModalBody.appendChild(createElement('p', 'text-body-secondary', item.teaser));
	}

	const detailGrid = createElement('div', 'showcase-detail-grid');
	(item.detailBlocks || []).forEach((block) => {
		detailGrid.appendChild(renderModalBlock(block));
	});
	detailModalBody.appendChild(detailGrid);

	if (window.bootstrap) {
		updateDetailModalViewportOffsets();
		detailModalInstance = detailModalInstance || new bootstrap.Modal(detailModalElement);
		detailModalInstance.show();
	}
};

const renderShowcasePanels = () => {
	showcasePanels.forEach((panel) => {
		const panelData = showcaseData[panel.id];
		if (!panelData || !Array.isArray(panelData.items)) {
			return;
		}

		panel.innerHTML = '';

		const content = createElement('div', 'container showcase-panel-content');
		content.appendChild(createElement('h2', 'mb-2 font-decorative', panelData.title || 'Showcase'));
		if (panelData.intro) {
			content.appendChild(createElement('p', 'showcase-panel-intro mb-3', panelData.intro));
		}

		const list = createElement('div', 'showcase-panel-list');
		const grid = createElement('div', 'row g-3');

		panelData.items.forEach((item, index) => {
			const col = createElement('div', 'col-12 col-md-6');
			const cardButton = createElement('button', 'showcase-item-card card h-100 w-100 text-start border-0 p-0 shadow-sm');
			cardButton.type = 'button';
			cardButton.addEventListener('click', () => openShowcaseDetail(panel.id, index));

			if (item.thumbnail) {
				const image = createElement('img', 'card-img-top showcase-item-image');
				image.src = item.thumbnail;
				image.alt = `${item.title || 'Projekt'} Vorschau`;
				cardButton.appendChild(image);
			}

			const body = createElement('div', 'card-body border-top');
			body.appendChild(createElement('h3', 'h5 card-title', item.title || 'Projekt'));
			body.appendChild(createElement('p', 'card-text mb-0', item.teaser || 'Hier klicken für mehr Details.'));
			cardButton.appendChild(body);

			col.appendChild(cardButton);
			grid.appendChild(col);
		});

		list.appendChild(grid);
		content.appendChild(list);
		panel.appendChild(content);
	});
};

if (showcasePanels.length > 0) {
	renderShowcasePanels();

	if (!activeShowcasePanel) {
		activeShowcasePanel = showcasePanels[0];
		activeShowcasePanel.classList.add('is-active');
	}

	showcasePanels.forEach((panel) => {
		if (panel !== activeShowcasePanel) {
			panel.classList.remove('is-active', 'is-prev');
			panel.classList.add('is-next');
		}
	});

	setActiveShowcaseTab(activeShowcasePanel.id);
}

const switchShowcasePanel = (nextPanelId) => {
	const nextPanel = document.getElementById(nextPanelId);

	if (!nextPanel || nextPanel === activeShowcasePanel) {
		return;
	}

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	setActiveShowcaseTab(nextPanelId);

	showcasePanels.forEach((panel) => {
		if (panel !== activeShowcasePanel && panel !== nextPanel) {
			panel.classList.remove('is-active', 'is-prev');
			panel.classList.add('is-next');
		}
	});

	if (reducedMotion) {
		if (activeShowcasePanel) {
			activeShowcasePanel.classList.remove('is-active', 'is-prev');
			activeShowcasePanel.classList.add('is-next');
		}
		nextPanel.classList.remove('is-next', 'is-prev');
		nextPanel.classList.add('is-active');
		activeShowcasePanel = nextPanel;
		return;
	}

	nextPanel.classList.remove('is-active', 'is-prev');
	nextPanel.classList.add('is-next');

	requestAnimationFrame(() => {
		if (activeShowcasePanel) {
			activeShowcasePanel.classList.remove('is-active');
			activeShowcasePanel.classList.add('is-prev');
		}

		nextPanel.classList.remove('is-next');
		nextPanel.classList.add('is-active');
		activeShowcasePanel = nextPanel;
	});
};

showcaseTabs.forEach((tab) => {
	tab.addEventListener('click', (event) => {
		const nextPanelId = tab.getAttribute('data-showcase-panel');
		if (!nextPanelId || !document.getElementById(nextPanelId)) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		switchShowcasePanel(nextPanelId);
	});
});

updateDetailModalViewportOffsets();
window.addEventListener('resize', updateDetailModalViewportOffsets);

if (showcaseSubmenuElement) {
	const submenuObserver = new MutationObserver(updateDetailModalViewportOffsets);
	submenuObserver.observe(showcaseSubmenuElement, { attributes: true, attributeFilter: ['class'] });
}
