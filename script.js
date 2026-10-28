const desktop = document.getElementById('desktop');
document.getElementById('ligar-pc').onclick = () => desktop.classList.add('aberto');
document.getElementById('desligar').onclick = () => desktop.classList.remove('aberto');

let topZ = 1;

document.querySelectorAll('.icon').forEach(icon => {
  icon.ondblclick = icon.onclick = () => {
    const win = document.getElementById(icon.dataset.janela);
    win.style.display = 'block';
    win.style.zIndex = ++topZ;
  };
});

document.querySelectorAll('.window').forEach(win => {
  win.querySelector('[aria-label="Close"]').onclick = () => win.style.display = 'none';
  win.onpointerdown = () => win.style.zIndex = ++topZ;

  win.querySelector('.title-bar').onpointerdown = e => {
    if (e.target.tagName === 'BUTTON') return;
    const dx = e.clientX - win.offsetLeft;
    const dy = e.clientY - win.offsetTop;
    const mover = ev => {
      win.style.left = ev.clientX - dx + 'px';
      win.style.top = ev.clientY - dy + 'px';
    };
    document.addEventListener('pointermove', mover);
    document.addEventListener('pointerup',
      () => document.removeEventListener('pointermove', mover), { once: true });
  };
});