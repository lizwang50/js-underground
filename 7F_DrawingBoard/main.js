const toggleBtn = document.querySelectorAll('.toggle-btn');
const toggleItem = document.querySelectorAll('.toggle-item');

function toggleEvent() {
  toggleItem.forEach(d => d.classList.toggle('d-none'));
}
toggleBtn.forEach(i => i.addEventListener('click',toggleEvent));

// Canvas 繪製
const canvas = document.querySelector('#draw');

// 用 getContext() 取得渲染環境。
let ctx = canvas.getContext('2d');
ctx.strokeStyle = '#333333';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function mouseMove(e) {
  if(isEraser == true) {
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.stroke();
    [lastX,lastY] = [e.offsetX,e.offsetY];
    eraseDraw()
  }else{
    if(!isDrawing) return
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    [lastX,lastY] = [e.offsetX,e.offsetY];
  }
}


canvas.addEventListener('mousedown',(e)=>{
  isDrawing = true;
  [lastX,lastY] = [e.offsetX,e.offsetY]
  console.log(lastX,lastY);
})
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);

// Clear All 

const clear = document.querySelector('#clearAll');

function clearCanvas(e) {
  e.preventDefault();
  console.log('clear');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clear.addEventListener('click', clearCanvas);

// Brush size
const brush = document.querySelector('#brushSize');
const brushPixel = document.querySelector('.px-number');
// const tooltipCanvas = document.querySelector('#tooltipCanvas');
// const ctxToolTip = tooltipCanvas.getContext('2d');

function brushSizing() {
  console.log(brush.value);
  ctx.lineWidth = brush.value;
  brushPixel.textContent = brush.value
  // brushSizingView(brush.value);
}
// function brushSizingView(value) {
//   console.log(value);
//   ctx.strokeStyle = '#333333';
//   ctxToolTip.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);
//   ctxToolTip.beginPath();
//   ctxToolTip.arc(50,50, value/2 , 0, 2 * Math.PI);
//   ctxToolTip.fill();
// }

brush.addEventListener('change',brushSizing);

// eraser
const eraser = document.querySelector('.editor .eraser');
const brushSize = document.querySelector('.brush-size');

function updateBtn() {
  if (isEraser = !isEraser) {
    eraser.classList.add('active');
    brushSize.classList.remove('active');
  }else{
    eraser.classList.remove('active');
    brushSize.classList.add('active');
  }
}

eraser.addEventListener('click',updateBtn);
brushSize.addEventListener('click',updateBtn);

function eraseDraw() {
  console.log('eraseDraw');
  ctx.clearRect(lastX-5, lastY-5, brush.value, brush.value);
}

// palette
let peletteColor = document.querySelector('.palette-color');

$(".palette").on('click', function(){
  $("#color").click();
})
function changeColor() {
  console.log(peletteColor.value);
  ctx.strokeStyle = peletteColor.value
}

peletteColor.addEventListener('change',changeColor);

// save
const saveBtn = document.querySelector('.save');
function saveImage() {
  const dataURL = canvas.toDataURL();
  saveBtn.href = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
}
saveBtn.addEventListener('click',saveImage);
