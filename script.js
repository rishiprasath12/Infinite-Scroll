const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'TgAJerJ3Qw_nmLyr_dJLVI4lrbePEenyKdToFMjzFsE';

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}


// Helper function
function setAttributes(element,attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// display photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        })

        // create <img> for photos
        const img = document.createElement('img');
        
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // put <a> into <img> and add both to image container
        item.appendChild(img);
        imageContainer.appendChild(item);
        // Event listener,check when each is finished loading
        img.addEventListener('load',imageLoaded)

    });
}





// Get photos from API

async function getPhotos() {
    const responce = await fetch(apiUrl);
    photosArray = await responce.json();
    displayPhotos();
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000  && ready) {
        ready = false;
        getPhotos(); 
    }
})


// Onload

getPhotos();