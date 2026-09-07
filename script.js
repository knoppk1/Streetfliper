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
  
  // Display the specific street name, not the whole object
  textElement.textContent = currentStreet.name;
  
  labelElement.textContent = `Street ${currentIndex + 1} of ${streets.length}`;
  cardElement.classList.remove('back');

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === streets.length - 1;

  // Clear and populate the side panel list
  hintList.innerHTML = '';
  currentStreet.hint.forEach(step => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="distance-badge">${step.distance}m</span> ${step.instruction}`;
    hintList.appendChild(li);
  });
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCard();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < streets.length - 1) {
    currentIndex++;
    updateCard();
  }
});

cardElement.addEventListener('click', () => {
  cardElement.classList.toggle('back');
});

// Side Panel Controls
hintBtn.addEventListener('click', () => {
  sidePanel.classList.add('open');
});

closePanelBtn.addEventListener('click', () => {
  sidePanel.classList.remove('open');
});
