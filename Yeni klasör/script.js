const phraseContainer = document.getElementById("phraseContainer");
const wordOptions = document.getElementById("wordOptions");
const resultMessage = document.getElementById("resultMessage");
const retryBtn = document.getElementById("retryBtn");
const celebration = document.getElementById("celebration");

const clickSound = document.getElementById("clickSound");
const wrongSound = document.getElementById("wrongSound");
const applauseSound = document.getElementById("applauseSound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Tam Sübhaneke metni kelimeler (ek olarak parantezli, cenaze namazında geçen kısmı ekledik)
const kelimeler = [
  "سُبْحَانَكَ",
  "اللّٰهُمَّ",
  "وَبِحَمْدِكَ",
  "وَتَبَارَكَ",
  "اسْمُكَ",
  "وَتَعَالٰى",
  "جَدُّكَ",
  "وَجَلَّ", // Cenaze namazı parantezi için burası ekli
  "ثَنَّاؤُكَ", // Cenaze namazı parantezi için burası ekli
  "وَلَا",
  "إِلٰهَ",
  "غَيْرُكَ",
];

let currentIndex = 1; // Çünkü ilk kelime sabit gösteriliyor

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  currentIndex = 1;
  resultMessage.textContent = "";
  retryBtn.style.display = "none";
  celebration.style.display = "none";

  phraseContainer.innerHTML = "";
  const firstWord = document.createElement("div");
  firstWord.className = "word correct";
  firstWord.textContent = kelimeler[0];
  phraseContainer.appendChild(firstWord);

  const placeholder = document.createElement("div");
  placeholder.className = "word placeholder";
  placeholder.textContent = "؟";
  phraseContainer.appendChild(placeholder);

  renderOptions();
}

function renderOptions() {
  wordOptions.innerHTML = "";
  const shuffled = shuffleArray([...kelimeler.slice(1)]);
  shuffled.forEach((word, index) => {
    const wordDiv = document.createElement("div");
    wordDiv.className = "word";
    wordDiv.textContent = word;
    wordDiv.style.animationDelay = `${index * 0.1}s`; // Animasyon gecikmesi

    wordDiv.addEventListener("click", () => checkAnswer(word));
    wordOptions.appendChild(wordDiv);
  });
}

function checkAnswer(word) {
  if (word === kelimeler[currentIndex]) {
    clickSound.play();

    const correctDiv = document.createElement("div");
    correctDiv.className = "word correct";
    correctDiv.textContent = word;

    const placeholders = document.querySelectorAll(".placeholder");
    if (placeholders.length > 0) {
      placeholders[0].replaceWith(correctDiv);
    }

    currentIndex++;

    if (currentIndex < kelimeler.length) {
      const newPlaceholder = document.createElement("div");
      newPlaceholder.className = "word placeholder";
      newPlaceholder.textContent = "؟";
      phraseContainer.appendChild(newPlaceholder);
    } else {
      showSuccess();
    }
  } else {
    wrongSound.play();
    resultMessage.textContent = "Yanlış seçim! Lütfen tekrar deneyiniz.";
    retryBtn.style.display = "block";
    wordOptions.innerHTML = "";
  }
}

function showSuccess() {
  applauseSound.play();
  celebration.style.display = "block";
  resultMessage.textContent = "";
  wordOptions.innerHTML = "";
}

retryBtn.addEventListener("click", startGame);

// Oyun sayfa yüklendiğinde başlasın
window.onload = () => {
  startGame();
};
