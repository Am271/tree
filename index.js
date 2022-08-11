var state = 0;
var canvas= document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let circles = [], radius = 25, offsety = 58;
let labels = [], lines = [];
var btns = [document.getElementById("draw"), document.getElementById("line"), document.getElementById("text")];
var save_ = document.getElementById("save");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle="cyan";
ctx.font = "22px Arial";

function save() {
  let data_ = {'circles': circles, 'labels':labels, 'lines':lines};
  let name = 'datax.txt';
  let type = 'text/plain';
  var file = new Blob([JSON.stringify(data_)], {type: type});
  var a = document.createElement("a"),
  url = URL.createObjectURL(file);
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
  }, 0);
}

function isIntersect(point, c2) {
  return Math.sqrt((point.x-c2.x) ** 2 + (point.y - c2.y) ** 2) < radius;
  //checks if the distance between the center of the circle and the point clicked is less
}

function computeVal(c1, c2) {
  let slope = (c1.y - c2.y) / (c1.x - c2.x);
  let angle = Math.atan(slope); // get the slope at which we draw the line
  // angle = angle * (180 / Math.PI) - 90;
  if(c1.x > c2.x) // needed only because the angles lie in the range -180 to +180 (semicircle area is covered)
    angle = angle - (180 * Math.PI / 180);

  c1.x = c1.x + (radius * Math.cos(angle));
  c1.y = c1.y + (radius * Math.sin(angle));
  c1.y -= offsety;
}

function getCenter() {
  p = {x:event.clientX, y:event.clientY, center:false}
  circles.forEach(circle => {
    if (isIntersect(p, circle)) {
      p.x = circle.x;
      p.y = circle.y;
      p.center = true;
    }
  });
  if (!p.center)
    p.y -= offsety;
  return p;
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
      p1 = getCenter();
      state = 3; checkState(state); break;
      break;
    
    case 2:
      ctx.fillStyle = "black";
      labels.push({x:event.clientX - 5, y:event.clientY - offsety, val:document.getElementById("text_value").value});
      ctx.fillText(document.getElementById("text_value").value, event.clientX - 5, event.clientY - offsety);
      break;
    
    case 3:
      ctx.beginPath(); p2 = getCenter();
      if(p1.center)
        computeVal(p1, p2);
      if(p2.center)
        computeVal(p2, p1); // the first argument is always changed
      ctx.moveTo(p1.x, p1.y); lines.push([p1, p2]);
      ctx.lineTo(p2.x, p2.y); ctx.stroke(); state = 1; checkState(state);
      break;
  }
}

checkState(0);
// 0 is draw c2
// 1 & 3 are draw line 
// 2 is place text

for(let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", ()=>{state = i; checkState(i);});
}

canvas.addEventListener("click", action);
save_.addEventListener("click", save);