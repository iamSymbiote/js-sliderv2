const carousel = document.querySelector('.carousel');
firstImage = carousel.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, prevPageX, prevScrollLeft;


const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft > 0 ? 'block' : 'none';
    // if (carousel.scrollLeft > 0) {
    //     arrowIcons[0].style.display = 'block';
    // } else {
    //     arrowIcons[0].style.display = 'none';
    // }

    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block';
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImage.clientWidth + 14; // ilk img'in widthini alip 14 margin ekleme
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
        });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX; 
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carousel.classList.add('dragging');
    // carousel.scrollLeft = e.pageX; //horizontal deger icin X
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);