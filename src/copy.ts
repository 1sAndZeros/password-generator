export const copyPassword = (inputElement: HTMLInputElement) => {
  inputElement.select();
  inputElement.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(inputElement.value);
  const copied = document.querySelector('.copied') as HTMLDivElement;
  copied.style.display = 'block';
  setTimeout(() => (copied.style.display = 'none'), 3000);
};