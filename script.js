//history text to speech


function toggleTheme() {
  var body = document.body;
  body.classList.toggle('dark-theme');
}

const textInput = document.getElementById('text-input');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const languageSelect = document.getElementById('language-select');
const voiceSelect = document.getElementById('voice-select');
const volumeSlider = document.getElementById('volume-slider');
const rateSlider = document.getElementById('rate-slider');
const resetButton = document.getElementById('reset-button'); // Menambahkan tombol reset

let speechSynthesis = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

// Fungsi untuk mendapatkan suara berdasarkan bahasa yang dipilih
function getVoices() {
  let selectedLanguage = languageSelect.value;
  let voices = speechSynthesis.getVoices();
  let voiceOptions = voices.filter(voice => voice.lang.startsWith(selectedLanguage));
  voiceSelect.innerHTML = '';

  voiceOptions.forEach(voice => {
    let option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });
}

playButton.addEventListener('click', () => {
  utterance.text = textInput.value;
  let selectedVoice = voiceSelect.value;
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
  utterance.volume = volumeSlider.value / 100;
  utterance.rate = rateSlider.value / 100;
  speechSynthesis.speak(utterance);
});

pauseButton.addEventListener('click', () => {
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }
});

stopButton.addEventListener('click', () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
});

languageSelect.addEventListener('change', getVoices);

volumeSlider.addEventListener('input', () => {
  utterance.volume = volumeSlider.value / 100;
});

rateSlider.addEventListener('input', () => {
  utterance.rate = rateSlider.value / 100;
});

resetButton.addEventListener('click', () => {
  textInput.value = ''; // Menghapus isi teks
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel(); // Menghentikan suara jika sedang berbicara
  }
});

// Mendaftar event 'voiceschanged' untuk memperbarui suara saat tersedia
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Memanggil getVoices() saat halaman dimuat untuk mendapatkan suara awal
getVoices();


//tempat history


