export function removeConsole() {
  console.log = function no_console() {
    /* remove console log */
  };
  console.warn = function no_console() {
    /* remove console warn */
  };
  console.error = function no_console() {
    /* remove console error */
  };
}
