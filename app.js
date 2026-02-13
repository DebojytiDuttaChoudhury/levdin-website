const faders = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  faders.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < triggerBottom){
      section.classList.add('show');
    }
  });
});
