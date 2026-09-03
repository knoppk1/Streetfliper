let streets = [];
let currentIndex = 0;

// Grab DOM elements matching index.html
const cardElement = document.getElementById('flashcard');
const textElement = document.getElementById('cardText');
const labelElement = document.getElementById('cardLabel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Fetch the streets array from streets.json
fetch('streets.json')
  .then(response => response.json())
  .then(data => {
    streets = data.streets;
    updateCard(); // Initialize the first card
  })
  .catch(error => {
    textElement.textContent = "Error loading route.";
    console.error('Error fetching streets:', error);
  });

function updateCard() {
  if (streets.length === 0) return;

  // Display the current street name
  textElement.textContent = streets[currentIndex];
  
  // Update the label tracker
  labelElement.textContent = `Street ${currentIndex + 1} of ${streets.length}`;

  // Reset the flip state whenever navigating to a new card
  cardElement.classList.remove('back');

  // Disable Prev/Next buttons at the start/end of the list
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === streets.length - 1;
}

// Previous Button logic
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCard();
  }
});

// Next Button logic
nextBtn.addEventListener('click', () => {
  if (currentIndex < streets.length - 1) {
    currentIndex++;
    updateCard();
  }
});

// Simulate flipping the card by toggling the CSS class
cardElement.addEventListener('click', () => {
  cardElement.classList.toggle('back');
});