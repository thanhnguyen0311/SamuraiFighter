var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var f1HP = document.getElementById("fighter1")
var f2HP = document.getElementById("fighter2")


var logostart = document.getElementById('start')
// var audiotheme=document.getElementById('myTheme');
// audiotheme.onplaying()

canvas.width = 1024;
canvas.height = 576;



ctx.fillRect(0 , 0, canvas.width, canvas.height)


var checkjump = true // bat tat trong luc
var checkw = true
var f2checkw = true
var checkspace = true // check attack cooldown
var checknumpad = true // check attack cooldown
var checkattack = false
var start = false
var timeover = false

var backgroundsound = new Audio("turkish-beat-15167.mp3")
backgroundsound.load()
var hit = new Audio('onhit.mp3')
hit.load()
var hitbox = new Audio('hit.mp3')
hitbox.load()
var intro = new Audio ('123.mp3')
intro.load()
var ko = new Audio('ko.mp3')
ko.load()


var background = new Image()
background.src = "./background.png"
var Samurai1 = new Image();
var Samurai2 = new Image();




class Object{
    constructor({name,position,movement,width,height,hp}){
        this.name = name
        this.position = position;
        this.movement = movement;
        this.width = width;
        this.height = height;
        this.hp = hp;
        this.hurt = false;
        this.attackcooldown = false;
        this.win = false;
        this.attack = {
            position : this.position,
            width:200,
            height:150,
        }
    };


    draw(){   
    // ctx.fillStyle ="red"
    // ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    // ctx.fillStyle ="green"
    // ctx.fillRect(this.position.x,this.position.y,this.attack.width,this.attack.height)

    if (this.name === "Samurai"){
        if (fighter1.attackcooldown == true && this.hurt == false){
            if (this.position.x < fighter2.position.x){
            Samurai1.src = "./Samurai/Samurai1/attack.png"
            ctx.drawImage(Samurai1,this.position.x,this.position.y,250,170)
            hitbox.play()
        }
            
            else{
                Samurai1.src = "./Samurai/Samurai1/attackback.png"
                ctx.drawImage(Samurai1,this.position.x-100,this.position.y,250,170)
                hitbox.play()
            }
        }

        if (fighter1.attackcooldown == false && this.hurt == false){
            if (this.movement.x < 0){
            Samurai1.src = "./Samurai/Samurai1/back.png"
            ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)}
            if (this.movement.x > 0){
                Samurai1.src = "./Samurai/Samurai1/run.png"
                ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)
            }
            if (this.movement.x == 0){
                if (this.win == false && fighter1.hp > 0){
                    if (this.position.x > fighter2.position.x){
                        Samurai1.src = "./Samurai/Samurai1/idleback.png"
                        ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)
                }
                    else {
                     Samurai1.src = "./Samurai/Samurai1/idle1.png"
                        ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)
                }
            }
                 if (this.hp <=0 ){
                Samurai1.src = "./Samurai/Samurai1/dead2.png"
                ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)
        }
                if (fighter1.win == true) {
                    Samurai1.src = "./Samurai/Samurai1/win.png"
                    ctx.drawImage(Samurai1,this.position.x,this.position.y-100,this.width,this.height+100)
                }
            }
        }
        if (this.hurt == true){
            if(this.position.x < fighter2.position.x){
            Samurai1.src = "./Samurai/Samurai1/hurt.png"
            ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)}
            else {
                Samurai1.src = "./Samurai/Samurai1/hurtback.png"
                ctx.drawImage(Samurai1,this.position.x,this.position.y,this.width,this.height)}
            }
            
        
    }

    if (this.name == "Commander"){
        if (fighter2.attackcooldown == true && this.hurt == false){
            if (this.position.x < fighter1.position.x){
                Samurai2.src = "./commander/attack.png"
                ctx.drawImage(Samurai2,this.position.x,this.position.y,250,220)
                hitbox.play()
            }
            else {
                Samurai2.src = "./commander/attackback.png"
                ctx.drawImage(Samurai2,this.position.x-100,this.position.y,250,220)
                hitbox.play()
            }
        }
        
        if (fighter2.attackcooldown == false && this.hurt == false){
            if (this.movement.x < 0){
            Samurai2.src = "./commander/runback.png"
            ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)}
            if (this.movement.x > 0){
            Samurai2.src = "./commander/run.png"
            ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)
            }
            if (this.movement.x == 0 && this.hp > 0 && this.win == false){
                if(this.position.x < fighter1.position.x ){
                    Samurai2.src = "./commander/idle.png"
                    ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)
                }
                else{
                    Samurai2.src = "./commander/idleback.png"
                    ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)
                }
            }
            if (this.hp <=0 ){
                Samurai2.src = "./commander/dead.png"
                ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width+100,this.height)
        }
            if (fighter2.win == true) {
                Samurai2.src = "commander/win.png"
                ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)
            }
        }

        if (this.hurt == true){
            if(this.position.x < fighter1.position.x){
            Samurai2.src = "./commander/hurt.png"
            ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)}
            else {
                Samurai2.src = "./commander/hurtback.png"
                ctx.drawImage(Samurai2,this.position.x,this.position.y,this.width,this.height)}
            }
        }
    }


    update(){
        this.draw();
        this.position.x += this.movement.x
        this.position.y += this.movement.y
    
        if (this.position.y < 150 ){
            checkjump = true
        }
        if (this.position.y < canvas.height - this.height && checkjump == true){
            this.movement.y = 5            //trong luc vat the
        }

        if (this.position.y > canvas.height - this.height){
            this.position.y = canvas.height - this.height
                 // cham dat dung yen
            // this.position.y = canvas.height - this.height
        }
        if (this.position.x > canvas.width - this.width + 5){
            this.movement.x = 0;        // cham tuong ben phai dung yen
            this.position.x = canvas.width - this.width
        }
        if (this.position.x < -5){
            this.movement.x = 0;        //cham tuong ben trai dung yen
            this.position.x = 5
        }
    }
    attacking(enemy){                      // check attack enemy
        if(this.attack.position.x <= enemy.position.x + enemy.width + 80 &&
            this.attack.position.x + this.attack.width  >= enemy.position.x &&
            this.attack.position.y <= enemy.position.y + enemy.height &&
            this.attack.position.y + this.attack.height >= enemy.position.y){
                checkattack = true
                   hit.play()
                enemy.isAttacking()
                if (enemy.hp <= 0){
                    console.log (this.name + ' win the round');
                    this.win = true;        
                    ko.play()
                  logostart.innerHTML='<img width="600" height="250" onclick="reset()" src="ko.png" style="margin-top: 250px; margin-left: 450px;">'
                }
                return console.log(this.name + ' attacked enemy');
            }
    }

    isAttacking(){
        let damage = Math.floor(Math.random() * 20);
        this.hp -= damage;
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 500)
        console.log( this.name + 'bi tan cong');
    }
}

var fighter1 = new Object({
    name: 'Samurai',
    position:{
    x: 20,
    y: 0,
},
    movement:{
    x : 0,
    y : 0
    },
    width: 140,
    height: 170,
    hp: 100,
}
)


var fighter2 = new Object({
    name: 'Commander',
    position:{
    x: 800,
    y: 0
},
    movement:{
    x: 0,
    y:0
    },
    width: 140,
    height: 220,
    hp: 100,
})



function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(Animate)
    ctx.fillStyle ="black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(background,0,0,canvas.width,canvas.height)
        f1HP.value = fighter1.hp
        f2HP.value = fighter2.hp
        
        if ( start == true){
    fighter1.update();
    fighter2.update();

}
    // if(fighter1.attack.position.x <= fighter2.position.x + fighter2.attack.width &&
    //     fighter1.attack.position.x + fighter1.attack.width  >= fighter2.position.x &&
    //     fighter1.attack.position.y <= fighter2.position.y &&
    //     fighter1.attack.position.y + fighter1.attack.height >=fighter2.position.y
    //     ){
    // console.log(1)                                 // Check va cham
}
Animate()

/// fighter 1
window.addEventListener('keydown',(event) => {
    if (fighter1.hp > 0 && fighter2.hp > 0  && timeover == false && fighter1.win == false && fighter2.win == false){
    if( event.key == "d" ){
        fighter1.movement.x = 4;
    }
    if(event.key == "a"){
        fighter1.movement.x = -4;
    }
    if(event.key == "w" && checkw == true){
        checkjump = false
        checkw = false
        fighter1.movement.y = -6
        setTimeout(() => {
            checkw = true
        }, 600)
    }
    if(event.key == " " && checkspace == true){
        fighter1.attacking(fighter2);
        fighter1.attackcooldown = true
        checkspace = false
        setTimeout(() => {
            fighter1.attackcooldown = false
        }, 300)
        setTimeout(() => {
            checkspace = true
        }, 1000)}
    }
})        

window.addEventListener('keyup',(event) => {
    if (fighter1.hp > 0 && fighter2.hp > 0  && timeover == false && fighter1.win == false && fighter2.win == false){
    if( event.key == "d"){
        fighter1.movement.x = 0;
    }
    if(event.key == "a"){
        fighter1.movement.x = 0;
    }
}
})       

/// fighter 2 

    window.addEventListener('keydown',(event) => {
        if (fighter1.hp > 0 && fighter2.hp > 0  && timeover == false && fighter1.win == false && fighter2.win == false){
    if( event.key == "ArrowLeft" ){
        fighter2.movement.x = -4;
    }
    if(event.key == "ArrowRight"){
        fighter2.movement.x = 4;
    }
    if(event.key == "ArrowUp" && f2checkw == true){
        checkjump = false
        f2checkw = false
        fighter2.movement.y = -6
        setTimeout(() => {
            f2checkw = true
        }, 600)
    }
    if(event.key == "Enter" && checknumpad == true){
        fighter2.attacking(fighter1);
        fighter2.attackcooldown = true
        checknumpad = false
        setTimeout(() => {
            fighter2.attackcooldown = false
        }, 300)
        setTimeout(() => {
            checknumpad = true
        }, 500)
    }
}
})        

window.addEventListener('keyup',(event) => {
    if (fighter1.hp > 0 && fighter2.hp > 0 && timeover == false && fighter1.win == false && fighter2.win == false){
    if( event.key == "ArrowLeft"){
        fighter2.movement.x = 0;
    }
    if(event.key == "ArrowRight"){
        fighter2.movement.x = 0;
    }
}
})      

function checkWin(){
    if (fighter1.hp > fighter2.hp){
        fighter1.win = true
        console.log(fighter1.name + ' won the round')
        logostart.innerHTML='<img width="600" height="250" onclick="reset()" src="ko.png" style="margin-top: 250px; margin-left: 450px;">'
    }
    if (fighter1.hp < fighter2.hp){
        fighter2.win = true
        console.log(fighter2.name + ' won the round')
        logostart.innerHTML='<img width="600" height="250" onclick="reset()" src="ko.png" style="margin-top: 250px; margin-left: 450px;">'
    }
    else {
        console.log(' DRAW')
        logostart.innerHTML='<img width="600" height="250" onclick="reset()" src="ko.png" style="margin-top: 250px; margin-left: 450px;">'
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0 && fighter1.win == false && fighter2.win == false) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.getElementById('timer60').innerHTML = timer
    }
    if (fighter1.win == true || fighter1.win == false) {
        document.getElementById('timer60').innerHTML = timer
      }
    if (timer === 0) {
        timeover == true
      checkWin()
    }
  }
  
  
  function startgame(){
    setTimeout(function() {
        decreaseTimer()
        start = true
    }, 3000)
    intro.play()
    setInterval(function () {
        backgroundsound.play()
        }, 2);
    logostart.innerHTML=''
  }

  function reset(){
    fighter1.hp = 100
    fighter2.hp = 100
    fighter1.win = false
    fighter2.win = false
    fighter1.position.x = 80
    fighter2.position.x = 800
    timeover == false
    timer = 60
    document.getElementById('timer60').innerHTML=""
    startgame()
  }
