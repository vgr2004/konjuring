
document.addEventListener('DOMContentLoaded', function() {
    const audioFile = 'gameintrosound.mp3';
    const audio = new Audio(audioFile);
    audio.play();
});

document.getElementById('signInForm').addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const nickname = document.getElementById("nickname").value;

    const user = {
        name: name,
        nickname: nickname
    };
    localStorage.setItem("user",JSON.stringify(user));

    console.log(user);
    window.location.href = "game.html";

});