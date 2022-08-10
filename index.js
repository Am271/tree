var state = 0;
var canvas= document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let circles = [], radius = 25, offsety = 58;
var btns = [document.getElementById("draw"), document.getElementById("line"), document.getElementById("text")];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle="cyan";
ctx.font = "22px Arial";

function computeVal(point, circle) {
  let slope = (point.y - circle.y) / (point.x - circle.x);
  let angle = Math.atan(slope);
  // angle = angle * (180 / Math.PI) - 90;
  if(point.x < circle.x) {
    tmp_angle = angle - (180 * Math.PI / 180);
    point.x = circle.x + (radius * Math.cos(tmp_angle));
    point.y = circle.y + (radius * Math.sin(tmp_angle));
  }
  else {
    point.x = circle.x + (radius * Math.cos(angle));
    point.y = circle.y + (radius * Math.sin(angle));
  }
  // console.log(slope);
  point.y -= offsety;
}

function getVal() {
  const pos = {
    x: event.clientX,
    y: event.clientY
  };
  circles.forEach(circle => {
    if (Math.sqrt((pos.x-circle.x) ** 2 + (pos.y - circle.y) ** 2) < radius) {
      computeVal(pos, circle);
    }
  });
  return pos;
}

function checkState(x) {
  for(let i = 0; i < btns.length; i++) {
    if(x === i)
      btns[i].classList.add('innerbox');
    else
      btns[i].classList.remove('innerbox');
  }
  if(x === 3)
    btns[1].classList.add('innerbox-red');
  else
    btns[1].classList.remove('innerbox-red');
}

function action(event) {

  ctx.fillStyle = "cyan";

  switch(state) {
    case 0:
      ctx.beginPath(); //starts a new line
      // ctx.fillRect(event.clientX - 25, event.clientY - 50, 50, 50);
      circles.push({x:event.clientX, y:event.clientY});
      ctx.arc(event.clientX, event.clientY - offsety, radius, 0, 2 * Math.PI); ctx.fill();
      break;
    
    case 1:
      ctx.beginPath();
      pos = getVal();
      ctx.moveTo(pos.x, pos.y); state = 3; checkState(state); break;
      break;
    
    case 2:
      ctx.fillStyle = "black";
      ctx.fillText(document.getElementById("text_value").value, event.clientX - 5, event.clientY - offsety);
      break;
    
    case 3:
      pos = getVal();
      ctx.lineTo(pos.x, pos.y); ctx.stroke(); state = 1; checkState(state);
      break;
  }
}

checkState(0);
// 0 is draw circle
// 1 & 3 are draw line 
// 2 is place text

for(let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", ()=>{state = i; checkState(i);});
}

// ctx.arc(200,150,100,0,360);
// ctx.arc(400,150,50,0,360);

canvas.addEventListener("click", action);