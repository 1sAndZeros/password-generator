import { slider, checkboxes } from './main';

export const generatePassword = () => {
  // Get checkbox elements
  const [lowercase, uppercase, numbers, symbols] = checkboxes;

  // Reset strength bars
  const scoreBars: NodeListOf<HTMLDivElement> =
    document.querySelectorAll('.strength__bar');
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
  lowercase.checked && allowableChars.push(...lowercaseArray);
  uppercase.checked && allowableChars.push(...uppercaseArray);
  numbers.checked && allowableChars.push(...numbersArray);
  symbols.checked && allowableChars.push(...symbolsArray);

  const passwordEl = document.getElementById('password') as HTMLInputElement;

  // Throw Error if all checkboxes are unticked
  // TODO: Prevent last checkbox being unticked
  if (allowableChars.length === 0) {
    passwordEl.value = 'P4$5W0rD!';
    throw new Error("You didn't choose any characters");
  }

  // Generate random password
  let password = '';
  for (let i = 0; i < +slider.value; i++) {
    const randomLetter =
      allowableChars[Math.floor(Math.random() * allowableChars.length)];
    password += randomLetter;
  }

  // TODO: If password doesn't contain ticked element, re-run
  // Update input value with generated password
  passwordEl.value = password;

  // Set score / strength indicator
  let score = 0;

  if (lowercase) score += 8;
  if (uppercase) score += 12;
  if (numbers) score += 12;
  if (symbols) score += 15;

  if (+slider.value < 8) score = 1;
  else if (+slider.value < 15) score += 10;
  else if (+slider.value >= 15) score += 30;

  if (score >= 15) scoreBars[0].style.backgroundColor = 'red';
  if (score >= 25) scoreBars[1].style.backgroundColor = 'orange';
  if (score >= 35) scoreBars[2].style.backgroundColor = 'yellow';
  if (score > 45) scoreBars[3].style.backgroundColor = 'green';
};
