export {};

declare global {
  namespace NodeJS {
    interface Window {
      generatePassword: () => void;
      copyPassword: () => void;
    }
  }
}
