document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const chatInput = document.getElementById("chat-input");
    const pixelEffect = document.getElementById("pixel-effect");
    const bgChangeBtn = document.getElementById("bg-change-btn");
    const musicChangeBtn = document.getElementById("music-change-btn");

    const images = ["assets/backgrounds/bg1.jpg", "assets/backgrounds/bg2.jpg"];
    const audios = ["assets/audio/music1.mp3", "assets/audio/music2.mp3"];
    const audioElement = new Audio();

    // Hiển thị chat box sau 0.5s
    setTimeout(() => {
        chatContainer.classList.remove("hidden");
        chatContainer.classList.add("visible");
    }, 500);

    function setDefaultBackground() {
        changeBackground();
    }


    // Xử lý nhập tin nhắn
    chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && chatInput.value.trim() !== "") {
            createPixelEffect();
            playRandomAudio();
            changeBackground();
            chatInput.value = "";
        }
    });

    function createPixelEffect() {
        const chatContainer = document.getElementById("chat-container");
        const pixelEffect = document.getElementById("pixel-effect");
    
        // Lấy vị trí thực tế của chat box
        requestAnimationFrame(() => {
            const boxRect = chatContainer.getBoundingClientRect();
            const centerX = boxRect.left + boxRect.width / 2;
            const centerY = boxRect.top + boxRect.height / 2;
    
            for (let i = 0; i < 20; i++) {
                const pixel = document.createElement("div");
                pixel.classList.add("pixel");
    
                // Đặt pixel xuất phát từ chat box
                pixel.style.left = '20px';
                pixel.style.top = '20px';
    
                // Hướng bay ngẫu nhiên (lên, xuống, trái, phải)
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 80 + 40;
                const moveX = Math.cos(angle) * distance;
                const moveY = Math.sin(angle) * distance;
    
                pixel.style.setProperty("--x", `${moveX}px`);
                pixel.style.setProperty("--y", `${moveY}px`);
    
                // Màu sắc ngẫu nhiên
                const colors = ["#ffcc00", "#ff5733", "#33ff57", "#5733ff", "#ff33aa"];
                pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
                pixelEffect.appendChild(pixel);
    
                // Xóa pixel sau khi animation kết thúc
                setTimeout(() => pixel.remove(), 1000);
            }
        });
    }
    
    

    // Xử lý đổi nền
    function changeBackground() {
        let newBg;
        do {
            newBg = images[Math.floor(Math.random() * images.length)];
        } while (document.body.style.backgroundImage.includes(newBg));

        document.body.style.transition = "background 2s ease-in-out, opacity 1s ease-in-out";
        document.body.style.opacity = "0.3";
        setTimeout(() => {
            document.body.style.backgroundImage = `url('${newBg}')`;
            document.body.style.opacity = "1";
        }, 300);
    }


    // Xử lý phát nhạc
    function playRandomAudio() {
        let newAudio;
        do {
            newAudio = audios[Math.floor(Math.random() * audios.length)];
        } while (audioElement.src.includes(newAudio));
        setTimeout(() => {
            audioElement.src = newAudio;
            audioElement.play();
        }, 300);
    }

    bgChangeBtn.addEventListener("click", changeBackground);
    musicChangeBtn.addEventListener("click", playRandomAudio);


    setDefaultBackground();
    playRandomAudio();
});
