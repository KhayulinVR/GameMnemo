const header = document.getElementById("gradient-header");

const colors = [
    "linear-gradient(90deg, #4a90e2, #9013fe)",
    "linear-gradient(90deg, #9013fe, #4a90e2)",
    "linear-gradient(90deg, #e94e77, #4a90e2)",
    "linear-gradient(90deg, #4a90e2, #50e3c2)",
];

let currentColorIndex = 0;

function changeBackground() {
    header.style.background = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length; // Переключаем индекс
}

// Менять фон каждые 3 секунды
setInterval(changeBackground, 3000);