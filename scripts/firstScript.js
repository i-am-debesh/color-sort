const startBtn = document.querySelector('.start-btn');
const avatarImg = document.getElementById('avatar-img');
const levelElements = document.querySelectorAll('.level');
const eraseBtn = document.querySelector('.erase-btn');
const editBtn = document.querySelector('.edit-btn');

levelElements.forEach(level=>{
    level.addEventListener('click',()=>{
        safeRedirect(`level${extractNumber(level.innerHTML)}.html`,'index.html');
    })
})
function safeRedirect(targetUrl, fallbackUrl) {
    fetch(targetUrl, { method: 'HEAD' }) // Only checks headers, faster than GET
      .then(response => {
        if (response.ok) {
          // Page exists, go ahead
          window.location.href = targetUrl;
        } else {
          // Page does not exist (404 or similar)
          window.location.href = fallbackUrl;
        }
      })
      .catch(error => {
        // Network error or invalid URL
        console.error("Redirect failed:", error);
        window.location.href = fallbackUrl;
      });
}

let formElement = 
`
    <h2>Enter Your Details</h2>

    <div class="input-group">
        <input type="text" id="playerName" placeholder="Enter your name" oninput="checkForm()" />
    </div>

    <div class="gender-select">
        <div class="option" onclick="selectGender('male')">
        <img src="/images/avatars/boy.png" alt="Male">
        <div class="label">Male</div>
        </div>
        <div class="option" onclick="selectGender('female')">
        <img src="/images/avatars/girl.png" alt="Female">
        <div class="label">Female</div>
        </div>
    </div>
    <button class="continue-btn" id="continueBtn" onclick="savePlayer()" disabled>Continue</button>
`;
function extractNumber(str) {
    const match = str.match(/\d+/); // match the first sequence of digits
    return match ? parseInt(match[0]) : null;
}

function isPlayerAvailable() {
    const playerData = localStorage.getItem("player");
    return playerData !== null;
}
function loadPlayerDetailes() {
    if(!isPlayerAvailable()) {
        document.body.innerHTML = formElement;
    }
    else {
        const playerdata = JSON.parse(localStorage.getItem("player"));
        //console.log(playerdata);
        
        avatarImg.src = playerdata.avatar;
        document.querySelector('.player-name').innerHTML = playerdata.name;

        levelElements.forEach((level)=>{
            let currentLevel = extractNumber(level.innerText);
            if(currentLevel > playerdata.currentLevel) {
                level.classList.add('disable');
            }
        })
        
    }
}
loadPlayerDetailes();


//Erase Button::
eraseBtn.addEventListener('click',()=>{
    localStorage.clear();
    alert('all data erased successfully!');
    location.reload();
});

//Edit-btn::
editBtn.addEventListener('click', ()=>{
    const newName = prompt('Edit Your Name');
    const playerdata = JSON.parse(localStorage.getItem("player"));

    if(playerdata) {
        if(newName) {
            playerdata.name = newName;
            localStorage.setItem("player", JSON.stringify(playerdata));
            location.reload();
        }
        
    }else {
        alert('no player found!');
    }
     
});

//console.log(localStorage);
