// Select elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speech synthesis function
function speak(text) {
  let textSpeak = new SpeechSynthesisUtterance(text);
  textSpeak.rate = 1;
  textSpeak.pitch = 1;
  textSpeak.volume = 1;
  textSpeak.lang = "hi-GB";
  window.speechSynthesis.speak(textSpeak);
}

// Wish user based on time of day
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

// Speech recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Handle speech recognition results
recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

// Start speech recognition on button click
btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

// Handle user commands
function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  // Handle greetings
  if (message.includes("hello") || message.includes("hey") || message.includes("kaise ho") || message.includes("whats up")) {
    speak("Hello Sir, What can I help you?");
  }

  // Handle introductions
  else if (message.includes("who are you")) {
    speak("I am virtual assistant, created by Sujon sir");
  }
// Handle introductions
else if (message.includes("tell me my ma'am name") || message.includes("tell me my ma'am name")) {
    speak("The name of your lovely HTML ma'am is Sheetal Chouhan");
  } 
  
  // Handle introductions
  else if (message.includes("tell me my friend name") || message.includes("Tell me my friend name")) {
    speak("appke pass koi friend nahi hai jo hai sab bhai hai");
  }
    // Handle introductions
    else if (message.includes("tell me my brother name") || message.includes("Tell me my brother name")) {
      speak("Suman");
    }
        // Handle introductions
        else if (message.includes("your name") || message.includes("your name")) {
          speak("I am Tom your virtual asistant");
        }
 // Handle introductions
    else if (message.includes("tell me the most beautiful girl name") || message.includes("tell me the most beautiful girl name")) {
      speak("Soumi");
    }
  // Handle website openings
  else if (message.includes("open youtube")) {
    speak("Opening youtube...");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening google...");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open playstore")) {
    speak("Opening playstore...");
    window.open("https://play.google.com/", "_blank");
  } else if (message.includes("open freefire")) {
    speak("Opening freefire...");
    window.open("https://ff.garena.com/", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("Opening whatsapp...");
    window.open("https://web.whatsapp.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening facebook...");
    window.open("https://www.facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening instagram...");
    window.open("https://www.instagram.com/accounts/edit/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening calculator...");
    window.open("calculator://");
  }
 
    // window.open("camera://");
    else if (message.includes("open camera")) {
      speak("Opening camera...");
      
      // Access the user's camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
              let videoElement = document.createElement('video');
              videoElement.srcObject = stream;
              videoElement.play();
              
              // Add the video element to the content section of the page
              content.innerHTML = ''; // Clear previous content
              content.appendChild(videoElement);
          })
          .catch(function(err) {
              speak("Unable to access the camera.");
              console.error("Error accessing the camera: " + err);
          });
      } else {
          speak("Camera access is not supported in this browser.");
      }
  }
  
  
 else if (message.includes("open amazon")) {
  speak("Opening amazon...");
  window.open("https://www.amazon.in/", "_blank");
} else if (message.includes("open flipkart")) {
  speak("Opening flipkart...");
  window.open("https://www.flipkart.com/", "_blank");
} 

  // Handle time and date queries
  else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
    speak(date);
  }

  // Handle general queries
  else {
    let finalText = "This is what I found on the internet regarding " + message.replace("Tom", "");
    speak(finalText);
    window.open(`https://www.google.co.in/search?q=${message.replace("Tom", "")}`, "_blank");
  }

  // Add a small delay before stopping speech recognition
  setTimeout(() => {
    recognition.stop();
  }, 2000);
}

// Start speech recognition on page load
window.addEventListener("load", () => {
  wishMe();
  recognition.start();
});