let drawingMode = 'straingLine';

function hideBlock(id) {
    const block = document.getElementById(id);
    if (block.style.display === 'none') {
        block.style.display = 'block';
    }
    else {
        block.style.display = 'none';
    }
}



function selectColor(color) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    hideBlock('palette');
}
function selectSize(lineWidth) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.lineWidth = lineWidth;
    hideBlock('size');
}

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function eraser() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.strokeStyle = '#ffffff';
}

function selectDrawMode(newStyle){
    drawingMode = newStyle;
}


function work_with_canvas() {
    const element = document.getElementById('canvas');
    const context = element.getContext('2d');

    let valueConfiguration =
    {
        color: '#000000',
        lineWidth: 3
    };

    
    context.strokeStyle = valueConfiguration.color;
    context.lineWidth = valueConfiguration.lineWidth;

    let checkPainting =
    {
        isActive: false,
        startX: 0,
        startY: 0
    };
    function handleMouseDown(event) {
        checkPainting.isActive = true;
        checkPainting.startX = event.offsetX;
        checkPainting.startY = event.offsetY;
        
        context.beginPath();
        context.moveTo(checkPainting.startX, checkPainting.startY);
    }
    
    function handleMouseMove(event){
        if(!checkPainting.isActive){
            return;
        }
        if(drawingMode=='freeLine'){
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        }    
    }
    
    function handleMouseUp(event) {
        if (!checkPainting.isActive) {
            return;
        }
        if(drawingMode=='straingLine'){
            let endX = event.offsetX;
            let endY = event.offsetY;
            drawLine(context, checkPainting.startX, checkPainting.startY, endX, endY);
        }
        checkPainting.isActive = false;
    }

    function drawLine(context, startX, startY, endX, endY) {
        context.lineTo(endX, endY);
        context.stroke();
    }
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);
}

function saveImage() {
    const canvas = document.getElementById('canvas');
    const filenameInput = document.getElementById('fileName');
    const filename = filenameInput.value || '��� �������';

    const link = document.createElement('a');
    link.download = filename + '.png';
    link.href = canvas.toDataURL();
    link.click();
}

work_with_canvas();