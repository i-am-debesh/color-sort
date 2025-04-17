const glass1 = document.getElementById('g1');
const glass2 = document.getElementById('g2');
const glass3 = document.getElementById('g3');
const glasses = document.querySelectorAll('.glass');
const gameSpaceElement = document.getElementById('game-space');
const levelElement = document.querySelector('.level');
const restartBtn = document.getElementById('restart-btn');

restartBtn.addEventListener('click', ()=>{
    location.reload(); 
});
let focusedGlassAndColor = ''

let targetGlass = '';
let isFocused = false;
let winGlassId = [];
let colorCount = 3;

let currentLevel = extractNumber(levelElement.innerText);
currentLevel >= 6?colorCount=4:colorCount=3;
let winItemLimit = colorCount; //no. of win can be possible
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

function allEqual(arr) {
    return arr.every(val => val === arr[0]);
}

function isWin () {
    
    for(let i=0; i<glasses.length; i++) {
        let currGlass = glasses[i];
        if(!winGlassId.includes(currGlass.id)) {
            //for Three colors
            if(colorCount === 3 && currGlass.childElementCount === 3) {
                let colorIds = [];
                for(let c=0; c<colorCount; c++) {
                    colorIds.push(currGlass.children.item(c).id);
                }
                if(allEqual(colorIds)) {
                    currGlass.classList.add('disable');
                    winItemLimit--;
                    winGlassId.push(currGlass.id);
                    console.log('done'+currGlass.id);
                    return winItemLimit;
                }                
            }
            //for four colors::
            else if( colorCount === 4 && currGlass.childElementCount === 4) {
                let colorIds = [];
                for(let c=0; c<colorCount; c++) {
                    colorIds.push(currGlass.children.item(c).id);
                }
                if(allEqual(colorIds)) {
                    currGlass.classList.add('disable');
                    winItemLimit--;
                    winGlassId.push(currGlass.id);
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
                
        }else if(glass.childElementCount > 0 && glass.childElementCount <colorCount) {
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









