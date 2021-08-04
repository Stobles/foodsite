"use strict"

const lazyImages = document.querySelectorAll('[data-src]')
const loadMapBlock = document.querySelector('[data-map]')
const windowH = document.documentElement.clientHeight

let lazyImagesPositions = []

if (lazyImages.length > 0){
    lazyImages.forEach(img =>{
        if(img.dataset.src){
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset)
            lazyScrollCheck()
        }
    })
}

window.addEventListener('scroll', lazyScroll)
window.addEventListener('load', lazyScroll)
window.addEventListener('resize', lazyScroll)


function lazyScroll() {
    if(document.querySelectorAll('[data-src]').length > 0){
        lazyScrollCheck()
    }
    if(!loadMapBlock.classList.contains('_loaded')){
        getMap()
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowH
    )
    if(imgIndex >= 0){
        if(lazyImages[imgIndex].dataset.src){
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src
            lazyImages[imgIndex].removeAttribute('data-src')
        }
    }
    delete lazyImagesPositions[imgIndex]
    
}

function getMap() {
    const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;
    if(pageYOffset > loadMapBlockPos - windowH){
        const loadMapUrl = loadMapBlock.dataset.map
        if(loadMapUrl){
            loadMapBlock.insertAdjacentHTML(
                "beforeend",
                `<iframe src="${loadMapUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
            );
            loadMapBlock.classList.add('_loaded');
        }
    }
    
}
