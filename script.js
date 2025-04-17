const glass1 = document.getElementById('g1');
const glass2 = document.getElementById('g2');
const glass3 = document.getElementById('g3');
const glasses = document.querySelectorAll('.glass');
const gameSpaceElement = document.getElementById('game-space');
const levelElement = document.querySelector('.level');

let focusedGlassAndColor = ''
let winItemLimit = 3; //no. of win can be possible
let targetGlass = '';
let isFocused = false;
let winGlassId = [];
let currentLevel = extractNumber(levelElement.innerText);
function extractNumber(str) {
    const match = str.match(/\d+/); // match the first sequence of digits
    return match ? parseInt(match[0]) : null;
}
function removeFocusedStyle() {
    glasses.forEach((glass)=>{
        if(glass.childElementCount > 0) {
           for(let i=0; i<glass.childElementCount; i++) {
                glass.children.item(i).classList.remove('focused');
           }
        }
    });
};
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

function goNextLevel(currentLevel) {
    currentLevel += 1;
    const page = `/level${currentLevel}.html`;
    safeRedirect(page,'index.html');
    
}


function isWin () {
    
    for(let i=0; i<glasses.length; i++) {
        let currGlass = glasses[i];
        if(!winGlassId.includes(currGlass.id)) {
            if(currGlass.childElementCount === 3) {
                
                if
                (
                    currGlass.children.item(0).id === 
                    currGlass.children.item(1).id
                    &&
                    currGlass.children.item(1).id ===
                    currGlass.children.item(2).id

                ) {
                    currGlass.classList.add('disable');
                    winItemLimit--;
                    winGlassId.push(currGlass.id);
                    // if(winItemLimit === 0) {
                    //     alert('congratulations!🎉 You Win..');
                    // } 
                    console.log('done'+currGlass.id);
                    return winItemLimit;
                }
                
            }
            
        }
    }
}
function vanish() {
    document.body.innerHTML = ''
}
glasses.forEach((glass)=>{

    
    glass.addEventListener('click',async()=>{       
        
        if(!isFocused) {
            if(glass.childElementCount>0) {
                focusedGlassAndColor = glass.lastElementChild;
                glass.lastElementChild.classList.add('focused');
                isFocused = true;
            }
            
        }else {
        if(glass.childElementCount === 0) {
                glass.appendChild(focusedGlassAndColor);
            
                removeFocusedStyle();
                isFocused = false; 
                if(isWin() === 0) {
                    setTimeout(()=>{
                        alert(`congratulations! 🎉 You Win!`)
                    },1000);
                    
                }
                
        }else if(glass.childElementCount > 0 && glass.childElementCount <3) {
                if(glass.lastElementChild.id === focusedGlassAndColor.id) {
                    glass.appendChild(focusedGlassAndColor);
                    
                    removeFocusedStyle();
                    isFocused = false;
                    if(isWin()===0) {
                        
                        setTimeout(()=>{
                            alert(`congratulations! 🎉 You Win!`)
                            goNextLevel(currentLevel)
                        },200);
                            
                    }          
                }
        }
        removeFocusedStyle();
        isFocused = false;
        }
        
        
    });


});









