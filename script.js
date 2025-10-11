const pet = document.querySelector('.pet');
const wrapper = document.querySelector('.pet-wrapper');

let url = 'https://api.sheety.co/503cd683d77f4feeb101a928a19c01b6/messageBank/sheet1';
let dailyMessage = "Personal Panda thinks that Esther has a beautiful soul... and a beautiful big face. I want to squeeze it"; // Default fallback

async function loadDailyMessage() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const messages = json.sheet1;
    const today = new Date();

    const todaysMessageObj = messages.find(msg => {
      const msgDate = new Date(msg.date);
      return msgDate.toDateString() === today.toDateString();
    });
    
    dailyMessage = todaysMessageObj ? todaysMessageObj.message : "Personal Panda thinks that Esther has a beautiful soul... and a beautiful big face. I want to squeeze it";
    return dailyMessage;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return dailyMessage; // Return fallback
  }
}

loadDailyMessage();

// async function fetchMessages() {
//   try {
//     const response = await fetch('/api/getMessages');
//     const data = await response.json();
//     console.log('Messages from server:', data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchMessages();


pet.addEventListener('click', () => {
  const existingHeart = wrapper.querySelector('.heart');
  if (existingHeart) {
    existingHeart.remove();
  }
  const heart = document.createElement('div');
  heart.classList.add('heart');
  wrapper.appendChild(heart);
  console.log(pet, wrapper);



  if (currentFrame < barFrames.length - 1) {
    currentFrame++;
    loveBar.style.backgroundImage = `url(${barFrames[currentFrame]})`;
  }  
  
  if (currentFrame >= 5) {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.textContent = dailyMessage;
    wrapper.appendChild(dialog);
  }


});

const loveBar = document.createElement('div');
loveBar.classList.add('love-bar');
wrapper.appendChild(loveBar);

const barFrames = [
  './heart-bar-1.png.png',
  './heart-bar-2.png.png',
  './heart-bar-3.png.png',
  './heart-bar-4.png.png',
  './heart-bar-5.png.png',
  './heart-bar-6.png.png'
];

let currentFrame = 0;
loveBar.style.backgroundImage = `url(${barFrames[currentFrame]})`;
loveBar.style.width = '128px';
loveBar.style.height = '128px';
loveBar.style.backgroundSize = 'cover';
loveBar.style.cursor = 'pointer';

