const startBtn = document.querySelector('.start-btn');
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
startBtn.addEventListener('click', ()=>{
   safeRedirect('level1.html','index.html');
})