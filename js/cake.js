const cake = document.getElementById("cake")
const knife = document.getElementById("knife")
const cutBtn = document.getElementById("cutBtn")
const pickBtn = document.getElementById("pickBtn")
const hand = document.getElementById("hand")
const people = document.getElementsByClassName("person")
const note = document.getElementById("note")
const eatPerson = document.getElementById("eat-person")
const feedBtn = document.getElementById("feed")
const continueBtn = document.getElementById("continue")
const cover = document.getElementById("cover")

const persons = ["amlan", "talukdar", "mainu", "sneha", "sogun", "bishakha", "ansuma"]
let feedCount = {
    "amlan" : 0,
    "talukdar" : 0,
    "mainu" : 0,
    "sneha" : 0,
    "sogun" : 0,
    "bishakha" : 0,
    "ansuma" : 0
}

setTimeout(() => {
    knife.style.display = "block"
    cutBtn.style.display = "block"
}, 3000);


let cutCount = 0;
cutBtn.onclick = async ()=>{
    cutCount++;
    cutBtn.style.display = "none"
    await animateKnife();
    knife.style.display = "none";
    if(cutCount == 1){
        knife.style.scale = "-1 1"
        knife.style.display = "block"
        cutBtn.style.display = "block"
    }else if(cutCount > 1){
        pickBtn.style.display = "block"
    }
}

let picked = false
pickBtn.onclick = ()=>{
    pickBtn.style.display = "none"
    cake.src = "images/cake/cake3.webp";
    hand.style.display = "block"
    note.style.display = "block"
    picked = true

}

feedBtn.onclick = ()=>{
    feedBtn.style.display = "none"
    setTimeout(() => {
        animateEatPersonOut();
    }, 500);
}

continueBtn.onclick = ()=>{
    continueBtn.style.display = "none"
    setTimeout(() => {
        cover.style.display = "block"
        setTimeout(() => {
            window.location.href = "ending.html";
        }, 500);
    }, 1000);
}

async function animateKnife(){
    let bottom = parseInt(getComputedStyle(knife).bottom)
    while(bottom>-100){
        bottom -= 5
        knife.style.bottom = bottom + "px"

        await new Promise(resolve => setTimeout(resolve, 30))
    }
    if(cake.src.includes("cake.webp")){
        cake.src = "images/cake/cake1.webp"
    }else if(cake.src.includes("cake1.webp")){
        cake.src = "images/cake/cake2.webp"
    }
    while(bottom<40){
        bottom += 5
        knife.style.bottom = bottom + "px"
    
        await new Promise(resolve => setTimeout(resolve, 30))
    }
}

async function animateEatPersonIn(){
    setTimeout(async () => {
        eatPerson.style.display = "block"
        let scale = 0
        while(scale<1){
            scale += 0.05
            eatPerson.style.scale = scale
    
            await new Promise(resolve => setTimeout(resolve, 5))
        }
        feedBtn.style.display = "block";
    }, 500);
}

async function animateEatPersonOut(){
    eatPerson.style.display = "block"
    let scale = 1
    while(scale>0){
        scale -= 0.05
        eatPerson.style.scale = scale

        await new Promise(resolve => setTimeout(resolve, 5))
    }
    checkFeedCount();
}

function checkFeedCount(){
    for(let person of persons){
        if(feedCount[person] == 0){
            return
        }
    }
    hand.style.display = "none"
    note.style.display = "none"
    picked = false;
    continueBtn.style.display = "block"
}

Array.from(people).forEach(person =>{
    person.addEventListener("click", (e)=>{
        if(picked){
            for(i=0; i<7; i++){
                if(e.target.src.includes(persons[i])){
                    eatPerson.src = "images/friends/feed/"+persons[i]+".png"
                    feedCount[persons[i]]++;
                    animateEatPersonIn()
                    break;
                }
            }
        }

    })
})
