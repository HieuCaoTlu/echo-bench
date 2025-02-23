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
            playRandomAudio();
            changeBackground();
            chatInput.value = "";
        }
    });

       

    // Xử lý đổi nền
    function changeBackground() {
        let newBg;
        do {
            newBg = images[Math.floor(Math.random() * images.length)];
        } while (document.body.style.backgroundImage.includes(newBg));

        document.body.style.transition = "background 2s ease-in-out, opacity 1s ease-in-out";
        document.body.style.opacity = "0.1";
        setTimeout(() => {
            document.body.style.backgroundImage = `url('${newBg}')`;
            document.body.style.opacity = "1";
        }, 100);
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
