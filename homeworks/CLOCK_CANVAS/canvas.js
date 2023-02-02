// class Model {
//   constructor() {}
// }

// class View {
//   constructor() {}
// }

// class Controller {
//   constructor(model, view) {
//     this.model = model
//     this.view = view
//   }
// }

// const app = new Controller(new Model(), new View())

let canvasDraw = (diameter) => {
    let canvas = document.getElementById("clock");
    let ctx = canvas.getContext("2d");
    
    // Определение размеров
    let radius = diameter/ 2;
    // Центр контекста
    ctx.translate(500,400);

    let drawBack = (ctx, radius) =>{
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#FBB917";
        ctx.fill();
        
    }
    
    let drawNumbers = (ctx, radius) => {
        let ang;
        let num;
        ctx.font = "20px 'Times New Roman'";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // Расположение чисел по кругу
        for (num = 1; num <= 12; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }
    let drawCircles = (ctx, radius) =>{
    for(num=1; num<=12; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.beginPath();
    ctx.arc(0, Math.PI/6, radius*0.11, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
    }
    }
    
    
    
    // Отрисовка стрелок с учетом текущего времени
    let drawTime = (ctx, radius) => {
        // Текущее время
        let now = new Date();
        console.log(now);
        ctx.fillStyle = 'black';
        ctx.font = "36px";
        ctx.fillText(now.toLocaleTimeString(), 0, -radius*0.25)
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        // Стрелка часов
        hour = hour % 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.4, 4, "black");
        // Стрелка минут
        minute = (minute * Math.PI / (30)) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.6, 2, "black");
        // Стрелка секунд
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.75, 1, "#DC143C");
    }
    
    // Вращение стрелок
    let drawHand = (ctx, pos, length, width, color) => {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.rotate(-pos);
    }
    
    let drawNose = (ctx, radius) => {
        ctx.beginPath();
        ctx.arc(0, 0, radius * .08, 0, 2 * Math.PI);
        ctx.fillStyle = "#DC143C";
        ctx.fill();
    }
    // Основная функция по отрисовке + таймер
    let drawClock = () => {
        drawBack(ctx, radius);
        drawCircles(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius);
        drawNose(ctx, radius);
    
    }
    setInterval(drawClock, 1000);
    }
const divInput = document.getElementById("inputs");

let hideInput = () => {
    divInput.classList.add('hidden');
   
    let val = document.getElementById('diameter').value;
    if (val >= 200 && val <= 800) {
        document.getElementsByClassName('flex-container')[0].classList.add('active');
        return canvasDraw(val);
    }
    else {
        alert('Введенное число не входит в диапазон 200...800');
        divInput.classList.remove('hidden');}
    }


  document.getElementById('setDiameter').addEventListener("click", hideInput);


