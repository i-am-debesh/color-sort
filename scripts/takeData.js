let selectedGender = null;

function selectGender(gender) {
    selectedGender = gender;

    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    const index = gender === 'male' ? 0 : 1;
    document.querySelectorAll('.option')[index].classList.add('selected');

    checkForm();
}

function checkForm() {
    const name = document.getElementById("playerName").value.trim();
    const btn = document.getElementById("continueBtn");

    btn.disabled = !(name && selectedGender);
}
function savePlayer() {
    const name = document.getElementById("playerName").value.trim();
    const avatar = selectedGender === 'male' ? '/images/avatars/boy.png' : '/images/avatars/girl.png';

    const player = {
    name,
    gender: selectedGender,
    avatar,
    currentLevel: 1,
    score: 0
    };

    localStorage.setItem("player", JSON.stringify(player));
    alert("Player saved! 🎮");
    location.reload();
}