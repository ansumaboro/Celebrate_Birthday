const gallery = document.getElementById("gallery");

for (let i = 0; i <= 170; i++) {
    let img = document.createElement("img");
    // img.src = `images/gallery/img${i}.jpg`;
    img.setAttribute("data-src", `images/gallery/img${i}.jpg`)
    img.classList.add("item");
    gallery.appendChild(img);
}

for (let i=0; i<=9; i++){
    let video = document.createElement("video");
    // video.src = `images/gallery/videos/vdo${i}.mp4`;
    video.setAttribute("data-src", `images/gallery/videos/vid${i}.mp4`)
    video.classList.add("item");
    video.controls = false;
    video.autoplay = true;
    video.muted = true;
    gallery.appendChild(video);
}

gallery.addEventListener("click", (e)=>{
    if(e.target !== gallery){
        window.open(e.target.src, "_blank");
    }
})


const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;

            // Move data-src → src to start loading
            el.src = el.dataset.src;

            observer.unobserve(el); // load only once
        }
    });
};

const observer = new IntersectionObserver(lazyLoad, {
    root: null,
    rootMargin: "0px 0px 200px 0px", // load a bit before visible
    threshold: 0.1
});

// Observe all gallery children
document.querySelectorAll("#gallery .item").forEach(el => {
    observer.observe(el);
});
