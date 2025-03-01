const pianokeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input");

let allkeys = [],
  audio = new Audio(`assets/notes/a.wav`);

const playTune = (key) => {
  audio.src = `assets/notes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");

  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianokeys.forEach((key) => {
  allkeys.push(key.dataset.key);

  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianokeys.forEach((key) => key.classList.toggle("hide"));
};

const passedKeys = (e) => {
  if (allkeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handVolume);
document.addEventListener("keydown", passedKeys);
