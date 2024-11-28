function handle(e) {
    console.log(document.getElementsByTagName("input")[0].value.length)
    if(document.getElementsByTagName("input")[0].value.length >= 6){
        e.preventDefault();
        document.getElementsByTagName("input")[0].blur()
    }
}
function load(){
    var snd = new Audio("Night-2.mp3"); // buffers automatically when created
    snd.play();
    document.getElementsByTagName("section")[0].style.opacity = "0"
    document.getElementsByTagName("section")[0].style.display = "none"
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const theme = {
    main: "rgb(190, 139, 255)",  // رنگ مستطیل
    ground: "white",            // رنگ زمین
    moon: "rgb(250, 250, 200)", // رنگ ماه
    star: "rgb(255, 255, 150)" , // رنگ ستاره‌ها
    shadow : "rgba(0, 0, 0 , 1)",
    body : "white"
};

const rows = canvas.height;
const cols = canvas.width;

// رسم سطح زمین
const groundHeight = rows / 8;
ctx.fillStyle = theme.main;
ctx.fillRect(0, rows - groundHeight, cols, groundHeight);

// رسم ماه با سایه
const moonRadius = 100;
const moonX = cols - 200;
const moonY = 200;

ctx.shadowBlur = 30;
ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
ctx.shadowOffsetX = 15;
ctx.shadowOffsetY = 15;

ctx.beginPath();
ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
ctx.fillStyle = theme.moon;
ctx.fill();
ctx.closePath();

// ریست کردن سایه برای اشیاء دیگر
ctx.shadowBlur = 0;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.lineWidth = 10;



// ایجاد ستاره‌ها
const stars = [];
for (let i = 0; i < 50; i++) {
    stars.push({
        x: Math.random() * cols,
        y: Math.random() * (rows - groundHeight - moonRadius * 2),
        radius: Math.random() * 2 + 1,
        opacity: Math.random(), // شفافیت اولیه
        flickerSpeed: Math.random() * 0.05 + 0.02 // سرعت چشمک زدن
    });
}

// رسم و چشمک زدن ستاره‌ها
function drawStars() {
    ctx.clearRect(0, 0, cols, rows - groundHeight); // پاک کردن آسمان

    // رسم ماه و زمین دوباره برای جلوگیری از پاک شدن
    ctx.fillStyle = theme.main;
    ctx.fillRect(0, rows - groundHeight, cols, groundHeight);

    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fillStyle = theme.moon;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = theme.shadow;
    // Set a start-point
    ctx.moveTo(cols/2 - 300, rows -  groundHeight);

    // Set an end-point
    ctx.lineTo(cols/2 - 500, rows - 10);
   

    // Stroke it (Do the Drawing)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = theme.main;
    // Set a start-point
    ctx.moveTo(cols/2 - 300, rows -  groundHeight);

    // Set an end-point
    ctx.lineTo(cols/2 - 300, 500);
    ctx.lineTo(cols - cols/2 + 200 - 300, 500);
    
    ctx.lineTo(cols - cols/2 + 200 - 300, rows - rows / 2 + 50);
    
    // Stroke it (Do the Drawing)
    ctx.stroke();
    ctx.beginPath();

    ctx.arc(cols - cols/2 + 200 - 300, rows - rows / 2 + 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = theme.body;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = theme.body
    ctx.moveTo(cols - cols/2 + 200 - 300, rows - rows / 2 + 100)
    ctx.lineTo(cols - cols/2 + 200 - 300, rows - rows / 2 +180)
    ctx.lineTo(cols - cols/2 + 200 - 370, rows - rows / 2 +210)
    ctx.moveTo(cols - cols/2 + 200 - 300, rows - rows / 2 +180)
    ctx.lineTo(cols - cols/2  -20 , rows - rows / 2 +210)
    ctx.moveTo(cols - cols/2 + 200 - 300, rows - rows / 2 +180)
    ctx.lineTo(cols - cols/2 + 200 - 300, rows - rows / 2 +300)
    ctx.lineTo(cols - cols/2 -50, rows - rows / 2 +360)
    ctx.moveTo(cols - cols/2 + 200 - 300, rows - rows / 2 +300)
    ctx.lineTo(cols - cols/2  -150, rows - rows / 2 +360)
    ctx.stroke()
    // رسم ستاره‌ها
    stars.forEach(star => {
        star.opacity += star.flickerSpeed; // تغییر شفافیت
        if (star.opacity >= 1 || star.opacity <= 0) {
            star.flickerSpeed *= -1; // تغییر جهت چشمک زدن
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 150, ${star.opacity})`;
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(drawStars); // درخواست انیمیشن
}

drawStars(); // اجرای انیمیشن ستاره‌ها
