const panda = document.querySelector('.panda');
const wrapper = document.querySelector('.panda-wrapper');

let url = 'https://api.sheety.co/503cd683d77f4feeb101a928a19c01b6/messageBank/sheet1';
let dailyMessage = "You're the best!"; // Default fallback

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
    
    dailyMessage = todaysMessageObj ? todaysMessageObj.message : "You're the best!";
    return dailyMessage;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return dailyMessage; // Return fallback
  }
}

loadDailyMessage();




panda.addEventListener('click', () => {
  const existingHeart = wrapper.querySelector('.heart');
  if (existingHeart) {
    existingHeart.remove();
  }
  const heart = document.createElement('div');
  heart.classList.add('heart');
  wrapper.appendChild(heart);
  console.log(panda, wrapper);



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


  // Remove heart after animation ends
//   heart.addEventListener('animationend', () => {
//     heart.remove();
//   });
});

const loveBar = document.createElement('div');
loveBar.classList.add('love-bar');
wrapper.appendChild(loveBar);

const barFrames = [
  './heart-bar-1.png',
  './heart-bar-2.png',
  './heart-bar-3.png',
  './heart-bar-4.png',
  './heart-bar-5.png',
  './heart-bar-6.png'
];

let currentFrame = 0;
loveBar.style.backgroundImage = `url(${barFrames[currentFrame]})`;
loveBar.style.width = '128px';
loveBar.style.height = '128px';
loveBar.style.backgroundSize = 'cover';
loveBar.style.cursor = 'pointer';

