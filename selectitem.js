var lastElem = null;

function onMouseMove(e) {
  const elem = document.elementFromPoint(e.clientX, e.clientY);
  if (elem != lastElem){
    window.setTimeout(() => {

      if (lastElem) {
         lastElem.classList.remove('highlightedElement');
         lastElem = null;
      }

      lastElem = elem;
      elem.classList.add('highlightedElement');
    }, 100);
  }
};

function exportHTML(elem, item) {
  const input = document.createElement('textarea');
  input.innerText = elem.outerHTML;
  elem.appendChild(input);
  input.focus();
  input.select();

  window.removeEventListener('mousemove', onMouseMove, true);
  elem.classList.remove('highlightedElement');

  if(document.getElementsByClassName('test')) 
    removeElementsByClass('test');

  try {
    document.execCommand("copy");
    window.alert('Element was copied to clipboard');
  } catch(err) {
    console.log(err);
  }
  input.remove();
};

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function init() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('class', 'test');
    style.innerHTML = '.highlightedElement { -webkit-box-shadow: 0 2px 6px #b70606; cursor: pointer; border: 2px solid #f00}';
    document.getElementsByTagName('head')[0].appendChild(style)
    window.addEventListener('mousemove', onMouseMove, true);
}

init();