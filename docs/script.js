// Set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();
/**
 * Copies text to the clipboard and shows a temporary "Copied!" message.
 * @param {string} text - The text to copy.
 * @param {HTMLElement} messageElement - The element to show the "Copied!" message in.
 */
function copyToClipboard(text, messageElement) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy'); // Use execCommand for broader iframe compatibility
    document.body.removeChild(tempInput);
    messageElement.textContent = 'Copied!';
    messageElement.classList.add('show');
    setTimeout(() => {
        messageElement.classList.remove('show');
        messageElement.textContent = ''; // Clear text after fading
    }, 1500);
}
// Dropdown Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-dropdown');
    toggleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if applicable
            const targetId = button.dataset.target;
            const dropdownContent = document.getElementById(targetId);
            const chevronIcon = button.querySelector('.chevron-icon');
            // Close any currently open dropdowns, unless it's the one just clicked
            document.querySelectorAll('.dropdown-content.open').forEach(openDropdown => {
                if (openDropdown.id !== targetId) {
                    openDropdown.classList.remove('open');
                    const associatedButton = document.querySelector(`[data-target="${openDropdown.id}"]`);
                    if (associatedButton) {
                        associatedButton.querySelector('.chevron-icon').style.transform = 'rotate(0deg)';
                    }
                }
            });
            // Toggle the clicked dropdown
            dropdownContent.classList.toggle('open');
            // Rotate chevron icon based on dropdown state
            if (dropdownContent.classList.contains('open')) {
                chevronIcon.style.transform = 'rotate(180deg)';
            } else {
                chevronIcon.style.transform = 'rotate(0deg)';
            }
        });
    });
    loadCounter();
    setTimeout(()=>{
      loadChecking();
      setInterval(()=>{
        loadChecking();
      },10000)
    },2500)
});
let possibilities = [
  `🟢 {ONLINE} heroes deciding how much XP to drop on us.`,
  `🟢 {ONLINE} people thinking: “Maybe just one pizza won’t hurt…”`,
  `🟢 {ONLINE} people are exploring ways to support AlonsoAliaga Development.`,
  `🟢 {ONLINE} minds are considering fueling our next big idea.`,
  `🟢 {ONLINE} people just one click away from becoming absolute legends.`,
  `🟢 {ONLINE} players exploring ways to enchant our development.`,
  `🟢 {ONLINE} users pretending they don’t see the donate button.`,
  `🟢 {ONLINE} players stuck in AFK mode at the donation page.`,
  `🟢 {ONLINE} players online — imagine if each chipped in 1 emerald.`,
  `🟢 {ONLINE} players viewing the donation page — no pressure 😏`,
  `🟢 {ONLINE} people enjoying these tools — one tip can keep them going.`,
  `🟢 {ONLINE} online. Imagine the enchantments your support unlocks.`,

  //New ones
  `🟢 {ONLINE} brave souls one click away from unlocking Developer’s Grace IV.`,
  `🟢 {ONLINE} pros online. Be the one who enchants our next release.`,
  `🟢 {ONLINE} online now — join our hall of supporters with one small gesture.`,
  `🟢 {ONLINE} heroes online. None have thrown emeralds… yet.`,
  `🟢 {ONLINE} watching closely. Be the one who gets the secret achievement.`,
  `🟢 {ONLINE} curious minds are currently trying to read this incredibly long message, which exists solely to delay you just enough to think “maybe I *should* donate,” while also making you wonder how long this message actually is, and whether there’s a secret at the end — spoiler: there isn’t, unless you count the warm feeling you’ll get after clicking that little donation button and knowing you helped a dev not cry into their keyboard tonight.`
]
function randomMessage() {
  return possibilities[crypto.getRandomValues(new Uint32Array(1))[0] % possibilities.length];
  //return possibilities[Math.floor(Math.random() * possibilities.length)];
}
if(false) {
  let m = new Map();
  for(let i = 0; i < 100; i++) {
    let message = randomMessage();
    if(!m.has(message)) m.set(message,0);
    m.set(message,m.get(message) + 1);
  }
  for(let [k,v] of m) {
    console.log(`${k.replace(/{ONLINE}/g,"7")}: ${v}`)
  }
}
function loadChecking() {
 let href = window.location.href;
 //if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5Pg==")
  .replace(/<site>/g,"donate").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        if(isNaN(result)) {
         counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
         counter.style.backgroundColor = "yellow";
        }else{
         //counter.textContent = `🟢 ${result} user${result==1?``:`s`} online using our Minecraft Profile Picture Generator!`;
         counter.textContent = randomMessage().replace(/{ONLINE}/g,result);
         counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+")
  .replace(/<site>/g,"donate").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}