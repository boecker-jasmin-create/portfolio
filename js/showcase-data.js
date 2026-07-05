const createPreviewSvg = (title, accent = '#408266') => {
	const safeTitle = String(title || '').replace(/[&<>"']/g, '');
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${accent}'/><stop offset='100%' stop-color='#ffebe7'/></linearGradient></defs><rect width='1200' height='675' fill='url(#g)'/><rect x='36' y='36' width='1128' height='603' rx='24' fill='rgba(255,255,255,.22)'/><text x='60' y='110' fill='#ffffff' font-size='52' font-family='Arial, sans-serif' font-weight='700'>${safeTitle}</text><text x='60' y='160' fill='#ffffff' font-size='28' font-family='Arial, sans-serif'>Vorschau</text></svg>`;
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

window.showcaseData = {
	'showcase-html5-panel': {
		title: 'HTML5 Banner',
		intro: 'HTML5 Banner mit flüssigen animationen und guter Performence.',
		
		items: [
			{
				title: 'Politik trifft Praxis – Stream',
				thumbnail: 'image/thumbnails/ptp.webp',
				detailBlocks: [
					{
						type: 'iframe',
						title: 'Billboard 970x250',
						height: 250,
                        width: 970,
						src: 'showcase/ptp-251202/billboard/index.html'
					},
					{
						type: 'iframe',
						title: 'Medium Rectangle 300x250',
						height: 250,
                        width: 300,
						src: 'showcase/ptp-251202/medrec/index.html'
					},
					{
						type: 'iframe',
						title: 'Halfpage 300x600',
						height: 600,
                        width: 300,
						src: 'showcase/ptp-251202/halfpage/index.html'
					},
					{
						type: 'iframe',
						title: 'Maxi Rectangle 620x465',
						height: 465,
                        width: 620,
						src: 'showcase/ptp-251202/maxrec/index.html'
					},
					
				]
			},
			{
				title: 'Wochenblatt – Upgrade',
				thumbnail: 'image/thumbnails/lwb.webp',
				detailBlocks: [
					{
						type: 'iframe',
						title: 'Billboard 970x250',
						height: 250,
                        width: 970,
						src: 'showcase/wocheblatt-upgrade/billboard/index.html'
					},
					{
						type: 'iframe',
						title: 'Medium Rectangle 300x250',
						height: 250,
                        width: 300,
						src: 'showcase/wocheblatt-upgrade/med-rec/index.html'
					},
					{
						type: 'iframe',
						title: 'Halfpage 300x600',
						height: 600,
                        width: 300,
						src: 'showcase/wocheblatt-upgrade/halfpage/index.html'
					},
					{
						type: 'iframe',
						title: 'Leaderboard 728x90',
						height: 90,
                        width: 728,
						src: 'showcase/wocheblatt-upgrade/leaderboard/index.html'
					},
					
				]
			},
		]
	},
	'showcase-social-media-panel': {
		title: 'Social Media',
		intro: 'Ads und Visuals für Feed, Story und Reels in kanalübergreifenden Kampagnen.',
		items: [
			{
				title: 'profi - Erntekampagne Story Ads',
				teaser: 'Erste Ausarbeitung meiner Ideen für die Kampagne',
				thumbnail: 'image/thumbnails/profi.webp',
				detailBlocks: [
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_angebot-tasche_cool.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_angebot-tasche_cool-plain.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_angebot-tasche_gut-versorgt.jpg'
					},
										{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_blau-beton_icons.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_druck-1.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_ernte-erfolg_grasernte.jpg'
					},
										{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_keyvisual-2.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_praemie-gratis.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_praemie-heft.jpg'
					},
										{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_profis_getreideernte.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_rot-schrift-highlight.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_tank-3.jpg'
					},
										{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_tau.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/profi-ernte-0526/1440x2560_upgrade.jpg'
					}
				]
			},
			{
				title: 'matsch Schulstart – Social Media Ads',
				teaser: 'Ads in verschiedenen Formaten für Instagram, Facebook und Google PMax.',
				thumbnail: 'image/thumbnails/matsch.webp',
				detailBlocks: [
					{
						type: 'video',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1440x2560.mp4'
					},
					{
						type: 'video',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1440x1800.mp4'
					},
					{
						type: 'video',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1200x628.mp4'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1440x2560_schulweg_1.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1440x1800_schulweg_1.jpg'
					},
					{
						type: 'image',
						columns: 3,
						src: 'showcase/matsch-schulstart-2026/1200x628_schulweg_1.jpg'
					},

				]
			}
		]
	},
	'showcase-js-animationen-panel': {
		title: 'Webseiten & Landingpages',
		intro: 'Technische Umsetzung mit HTML, CSS und JavaScript oder auf Basis von WordPress bzw. Adobe Commerce.',
		items: [
				{
					title: 'Landwärts - Homepage',
					thumbnail: 'image/thumbnails/landwaerts.webp',
					detailBlocks: [
						{
							type: 'image',
							title: 'Wordpress Webseite',
							src: 'image/Webseiten/landwaerts.webp'
						},
						{
							type: 'link',
							text: 'Webseite besuchen',
							href: 'https://xn--landwrts-4za.com/'
						}
					]
				},
				{
					title: 'Matsch - Schulstart Landingpage',
					thumbnail: 'image/thumbnails/matsch.webp',
					detailBlocks: [
						{
							type: 'image',
							title: 'Adobe Commerce Landingpage',
							src: 'image/Webseiten/matsch.webp'
						},
						{
							type: 'link',
							text: 'Landingpage besuchen',
							href: 'https://shop.matsch-magazin.de/matsch-schulstart-2026-social'
						}
					]
				},
				{
					title: 'profi - Erntekampagne Landingpage',
					thumbnail: 'image/thumbnails/profi.webp',
					detailBlocks: [
						{
							type: 'image',
							title: 'HTML, CSS & Bootstrap Landingpage',
							src: 'image/Webseiten/profi.webp'
						},
						{
							type: 'link',
							text: 'Landingpage besuchen',
							href: 'https://aktion.profi.de/lpV4/themes/ernte_0426/web/index.php'
						}
					]
				},
				{
					title: 'Wochenblatt - Upgrade Landingpage',
					thumbnail: 'image/thumbnails/lwb.webp',
					detailBlocks: [
						{
							type: 'image',
							title: 'HTML, CSS & vue.js Landingpage',
							src: 'image/Webseiten/wochenblatt.webp'
						},
						{
							type: 'link',
							text: 'Landingpage besuchen',
							href: 'https://aktion.wochenblatt.com/lpV4/themes/plus-paket-upgrade_0626/'
						}
					]
				},
			/*{
				title: 'Hero Animation – Parallax Layer',
				teaser: 'Animation-Vorschau plus Editor-Code in einer Detailansicht.',
				thumbnail: createPreviewSvg('JS Animation', '#2a3f6e'),
				detailBlocks: [
					{
						type: 'video',
						title: 'Animation Vorschau',
						src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
					},
					{
						type: 'code',
						title: 'Editor (JavaScript)',
						language: 'javascript',
						content: "const layers = document.querySelectorAll('[data-parallax]');\nwindow.addEventListener('mousemove', (event) => {\n  const x = (event.clientX / window.innerWidth - 0.5) * 12;\n  const y = (event.clientY / window.innerHeight - 0.5) * 12;\n  layers.forEach((layer, index) => {\n    const depth = (index + 1) * 0.6;\n    layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;\n  });\n});"
					}
				]
			},
			{
				title: 'Card Micro Interaction',
				teaser: 'Hover- und Fokusanimation mit guter Accessibility-Basis.',
				thumbnail: createPreviewSvg('Micro Interaction', '#375785'),
				detailBlocks: [
					{
						type: 'text',
						title: 'Projektinfo',
						content: 'Diese Karte ist als Platzhalter gedacht. Du kannst Vorschau und Editor-Code direkt in der Daten-Datei ergänzen.'
					}
				]
			}*/
		]
	}
};
