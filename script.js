let streets = [];
let currentIndex = 0;

const cardElement = document.getElementById('flashcard');
const textElement = document.getElementById('cardText');
const labelElement = document.getElementById('cardLabel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hintBtn = document.getElementById('hintBtn');
const sidePanel = document.getElementById('sidePanel');
const closePanelBtn = document.getElementById('closePanelBtn');
const hintList = document.getElementById('hintList');

fetch('streets.json')
  .then(response => response.json())
  .then(data => {
    streets = data.streets;
    updateCard(); 
  })
  .catch(error => {
    textElement.textContent = "Error loading route.";
    console.error('Error fetching streets:', error);
  });

function updateCard() {
  if (streets.length === 0) return;

  const currentStreet = streets[currentIndex];
  textElement.textContent = currentStreet.name;
  labelElement.textContent = `Street ${currentIndex + 1} of ${streets.length}`;
  cardElement.classList.remove('back');

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === streets.length - 1;

  hintList.innerHTML = '';
  currentStreet.hint.forEach(step => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="distance-badge">${step.distance}m</span> ${step.instruction}`;
    hintList.appendChild(li);
  });
}

// Helper function to delay the card update if the panel is open
function changeCardWithDelay(changeIndexAction) {
  const isPanelOpen = sidePanel.classList.contains('open');
  
  // 1. Immediately close the panel and deactivate the button visually
  sidePanel.classList.remove('open');
  hintBtn.classList.remove('active');
  
  if (isPanelOpen) {
    // 2. If it was open, wait 300ms (matching your CSS transition) before updating the data
    setTimeout(() => {
      changeIndexAction();
      updateCard();
    }, 120);
  } else {
    // 3. If it was already closed, update the data instantly
    changeIndexAction();
    updateCard();
  }
}

// Previous Button logic
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    changeCardWithDelay(() => {
      currentIndex--;
    });
  }
});

// Next Button logic
nextBtn.addEventListener('click', () => {
  if (currentIndex < streets.length - 1) {
    changeCardWithDelay(() => {
      currentIndex++;
    });
  }
});

cardElement.addEventListener('click', () => {
  cardElement.classList.toggle('back');
});

// Side Panel Controls
hintBtn.addEventListener('click', () => {
  // Toggle switches the state back and forth on each click
  sidePanel.classList.toggle('open');
  hintBtn.classList.toggle('active');
});

closePanelBtn.addEventListener('click', () => {
  // Ensure both the panel and the button reset when the 'x' is clicked
  sidePanel.classList.remove('open');
  hintBtn.classList.remove('active');
});
