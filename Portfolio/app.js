(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = (chatbox.style.display === 'none') ? 'block' : 'none';
}

function closeChat() {
    document.getElementById('chatbox').style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    input.value = '';

    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML += `<p>You: ${message}</p>`;

    const response = await fetch('https://api.together.ai/chat', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer c77c75f9e4d3efcc7af68bf895325c9f923f51f0a52b75439091025bbbaa6d06',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    chatBody.innerHTML += `<p>Bot: ${data.reply}</p>`;
}
