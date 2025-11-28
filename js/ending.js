const gallery = document.getElementById("gallery");

const imageCount = 170
const videoCount = 12
const chunkSize = 10

let nextIndex = 0
const items = [];


for (let i = 0; i <= 170; i++) {
    let img = document.createElement("img");
    img.setAttribute("data-src", `images/gallery/img${i}.jpg`)
    img.classList.add("item");
    items.push(img)
    // gallery.appendChild(img);
}

for (let i=0; i<=9; i++){
    let video = document.createElement("video");
    video.setAttribute("data-src", `images/gallery/videos/vid${i}.mp4`)
    video.classList.add("item");
    video.controls = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    items.push(video)
    // gallery.appendChild(video);
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

const loadNextChunk = () => {
    const endIndex = Math.min(nextIndex + chunkSize, items.length);
    for(let i=nextIndex; i<endIndex; i++) {
        gallery.appendChild(items[i]);
        observer.observe(items[i]);
    }
    nextIndex = endIndex;
}

loadNextChunk();

window.addEventListener("scroll", ()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500){
        if(nextIndex < items.length){
            loadNextChunk();
        }
    }
})

// Observe all gallery children
// document.querySelectorAll("#gallery .item").forEach(el => {
//     observer.observe(el);
// });
