var state = 0;
var canvas= document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let circles = []; radius = 25;
var btns = [document.getElementById("draw"), document.getElementById("text"), document.getElementById("line1"), document.getElementById("line2")];

function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < radius;
}

function checkState(x) {
  for(let i = 0; i < btns.length; i++) {
    if(i === x)
      btns[i].classList.add('innerbox');
    else
      btns[i].classList.remove('innerbox');
  }
}

function action(event) {
  // console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
  // ctx.arc(event.clientX, event.clientY, 20, 0, 360);
  // ctx.stroke();
  const pos = {
    x: event.clientX,
    y: event.clientY
  };
  circles.forEach(circle => {
    if (isIntersect(pos, circle)) {
      console.log('yay')
    }
  });

  ctx.fillStyle = "cyan";
  switch(state) {
    case 0:
      ctx.beginPath(); //starts a new line
      // ctx.fillRect(event.clientX - 25, event.clientY - 50, 50, 50);
      circles.push({x:event.clientX, y:event.clientY});
      ctx.arc(event.clientX, event.clientY - radius, radius, 0, 2 * Math.PI); ctx.fill();
      break;
    case 1:
      ctx.fillStyle = "black";
      ctx.fillText(document.getElementById("text_value").value, event.clientX - 5, event.clientY - 22);
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(event.clientX, event.clientY - 20); state = 3; checkState(state); break;
    case 3:
      ctx.lineTo(event.clientX, event.clientY - 20); ctx.stroke(); state = 2; checkState(state); break;
  }
}

checkState(0);
// 0 is draw circle
// 1 is type text
// 2 is draw line

for(let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", ()=>{state = i; checkState(i);});
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle="cyan";
ctx.font = "22px Arial";

// ctx.arc(200,150,100,0,360);
// ctx.arc(400,150,50,0,360);

canvas.addEventListener("click", action);