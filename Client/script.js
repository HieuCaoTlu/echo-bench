document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const bgChangeBtn = document.getElementById("bg-change-btn");
    const musicChangeBtn = document.getElementById("music-change-btn");

    const images = ["assets/bg1.jpg", "assets/bg2.jpg"];
    const audios = ["assets/music1.mp3", "assets/music2.mp3"];
    let audioElement = new Audio();

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

    // Đổi nền ngẫu nhiên
    function changeBackground() {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.body.style.backgroundImage = `url('${randomImage}')`;
        document.body.style.backgroundSize = "cover";
    }

    // Phát nhạc nền ngẫu nhiên
    function playRandomAudio() {
        const randomAudio = audios[Math.floor(Math.random() * audios.length)];
        audioElement.src = randomAudio;
        audioElement.play();
    }

    // Gán sự kiện cho nút đổi nền
    bgChangeBtn.addEventListener("click", changeBackground);

    // Gán sự kiện cho nút đổi nhạc
    musicChangeBtn.addEventListener("click", playRandomAudio);

    // Chạy ngẫu nhiên 1 background khi mở trang
    setDefaultBackground();
});
