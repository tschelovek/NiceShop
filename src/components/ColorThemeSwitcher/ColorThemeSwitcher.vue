<template>
  <fieldset class="switcher">
    <legend class="switcher__legend">Цветовая схема</legend>
    <input class="switcher__radio switcher__radio--light" type="radio" name="color-scheme" value="light" aria-label="Светлая">
    <input class="switcher__radio switcher__radio--auto" type="radio" name="color-scheme" value="auto" aria-label="Системная" checked="">
    <input class="switcher__radio switcher__radio--dark" type="radio" name="color-scheme" value="dark" aria-label="Тёмная">
    <div class="switcher__status"></div>
  </fieldset>
</template>

<script>
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
    currentRadio.checked = true;
  }

  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    lightMedia = (scheme === 'light') ? 'all' : 'not all';
    darkMedia = (scheme === 'dark') ? 'all' : 'not all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();
</script>

<style scoped>
.switcher__status {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  box-shadow: 0 0 0 2px rgb(0 0 0 / 0.2);
  border-radius: 18px;
  background-color: rgb(255 255 255 / 0.5);
  background-repeat: no-repeat;
  background-image: url('../icons/status.svg');
  background-size: 32px;
  background-position: center;
  transition: background-position 0.1s ease-in;
}

.switcher__radio:focus-visible ~ .switcher__status {
  box-shadow: 0 0 0 2px black;
}

.switcher__radio--light:checked ~ .switcher__status {
  background-position: left 2px center;
}

.switcher__radio--auto:checked ~ .switcher__status {
  background-position: center center;
}

.switcher__radio--dark:checked ~ .switcher__status {
  background-position: right 2px center;
}
</style>