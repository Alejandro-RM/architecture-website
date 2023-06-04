'use strict';

// TODO: Add code to fetch data and update DOM
const fetch_size_image_gallery = 6;
const fetch_size_carousel = 10;
let last_image_gallery_id = 0;
let last_carousel = 0;

function updateBuildingsData() {
    axios.get('/buildings/data', {
		params: {
			start: last_image_gallery_id,
			end: last_image_gallery_id + fetch_size_image_gallery
		}
	}).then((response) => {
		if(response.data.length == 0) {
			last_image_gallery_id = 0;
			updateBuildingsData();
			return;
		}

		let image_gallery = document.getElementById('image-gallery');
		image_gallery.innerHTML = '';
		for(let building of response.data) {
			let image_gallery_item = document.createElement('div');
			image_gallery_item.classList.add('card', 'col', 'p-2');

			let image_gallery_item_link = document.createElement('a');
			image_gallery_item_link.href = `/buildings/${building._id}`;

			let image_gallery_item_image = document.createElement('img');
			image_gallery_item_image.classList.add('card-img-top');
			image_gallery_item_image.src = building.images_paths[0] ? building.images_paths[0] : '/placeholder-image.webp';

			image_gallery_item_link.appendChild(image_gallery_item_image);
			image_gallery_item.appendChild(image_gallery_item_link);

			let image_gallery_item_body = document.createElement('div');
			image_gallery_item_body.classList.add('card-footer', 'd-flex', 'justify-content-between', 'align-items-center');

			let image_footer = document.createElement('p');
			image_footer.classList.add('card-text');
			image_footer.innerHTML = building.name;

			image_gallery_item_body.appendChild(image_footer);
			image_gallery_item.appendChild(image_gallery_item_body);

			image_gallery.appendChild(image_gallery_item);
		}
		last_image_gallery_id += fetch_size_image_gallery;
	});
}

updateBuildingsData();
setInterval(updateBuildingsData, 10000);