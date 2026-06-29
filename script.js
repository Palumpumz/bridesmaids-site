let userName = "";

const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const popup = document.getElementById("popup");
const nameInput = document.getElementById("nameInput");
const nameButton = document.getElementById("nameButton");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    popup.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

nameButton.addEventListener("click", () => {
    let name = nameInput.value.trim();
    if (name === "") {
        alert("Please enter your name 💕");
        nameInput.focus();
        return;
    }
    
    userName = name;

    //Change "Sarah" to be your Maid of Honor name
    if (name.toLowerCase() === "Sarah" || name.toLowerCase() === "Sarah Jane") {
        title.textContent = `Will you be my Maid of Honor, ${userName}?`;
    }
    else {
        title.textContent = `Will you be my Bridesmaid, ${userName}?`;
    }


    title.textContent = `Will you be my Bridesmaid, ${userName}?`;
    popup.style.display = "none";
    envelope.style.display = "none";
    document.getElementById("nameInput").value = nameInput.value;
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

async function sendResult(answer) {

    const data = {
        // put your acceess key from web3form
        access_key: "access_key_value",
        name: userName,
        result: answer,
        subject: "Bridesmaid Response"
    };

    try {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Email sent:", result);

    } catch (error) {
        console.log("Error:", error);
    }
}

const messages = [
    "Are you Sure?",
    "Really Sure?",
    "Think again, please?",
    "Last Chance!",
    "Please?"
];

let noClickCount = 0;

noBtn.addEventListener("click", () => {

    if (noClickCount < messages.length) {
        noBtn.textContent = messages[noClickCount];
        noClickCount++;

        let yesScale = 1 + noClickCount * 0.10;
        yesBtn.style.transform = `scale(${yesScale})`;

        let noScale = Math.max(0.5, 1 - noClickCount * 0.05);
        noBtn.style.transform = `scale(${noScale})`;

    } else {
        noBtn.textContent = "No";

        title.textContent = "Aww 😢";
        buttons.style.display = "none";
        catImg.src = "sad.gif";
        finalText.textContent = "I'm so sad that you said no T^T"
        finalText.style.display = "block";
        sendResult("NO");
    }
});

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "happy.gif";
    // Check if the user is the Maid of Honor
    if (userName.toLowerCase() === "Sarah" || userName.toLowerCase() === "Sarah Jane") {
        finalText.textContent = "Can't wait to have you as my Maid of Honor!";
    }
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    sendResult("YES");
});
