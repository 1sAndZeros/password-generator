import './style.css';
import { copyPassword } from './copy';
import { generatePassword } from './generatePassword';

// prettier-ignore
export const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]');
// prettier-ignore
export const slider = document.querySelector('#slider')! as HTMLInputElement;
// prettier-ignore
const charLength = document.getElementById('char-length')! as HTMLHeadingElement;
charLength.textContent = slider.value;
// prettier-ignore
slider.addEventListener('input', (_) => {charLength.textContent = slider.value});
// prettier-ignore
document.getElementById('generate')!.addEventListener('click', generatePassword);
// prettier-ignore
document.getElementById('slider')!.addEventListener('change', generatePassword);
document
  .getElementById('copy')!
  .addEventListener('click', () =>
    copyPassword(document.querySelector('#password')! as HTMLInputElement),
  );
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', generatePassword);
});

generatePassword();
