document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const bgChangeBtn = document.getElementById("bg-change-btn");
    const musicChangeBtn = document.getElementById("music-change-btn");

    const images = ["assets/bgr/backgrounds/bg1.jpg", "assets/bgr/backgrounds/bg2.jpg"];
    const audios = ["assets/bgm/audio/music1.mp3", "assets/bgm/audio/music2.mp3"];
    let audioElement = new Audio();
    
    let currentBgIndex = -1;
    let currentAudioIndex = -1;

    // Mở mặc định 1 background khi vào trang
    function setDefaultBackground() {
        changeBackground();
    }

    // Xử lý gửi tin nhắn
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && chatInput.value.trim() !== "") {
            changeBackground();
            playRandomAudio();
            chatInput.value = "";
        }
    });

    // Đổi nền ngẫu nhiên nhưng không trùng lần trước
    function changeBackground() {
        let newBgIndex;
        do {
            newBgIndex = Math.floor(Math.random() * images.length);
        } while (newBgIndex === currentBgIndex);

        currentBgIndex = newBgIndex;
        document.body.style.backgroundImage = `url('${images[newBgIndex]}')`;
        document.body.style.backgroundSize = "cover";
    }

    // Phát nhạc nền ngẫu nhiên nhưng không trùng lần trước
    function playRandomAudio() {
        let newAudioIndex;
        do {
            newAudioIndex = Math.floor(Math.random() * audios.length);
        } while (newAudioIndex === currentAudioIndex);

        currentAudioIndex = newAudioIndex;
        audioElement.src = audios[newAudioIndex];
        audioElement.play();
    }

    // Gán sự kiện cho nút đổi nền
    bgChangeBtn.addEventListener("click", changeBackground);

    // Gán sự kiện cho nút đổi nhạc
    musicChangeBtn.addEventListener("click", playRandomAudio);

    // Chạy ngẫu nhiên 1 background khi mở trang
    setDefaultBackground();
});
