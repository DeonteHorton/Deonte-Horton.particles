
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove', function (event) {
    console.log(mouse);
    mouse.x = event.x;
    mouse.y = event.y;
    
})

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
'orange',
'cyan',
'purple',
'white',
'red'
]

var fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)]

function Circle(x,y,dx,dy,radius) {
this.x = x;
this.y = y;
this.dx = dx;
this.dy = dy;
this.radius = radius;
this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

this.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
    ctx.stroke()
    ctx.fillStyle = this.color
    ctx.fill();
    
    
}

this.update = function() {
    if (this.x + this.radius > innerWidth || this.x  - this.radius < 0) {
        this.dx = -this.dx
        } 
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        } 
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x- this.x < 50 && mouse.x - this.x > -50 && mouse.y- this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
            //this.x += 1;
            this.x = mouse.x;
            this.y = mouse.y
        }

        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }

        this.draw()
}
}


var circleArray = [];

for (let i = 0; i < 10; i++) {

var radius = 30;
var x = Math.random() * (window.innerWidth - radius * 2) + radius;
var y = Math.random() * (window.innerHeight - radius * 2) + radius;
var dx = (Math.random() -0.5) * 2;
var dy = (Math.random() -0.5) * 2;
circleArray.push(new Circle(x,y,dx,dy,radius))

}



function animate() {
requestAnimationFrame(animate);
//console.log('live increment');

    ctx.clearRect(0,0,innerWidth,innerHeight)

for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    
}


}
animate();



