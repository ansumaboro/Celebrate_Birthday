const gate = document.getElementById("gate-image")
const host_person = document.getElementById("host-person")
const host_person2 = document.getElementById("host2")
const waveBtn = document.getElementById("wave")
const enterBtn = document.getElementById("enter")
const hand = document.getElementById("hand-wave")
const girl = document.getElementById("bd-girl")

function animateHost() {
    for(i = 0; i<14; i++){
        setTimeout(()=>{
            if(host_person.src.includes("images/host1.webp")){
                host_person.src = "images/host2.webp";
            }else{
                host_person.src = "images/host1.webp";
            }
        }, i * 100)
    }
    setTimeout(()=>{
        wave.style.display = "block"
    }, i*100)
}
setTimeout(()=>{
    animateHost()
}, 2000)

waveBtn.onclick = ()=>{
    waveBtn.style.display = "none";
    setTimeout(()=>{
        hand.style.display = "block";

        waveHand();

        setTimeout(()=>{
            hand.style.display = "none"
            gate.src = "images/opened_gate.jpg";
            host_person.style.marginLeft = "30px"
            host_person.src = "images/welcome.webp"
            host_person2.style.display = "block"

            setTimeout(() => {
                enterBtn.style.display = "block";
            }, 500);
        },2000)
    }, 500)
}

function waveHand() {
    for(i=0; i<8; i++){
        setTimeout(()=>{
            if(hand.style.rotate == "0deg"){
                hand.style.rotate = "30deg"
            }else{
                hand.style.rotate = "0deg"
            }
        },i*100)
    }
}

enterBtn.onclick = ()=> {
    setTimeout(() => {
        animateWalking()
    }, 500);
}

function animateWalking() {
    girl.style.display = "block";
    enterBtn.style.display = "none";
    let bottom = parseInt(getComputedStyle(girl).bottom)
    let scale = 1

    for(i=0; i<10; i++){
        setTimeout(()=>{
            // console.log("walking")
            bottom += 10
            girl.style.bottom = bottom + "px" 
    
            scale -= 0.05
            girl.style.scale = scale
        },i * 1000)
    }
    setTimeout(() => {
        document.getElementById("cover").style.display = "block";

        setTimeout(() => {
            window.location.href = "room.html";
        }, 2000);
    }, i * 1000);
    
}