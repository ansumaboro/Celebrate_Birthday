const people = document.getElementById("people")
const cakeTable = document.getElementById("cake-table")
const gotoBtn = document.getElementById("gotoTable")
const cover = document.getElementById("cover")
const wishPerson = document.getElementById("wish-person")
const wishPersonBg = document.getElementById("wish")
const thankBtn = document.getElementById("thnkyou")

const birthdayWishes = new Audio("voices/happy-birthday-wishes.mp3")

async function unmute(){
    document.getElementById("muteLbl").style.display = "none"
    birthdayWishes.play()
    setTimeout(() => {
        wishPersonBg.style.display = "block";
        wishPerson.style.display = "block";
        animateWishIn();

        setTimeout(() => {
            thankBtn.style.display = "block"
        }, 1000);
    }, 5000);
}

persons = ["bishakha", "mainu", "talukdar", "sogun", "sneha", "ansuma"]
count = 0;

async function changeWishPerson(){
    await animateWishOut();
    if(count >= 6){
        wishPersonBg.style.display = "none";
        cakeAnimation();
        return;
    }
    wishPerson.src = "images/friends/wishes/"+persons[count]+".webp"
    count++;
    setTimeout(()=>{
        animateWishIn();
    },500)
    setTimeout(() => {
        thankBtn.style.display = "block"
    }, 1000);
}

thankBtn.onclick = ()=>{
    thankBtn.style.display = "none"
    setTimeout(() => {
        changeWishPerson();
    }, 1000);
}

async function animateWishIn(){
    let scale = 0
    while(scale<1){
        scale += 0.05
        wishPerson.style.scale = scale
        await new Promise(resolve => setTimeout(resolve, 5))
    }
}

async function animateWishOut(){
    let scale = 1
    while(scale>0){
        scale -= 0.05
        wishPerson.style.scale = scale
        await new Promise(resolve => setTimeout(resolve, 5))
    }
}


async function animateCake(){
    cakeTable.style.display = "block";
    let bottom = parseInt(getComputedStyle(cakeTable).bottom)

    while(bottom > 0){
        bottom -= 10
        cakeTable.style.bottom = bottom + "px"

        await new Promise(resolve => setTimeout(resolve, 5))
    }   
    people.style.bottom = "200px"
    setTimeout(() => {
        gotoBtn.style.display = "block"
    }, 2000);
}

gotoBtn.onclick = ()=>{
    gotoBtn.style.display = "none";
    let scale = 1;
    cakeTable.style.transformOrigin = "0 50%"

    for(i=0; i<60; i++){
        setTimeout(() => {
            scale += 0.02;
            cakeTable.style.scale = scale;
        }, i * 50);
    }

    setTimeout(() => {
        cover.style.display = "block";
        setTimeout(() => {
            window.location.href = "cake.html";
        }, 1000);
    }, i*50);
}

function cakeAnimation(){
    setTimeout(() => {
        animateCake();
    }, 2000);
}