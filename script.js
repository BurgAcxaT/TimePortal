// Получаем все кнопки "Войти"
var buttons = document.querySelectorAll(".enter-btn");
var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modal-title");
var modalText = document.getElementById("modal-text");

// Добавляем обработчики событий для каждой кнопки
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
        e.stopPropagation(); // Предотвращаем всплытие события
        
        // Получаем название эпохи
        var epoch = this.parentElement.querySelector("h2").innerText;
        
        // Получаем описание эпохи
        var description = this.parentElement.querySelector("p").innerText;
        
        // Устанавливаем текст в модальном окне
        modalTitle.innerText = "🎉 " + epoch + " 🎉";
        modalText.innerText = "Добро пожаловать в эпоху: " + epoch + "!";
        
        // Показываем модальное окно
        modal.classList.add("show");
        
        // Добавляем эффект встряски к модальному контенту
        var modalContent = document.querySelector(".modal-content");
        modalContent.style.animation = "none";
        setTimeout(function() {
            modalContent.style.animation = "scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        }, 10);
    };
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove("show");
}

// Закрытие модального окна при клике вне его содержимого
modal.onclick = function(e) {
    if (e.target === modal) {
        closeModal();
    }
};

// Закрытие модального окна при нажатии клавиши Escape
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

// Добавляем эффект параллакса для фона при движении мыши
document.addEventListener("mousemove", function(e) {
    var moveX = (e.clientX - window.innerWidth / 2) / 50;
    var moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    var epochs = document.querySelectorAll(".epoch");
    for (var i = 0; i < epochs.length; i++) {
        var bgImg = epochs[i].querySelector(".bg-img");
        bgImg.style.transform = "translate(" + moveX + "px, " + moveY + "px) scale(1.1)";
    }
});

// Анимация появления карточек при загрузке страницы
window.addEventListener("load", function() {
    var epochs = document.querySelectorAll(".epoch");
    
    for (var i = 0; i < epochs.length; i++) {
        (function(index, epoch) {
            setTimeout(function() {
                epoch.style.opacity = "0";
                epoch.style.transform = "translateY(50px)";
                epoch.style.transition = "all 0.8s ease";
                
                setTimeout(function() {
                    epoch.style.opacity = "1";
                    epoch.style.transform = "translateY(0)";
                }, 50);
            }, index * 200);
        })(i, epochs[i]);
    }
});