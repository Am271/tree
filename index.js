var canvas= document.getElementById("myCanvas");

var state = 0;

// 0 is draw circle
// 1 is type text
// 2 is draw line

document.getElementById("draw").addEventListener("click", ()=>{state = 0;});
document.getElementById("text").addEventListener("click", ()=>{state = 1;});
document.getElementById("line1").addEventListener("click", ()=>{state = 2;});
document.getElementById("line2").addEventListener("click", ()=>{state = 3;});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.fillStyle="cyan";
ctx.font = "25px Arial";

// ctx.arc(200,150,100,0,360);
// ctx.arc(400,150,50,0,360);

function printMousePos(event) {
  // console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
  // ctx.arc(event.clientX, event.clientY, 20, 0, 360);
  // ctx.stroke();
  ctx.fillStyle = "cyan";
  switch(state) {
    case 0: 
      ctx.fillRect(event.clientX - 25, event.clientY - 50, 50, 50);
      // ctx.arc(event.clientX, event.clientY, 20, 0, 360); ctx.stroke();
      break;
    case 1:
      ctx.fillStyle = "black";
      ctx.fillText(document.getElementById("text_").value, event.clientX - 5, event.clientY - 12);
    case 2:
      ctx.moveTo(event.clientX, event.clientY - 20); break;
    case 3:
      ctx.lineTo(event.clientX, event.clientY - 20); ctx.stroke(); break;
  }
}

canvas.addEventListener("click", printMousePos);