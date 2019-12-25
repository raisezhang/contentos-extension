// ((doc, win) => {
//   const docEle = doc.documentElement;
// const currentWindow = win;
// let size = docEle.clientWidth;
// if (size) {
// let timerId = -1;
// const changeRootSize = () => {
// size = docEle.clientWidth;
// const fontSize = Math.max(Math.min(size, 640) / 20, 12);
// docEle.style.fontSize = `${fontSize}px`;
// };
// currentWindow.onresize = () => {
//   clearTimeout(timerId);
//   timerId = setTimeout(changeRootSize, 30);
// };
// changeRootSize();
// }
//   docEle.style.fontSize = '18px';
// })(document, window);

(doc => {
  const docEle = doc.documentElement;
  docEle.style.fontSize = '18px';
})(document);
