const socket = io('/');  //socket connection

const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = [];
let currentPath = [];
var peer = new Peer(undefined,{   //we undefine this because peer server create it's own user it
   host: '/',
   port: 3001,
   //path: '/peerjs'
});

peer.on('open', id =>{
 	     socket.emit('join-room', ROOM_ID, id); //if someone join room send roomid and userid to server
})

socket.on('user-connected', (userId) =>{   //userconnected so we now ready to share 
	    console.log('user ID fetch connection: '+ userId); //video stream
})

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  let clear1 = select('#clearCanvas');
  clear1.mousePressed(clearBG);
  socket.on('mouse', newDrawing);
}

function newDrawing(point){
  noStroke();
	fill(point.color);
  ellipse(point.x, point.y,point.weight);
  
 }
     

// function mouseDragged(){
// 	console.log('sending:' + mouseX +','+ mouseY);
// 	var data = {
// 		x : mouseX,
// 		y : mouseY
// 	}
    
//          socket.emit('mouse', data, ROOM_ID);
 
	
// 	fill(0)
//     ellipse(mouseX, mouseY,10);
// }



 function mouseDragged() {
   
  
  
    const point = {
      x: mouseX,
      y: mouseY,
      color: colorInput.value,
      weight: weight.value
    };
    
  
  socket.emit('mouse', point, ROOM_ID);
  noStroke();
  fill(point.color);
  ellipse(point.x, point.y,point.weight);
 }




function clearBG(){
	background(255);
}


