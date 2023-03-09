// Add event listener to range slider
// Bind value to character length element
const charLength = document.querySelector('#char-length');
const slider = document.querySelector('#slider');
charLength.textContent = slider.value;
slider.addEventListener('input', (event) => {
  charLength.textContent = event.target.value;
});

window.generatePassword = () => {
  // Get checkbox elements
  const lowercase = document.querySelector('#lowercase').checked;
  const uppercase = document.querySelector('#uppercase').checked;
  const numbers = document.querySelector('#numbers').checked;
  const symbols = document.querySelector('#symbols').checked;

  // Reset strength bars
  const scoreBars = document.getElementsByClassName('strength__bar');
  for (let i = 0; i < scoreBars.length; i++) {
    scoreBars[i].style.backgroundColor = 'transparent';
  }

  // Create arrays of letters, numbers and symbols
  const lowercaseArray = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 97),
  );
  const uppercaseArray = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 65),
  );
  let numbersArray = [];
  for (let i = 0; i <= 9; i++) {
    numbersArray.push(`${i}`);
  }
  const symbolsArray = ['!', '@', '#', '$', '%', '&', '(', ')', '?'];

  // Add selected characters to usable array
  let allowableChars = [];
  lowercase && allowableChars.push(...lowercaseArray);
  uppercase && allowableChars.push(...uppercaseArray);
  numbers && allowableChars.push(...numbersArray);
  symbols && allowableChars.push(...symbolsArray);

  if (allowableChars.length === 0) {
    document.querySelector('#password').value = 'P4$5W0rD!';
    throw new Error("You didn't choose any characters");
    return null;
  }

  let password = '';
  for (let i = 0; i < slider.value; i++) {
    const randomLetter =
      allowableChars[Math.floor(Math.random() * allowableChars.length)];
    password += randomLetter;
  }
  document.querySelector('#password').value = password;
  let score = 0;

  if (lowercase) score += 8;
  if (uppercase) score += 12;
  if (numbers) score += 12;
  if (symbols) score += 15;
  
  if (slider.value < 8) score = 1;
  else if (slider.value < 15) score += 10;
  else if (slider.value >= 15) score += 30;

  if (score >= 15) scoreBars[0].style.backgroundColor = 'red';
  if (score >= 25) scoreBars[1].style.backgroundColor = 'orange';
  if (score >= 35) scoreBars[2].style.backgroundColor = 'yellow';
  if (score > 45) scoreBars[3].style.backgroundColor = 'green';
};

window.copyPassword = () => {
  const copyText = document.querySelector('#password');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  const test = document.getElementsByClassName('copied')[0];
  test.style.visibility = 'visible';
  setTimeout(() => (test.style.visibility = 'hidden'), 3000);
};
