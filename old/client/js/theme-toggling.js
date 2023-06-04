'use strict';
(() => {
	document.getElementById('theme-toggler').addEventListener('click', () => {
		if(document.documentElement.getAttribute('data-bs-theme') == 'dark')
			document.documentElement.setAttribute('data-bs-theme', 'light');
		else
			document.documentElement.setAttribute('data-bs-theme', 'dark');

		document.getElementById('theme-toggler').innerHTML = document.documentElement.getAttribute('data-bs-theme') == 'dark' ?
			'<i class="bi bi-moon"></i>' :
			'<i class="bi bi-sun"></i>';
	});
})();