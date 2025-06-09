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
});
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