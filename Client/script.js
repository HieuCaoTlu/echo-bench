import { songs } from "./song.js";
import { backgrounds } from "./background.js";

document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("chat-input");
    const effectButtons = document.querySelectorAll(".select-effect .emotion");
    const audio = new Audio(songs.happy[0].file);
    window.toggleSelection = toggleSelection;
    window.togglePopup = togglePopup;
    const effect = ['rain', 'storm', 'wind', 'snow', " "];
    let currentEffect = '';


    chatInput.addEventListener("keypress", async function (event) { // 🟢 THÊM async
        if (event.key === "Enter") {
            let message = chatInput.value.trim(); // Lấy nội dung chat
            
            if (message === "") return; // Không gửi nếu rỗng
            document.getElementById('loading').classList.add('active');
            document.getElementById('chat-input').classList.add('hidden');
            console.debug("Bạn đã nhập:", message);
            
            try {
                let response = await fetch("https://hieucaotlu-flask--5000.prod1.defang.dev//predict", { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: message }) 
                });
    
                let data = await response.json();
                console.log("Phản hồi từ API:", data);
                currentEmotion = data.result.toLowerCase();
                console.log(currentEmotion)
                const possibilitiesObj = data.possibilities[0];  // Lấy object trong mảng
                console.log("Possibilities Object:", possibilitiesObj);

                const max_value = possibilitiesObj[data.result]; // Truy xuất đúng key
                console.log("Max value:", max_value);

                // Xử lý hiển thị phản hồi API nếu cần
                
                updateEmotion();
                changeBackground(currentEmotion);
                changeMusic(currentEmotion);


                if(max_value > 0.5){
                    if (currentEmotion === 'happy'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [2, 3, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                    }
                    else if (currentEmotion === 'sad'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [0, 1, 3, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                }
                    else if (currentEmotion === 'neutral'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [2, 3, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                }
                    else if (currentEmotion === 'worry'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [2, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                }
                    else if (currentEmotion === 'inlove'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [3, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                }
                    else if (currentEmotion === 'angry'){
                        console.log(currentEffect);
                        stopEffect(currentEffect);

                        const numbers = [0, 4];
                        const randomIndex = Math.floor(Math.random() * numbers.length); // Chỉ gọi một lần
                        const newEffect = effect[numbers[randomIndex]]; // Lưu kết quả vào biến

                        startEffect(newEffect);
                        console.log(newEffect);

                        currentEffect = newEffect; // Cập nhật currentEffect
                }
                }
    
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
            document.getElementById('loading').classList.remove('active');
            document.getElementById('chat-input').classList.remove('hidden');
            chatInput.value = ""; // Xóa nội dung sau khi gửi
        }
    });
    
});


function setDefaultBackground() {
    let bgOverlay = document.getElementById("background-overlay");
    let img = new Image();
    img.src = "assets/backgrounds/happy/bg1.jpg"; 
    img.crossOrigin = "Anonymous"; // Nếu cần tránh lỗi CORS

    img.onload = function () {
        bgOverlay.style.backgroundImage = `url(${img.src})`;
        adjustBrightness(img, bgOverlay); // Gọi sau khi ảnh đã tải xong
    };
}


function setDefaultSong() { 
    audio.play();
    updateSong();
}




function togglePopup(button) {
    document.querySelectorAll(".button").forEach(btn => {
        if (btn !== button) {
            btn.classList.remove("active");
        }
    });

    button.classList.toggle("active");
}

function toggleSelection(type) {
    let menu = document.querySelector(`.select-${type}`);

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        setTimeout(() => {
            menu.style.display = "none";
        }, 300);
    } else {
        document.querySelectorAll(".select-background, .select-music, .select-effect").forEach(item => {
            item.classList.remove("active");
            item.style.display = "none";
        });

        menu.style.display = "flex";
        setTimeout(() => {
            menu.classList.add("active");
        }, 10);
    }
}

// 🎵 Xử lý khi chọn icon cảm xúc (cập nhật cả nhạc & hình nền)
document.querySelectorAll(".emotion").forEach(emotion => {
    emotion.addEventListener("click", function () {
        let type = this.dataset.type;
        let value = this.dataset.value;

        if (type === "background") {
            changeBackground(value);
        } 
        if (type === "music") {
            changeMusic(value);
            updateSong();
        }
    });
});

// 🎵 Cập nhật bài hát theo cảm xúc
let currentEmotion = "happy"; // Mặc định là "happy"
let trackList = songs[currentEmotion].map(track => track.file);
let currentTrackIndex = 0;
const audio = new Audio(trackList[currentTrackIndex]);
let isPlaying = true;

// 🎨 Cập nhật background theo cảm xúc
let lastBg = ""; // Lưu ảnh nền trước đó
let lastTrack = ""; // Lưu bài hát trước đó

function changeBackground(emotion) {
    if (!backgrounds[emotion] || backgrounds[emotion].length === 0) {
        console.log("⚠ Không có background cho cảm xúc này!");
        return;
    }

    let bgOverlay = document.getElementById("background-overlay");

    // Lọc ảnh không trùng với ảnh cũ
    let availableBgs = backgrounds[emotion].filter(bg => bg.file !== lastBg);
    if (availableBgs.length === 0) availableBgs = backgrounds[emotion];

    let randomBg = availableBgs[Math.floor(Math.random() * availableBgs.length)].file;

    // Thêm hiệu ứng fade-out trước khi đổi ảnh
    bgOverlay.style.animation = "fadeOutBackground 0.8s ease-in-out";

    setTimeout(() => {
        let img = new Image();
        img.crossOrigin = "Anonymous"; // Tránh lỗi CORS khi load ảnh
        img.src = randomBg;

        img.onload = function () {
            // Cập nhật ảnh nền
            bgOverlay.style.backgroundImage = `url(${randomBg})`;
            bgOverlay.style.animation = "fadeInBackground 1s ease-in-out";
            console.log(`🎨 Đang hiển thị background theo cảm xúc: ${emotion}`);

            // Đo sáng và điều chỉnh độ sáng
            adjustBrightness(img, bgOverlay);
        };

        lastBg = randomBg;
        currentEmotion = emotion;
    }, 300); // Chờ fade-out hoàn tất trước khi đổi ảnh
    isPlaying= true;
    updatePlayPauseIcon()
}

function adjustBrightness(img, bgOverlay) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    let brightness = 0;
    let totalPixels = pixels.length / 4; // Mỗi pixel có 4 giá trị (R, G, B, A)

    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        brightness += (r * 0.299 + g * 0.587 + b * 0.114);
    }
    brightness = brightness / totalPixels;

    console.log("Độ sáng ảnh:", brightness);

    if (brightness > 200) {
        bgOverlay.style.filter = "brightness(40%)"; // Rất sáng → Giảm mạnh
    } else if (brightness > 180) {
        bgOverlay.style.filter = "brightness(60%)"; // Trung bình sáng → Giảm nhẹ
    } else {
        bgOverlay.style.filter = "brightness(80%)"; // Ảnh tối rồi → Giữ nguyên
    }
}






// 🎵 Đổi nhạc (tránh trùng bài cũ)
function changeMusic(emotion) {
    if (!songs[emotion] || songs[emotion].length === 0) {
        console.log("⚠ Không có nhạc cho cảm xúc này!");
        return;
    }

    // Lấy danh sách bài hát theo cảm xúc
    let allTracks = songs[emotion];

    // Lọc bài không trùng với bài trước
    let availableTracks = allTracks.filter(track => track.file !== lastTrack);
    if (availableTracks.length === 0) availableTracks = allTracks;

    let randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)].file;

    // 🔥 Hiệu ứng fade-out trước khi đổi bài
    let fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fadeOutInterval); // Dừng fade-out khi gần về 0
            audio.src = randomTrack; // Đổi bài mới
            audio.play();
            lastTrack = randomTrack;
            console.log(`🎵 Đang phát nhạc theo cảm xúc: ${emotion}`);
            // 🔥 Hiệu ứng fade-in khi phát bài mới
            let fadeInInterval = setInterval(() => {
                if (audio.volume < 1) {
                    audio.volume += 0.1;
                } else {
                    clearInterval(fadeInInterval); // Dừng fade-in khi đạt mức tối đa
                }
            }, 100);
        }
    }, 100);

    currentEmotion = emotion;
    trackList = allTracks.map(track => track.file);
    currentTrackIndex = trackList.indexOf(randomTrack);

    console.log(`🎵 Đang phát nhạc theo cảm xúc: ${emotion}`);
    updateSong();
    isPlaying = true;
    updatePlayPauseIcon();
}




// 🎵 Cập nhật tên bài hát hiển thị
// 🎵 Cập nhật cảm xúc hiển thị
function updateEmotion() {
    const trackElement = document.getElementById("current-track");

    if (!trackElement) {
        console.warn("Không tìm thấy phần tử #current-track");
        return;
    }

    // Thêm hiệu ứng mờ dần (fade-out)
    trackElement.classList.add("fade-out");

    setTimeout(() => {
        // Sau khi mờ dần xong, đổi chữ
        trackElement.textContent = currentEmotion;

        // Xóa fade-out, thêm fade-in để chữ mới xuất hiện
        trackElement.classList.remove("fade-out");
        trackElement.classList.add("fade-in");

        // Sau khi fade-in xong, xóa class để dùng lại cho lần sau
        setTimeout(() => {
            trackElement.classList.remove("fade-in");
        }, 500);
    }, 500); // Thời gian trùng với animation fade-out
}

function updateSong() {
    const trackElement = document.getElementById("title-song");

    if (!trackElement) {
        console.warn("⚠ Không tìm thấy phần tử #title-song!");
        return;
    }

    if (!songs[currentEmotion] || !songs[currentEmotion][currentTrackIndex]) {
        console.warn("⚠ Không tìm thấy bài hát tương ứng với cảm xúc:", currentEmotion);
        return;
    }

    const song = songs[currentEmotion][currentTrackIndex];
    trackElement.textContent = `${song.title} - ${song.artist}`;
}




// 🎵 Xử lý phát nhạc
const prevBtn = document.getElementById("prev");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");

// ⏯ Xử lý nút Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
});

// ⏮ Xử lý nút Previous (chuyển bài mượt)
prevBtn.addEventListener("click", () => {
    fadeOutAndChangeTrack(-1);
    updateSong();
});

// ⏭ Xử lý nút Next (chuyển bài mượt)
nextBtn.addEventListener("click", () => {
    fadeOutAndChangeTrack(1);
    updateSong();
});

// 🔄 Khi bài hát kết thúc, tự động chuyển bài tiếp theo với hiệu ứng mượt
audio.addEventListener("ended", () => {
    fadeOutAndChangeTrack(1);
    updateSong();

    

});

document.addEventListener("DOMContentLoaded", function () {
    const effectButtons = document.querySelectorAll(".select-effect .emotion");
    let currentEffect = null;

    // Danh sách âm thanh
    const soundEffects = {
        rain: new Audio('assets/sounds/rain.mp3'),
        rainofstorm: new Audio('assets/sounds/rainofstorm.mp3'),
        lightning: new Audio('assets/sounds/lightning.mp3'),
        windofstorm: new Audio('assets/sounds/windofstorm.mp3'),
        wind: new Audio('assets/sounds/wind.mp3'),
        snow: new Audio('assets/sounds/snow.mp3')
    };

    soundEffects.rain.loop = true;
    soundEffects.rainofstorm.loop = true;
    soundEffects.wind.loop = true;
    soundEffects.snow.loop = true;
    soundEffects.windofstorm.loop = true;
    soundEffects.rain.volume = 0.2;
    soundEffects.rainofstorm.volume = 0.8;
    soundEffects.wind.volume = 1;
    soundEffects.snow.volume = 0.2;
    soundEffects.lightning.volume = 0.2;
    soundEffects.windofstorm.volume = 0.3;
    

    if (effectButtons.length > 0) {
        effectButtons.forEach(button => {
            button.addEventListener("click", function () {
                let effectType = this.getAttribute("data-type");
                let effectValue = this.getAttribute("data-value");

                console.log(`Chọn hiệu ứng: ${effectValue}`);
                toggleEffect(effectType, effectValue);
            });
        });
    } else {
        console.warn("⚠ Không tìm thấy nút hiệu ứng!");
    }

    function toggleEffect(type, value) {
        if (!type || !value) {
            console.warn("⚠ Thông tin hiệu ứng không hợp lệ!", type, value);
            return;
        }

        // Nếu hiệu ứng đang chạy là hiệu ứng vừa chọn => tắt hiệu ứng
        if (currentEffect === value) {
            stopEffect(value);
            currentEffect = null;
        } else {
            // Nếu có hiệu ứng khác đang chạy => tắt nó trước
            if (currentEffect) stopEffect(currentEffect);

            // Bật hiệu ứng mới
            startEffect(value);
            currentEffect = value;
        }
    }

    window.startEffect = function (value) {
        switch (value) {
            case "rain":
                startRainEffect();
                soundEffects.rain.play();
                currentEffect='rain';
                console.log('mưa ròi')
                break;
            case "storm":
                startStormEffect();
                soundEffects.rainofstorm.play();
                soundEffects.windofstorm.play();
                currentEffect='storm';
                break;
            case "wind":
                startWindEffect();
                soundEffects.wind.play();
                currentEffect='wind';
                break;
            case "snow":
                startSnowEffect();
                soundEffects.snow.play();
                currentEffect='snow';
                break;
            case " ":
                stopEffect();
            default:
                console.warn("⚠ Không có hiệu ứng phù hợp:", value);
        }
    }

    window.stopEffect=function (value) {
        switch (value) {
            case "rain":
                stopRainEffect();
                if(soundEffects.rain){
                soundEffects.rain.pause();
                soundEffects.rain.currentTime = 0;
                }
                break;
            case "storm":
                stopStormEffect();
                if(soundEffects.rainofstorm && soundEffects.windofstorm){
                soundEffects.rainofstorm.pause();
                soundEffects.windofstorm.pause();
                soundEffects.rainofstorm.currentTime = 0;
                soundEffects.windofstorm.currentTime = 0;
                }
                break;
            case "wind":
                stopWindEffect();
                if(soundEffects.wind){
                soundEffects.wind.pause();
                soundEffects.wind.currentTime = 0;
                }
                break;
            case "snow":
                stopSnowEffect();
                if(soundEffects.snow){
                soundEffects.snow.pause();
                soundEffects.snow.currentTime = 0;
                }
                break;
            case '':
                stopEffect();
        }
    }

    function startRainEffect() {
        console.log("🌧 Kích hoạt hiệu ứng mưa...");
        if (!document.getElementById("rain-effect")) {
            let rainEffect = document.createElement("div");
            rainEffect.id = "rain-effect";
            document.body.appendChild(rainEffect);
        }
    }
    
    function stopRainEffect() {
        console.log("🌧 Tắt hiệu ứng mưa...");
        let rainEffect = document.getElementById("rain-effect");
        if (rainEffect) rainEffect.remove();
    }
    
    function startRainofStormEffect() {
        console.log("🌧 Kích hoạt hiệu ứng mưa kèm bão...");
        if (!document.getElementById("rain-effect-1")) {
            let rainEffect = document.createElement("div");
            rainEffect.id = "rain-effect-1";
            document.body.appendChild(rainEffect);
        }
    }
    
    function stopRainofStormEffect() {
        console.log("🌧 Tắt hiệu ứng mưa kèm bão...");
        let rainEffect = document.getElementById("rain-effect-1");
        if (rainEffect) rainEffect.remove();
    }
    
    let stormActive = false; // Biến kiểm tra hiệu ứng bão

function startStormEffect() {
    if (stormActive) return; // Nếu đã chạy, không chạy lại
    stormActive = true;
    
    console.log("⛈ Kích hoạt hiệu ứng bão...");
    startRainofStormEffect();
    
    let storm = document.getElementById("storm-effect");
    if (!storm) {
        storm = document.createElement("div");
        storm.id = "storm-effect";
        document.body.appendChild(storm);
    }

    function showStormEffect() {
        if (!stormActive) return; // Nếu đã bị tắt, dừng ngay lập tức

        // Đặt vị trí ngẫu nhiên trên màn hình
        let randomX = Math.random() * 60; // Trong khoảng 0 - 60% ngang
        let randomY = 0; // Trong khoảng 0 - 60% dọc
        storm.style.left = `${randomX}vw`;
        storm.style.top = `${randomY}vh`;

        // Hiện hiệu ứng
        storm.style.display = "block";
        soundEffects.lightning.play();

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            soundEffects.lightning.pause();
            soundEffects.lightning.currentTime = 0;
            storm.style.display = "none";
            if (stormActive) {
                // Lặp lại hiệu ứng sau 5-6 giây nếu vẫn đang bật
                setTimeout(showStormEffect, Math.random() * 1000 + 5000);
            
            }
        }, 3000);
    }

    showStormEffect(); // Bắt đầu hiệu ứng bão
}

function stopStormEffect() {
    console.log("⛈ Tắt hiệu ứng bão...");
    stormActive = false; // Đánh dấu đã tắt
    
    stopRainofStormEffect();
    
    let stormEffect = document.getElementById("storm-effect");
    if (stormEffect) stormEffect.remove();
}

    function startWindEffect() {
        console.log("💨 Kích hoạt hiệu ứng gió...")
        if (!document.getElementById("wind-effect")) {
            let windEffect = document.createElement("div");
            windEffect.id = "wind-effect";
            document.body.appendChild(windEffect);
            }
    }

    
    function stopWindEffect() {
        console.log("💨 Tắt hiệu ứng gió...");
        let windEffect = document.getElementById("wind-effect");
        if (windEffect) windEffect.remove();
    }
    
    function startSnowEffect() {
        console.log("❄ Kích hoạt hiệu ứng tuyết...");
        if (!document.getElementById("snow-effect")) {
            let snowEffect = document.createElement("div");
            snowEffect.id = "snow-effect";
            document.body.appendChild(snowEffect);
        }
    }
    
    function stopSnowEffect() {
        console.log("❄ Tắt hiệu ứng tuyết...");
        let snowEffect = document.getElementById("snow-effect");
        if (snowEffect) snowEffect.remove();
    }
    
});


// 🎵 Cập nhật bài hát khi chuyển bài
function fadeOutAndChangeTrack(direction) {
    let fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fadeOutInterval);

            // Cập nhật index bài hát mới
            currentTrackIndex = (currentTrackIndex + direction + trackList.length) % trackList.length;

            // Đổi bài hát
            changeTrack();
        }
    }, 100);
}

// 🎵 Hàm đổi bài hát (có fade-in)
function changeTrack() {
    audio.src = trackList[currentTrackIndex];
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();

    // Đặt âm lượng về 0 trước khi fade-in
    audio.volume = 0;

    let fadeInInterval = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(audio.volume + 0.1, 1); // Giới hạn tối đa là 1.0
        } else {
            clearInterval(fadeInInterval);
        }
    }, 100);
    updateSong();
}

// ⏯ Cập nhật icon Play/Pause
function updatePlayPauseIcon() {
    const img = playPauseBtn.querySelector("img");
    img.src = isPlaying ? "assets/icons/IU/pause-icon.jpg" : "assets/icons/IU/play-icon.jpg";
}







setDefaultBackground();
setDefaultSong();

