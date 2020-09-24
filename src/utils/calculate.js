(function () {
  function getFontSize() {
    let html = document.documentElement;
    html.style.fontSize = (html.clientWidth / 750 * 100) + "px";
  }
  getFontSize();
  window.onresize = function () {
    getFontSize();
    // console.log('font-size', html.style.fontSize);
  }
})()