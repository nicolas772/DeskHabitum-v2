
window.addEventListener('DOMContentLoaded', async () => {

  const instructionEl = document.getElementById("instruction");
  const animatronEl = document.getElementById("animatron");
  const miAudio = document.getElementById("miAudio");
  const noiseToggleEl = document.getElementById('noise-toggle');
  
  noiseToggleEl.addEventListener('change', () => {
    if (noiseToggleEl.checked) {
      miAudio.currentTime = 0;
      miAudio.play()
    } else {
      miAudio.pause();
    }
  });


  const animations = {
    equal: {
      intro: [
        ['El patrón Equal se centra en inhalar y exhalar durante el mismo período de tiempo', 'holdOut', 5],
        ['encuentra una posición cómoda para sentarte o permanecer de pie', 'holdOut', 4],
        ['Inhala por tu nariz y exhala por la boca', 'holdOut', 5],
        ['¿listo?', 'holdOut', 3],
      ],
      loop: [
        ['Respira', 'breatheIn', 4],
        ['Mantén', 'holdIn', 2],
        ['Exhala', 'breatheOut', 4],
      ],
      times: 2
    },
    half478: {
      intro: [
        ['La respiración 4/7/8 consiste en inhalar durante 4 segundos, sostener durante 7 segundos y exhalar durante 8 segundos', 'holdOut', 6],
        ['esta versión es para la mitad de ese tiempo', 'holdOut', 4],
        ['encuentra una posición cómoda para sentarte o permanecer de pie', 'holdOut', 4],
        ['Inhala por tu nariz y exhala por la boca', 'holdOut', 5],
        ['Listo?', 'holdOut', 3],
      ],
      loop: [
        ['Respira', 'breatheIn', 2],
        ['Mantén', 'holdIn', 3.5],
        ['Exhala', 'breatheOut', 4],
      ],
      times: 2
    },
    full478: {
      intro: [
        ['La respiración 4/7/8 consiste en inhalar durante 4 segundos, sostener durante 7 segundos y exhalar durante 8 segundos', 'holdOut', 6],
        ['si el tiempo es muy largo para ti, puedes intentar con la version half', 'holdOut', 4],
        ['encuentra una posición cómoda para sentarte o permanecer de pie', 'holdOut', 4],
        ['Inhala por tu nariz y exhala por la boca', 'holdOut', 5],
        ['¿Listo?', 'holdOut', 3],
      ],
      loop: [
        ['Respira', 'breatheIn', 4],
        ['Mantén', 'holdIn', 7],
        ['Exhala', 'breatheOut', 8],
      ],
      times: 2
    }
  };

  const playAnimation = (el, animation, duration) => new Promise(resolve => {
    el.style.animation = null;
    void el.offsetWidth;

    requestAnimationFrame(() => {
      const animationend = () => {
        el.removeEventListener('animationend', animationend);
        resolve();
      };
      el.addEventListener('animationend', animationend);
      el.style.animation = `${animation} ${duration}s ease-in-out forwards`;
    });
  });

  const animationStep = (step, skipFadeOut = false) => {
    const [instructionText, animation, duration] = step;
    instructionEl.textContent = instructionText;
    return Promise.all([
      playAnimation(instructionEl, "fadeIn", 0.5)
        .then(() => playAnimation(instructionEl, "pause", duration - 1))
        .then(() => skipFadeOut || playAnimation(instructionEl, "fadeOut", 0.5)),
      playAnimation(animatronEl, animation, duration),
    ]);
  };

  const startAnimation = async (animation) => {
    await playAnimation(instructionEl, "fadeOut", 0.5);

    for (let i = 0; i < animation.intro.length; i++) {
      await animationStep(animation.intro[i]);
    }

    const steps = animation.loop.slice();
    for (let i = 0; i < animation.times; i++) {
      for (let j = 0; j < steps.length; j++) {
        await animationStep(steps[j]);
      }
    }

    await animationStep(['¡Buen trabajo! Si lo deseas, puedes comenzar con otro patrón.', 'holdOut', 2], true);
  };

  const disableControls = (disable) => {
    document.querySelectorAll('.control').forEach(control => {
      if (disable) {
        control.setAttribute('disabled', true);
      } else {
        control.removeAttribute('disabled');
      }
    });
  };

  const clickControl = async (control) => {
    if (control.getAttribute('disabled') || control.classList.contains('is-active')) return;

    disableControls(true);
    control.removeAttribute('disabled');
    control.classList.add('is-active');
    await startAnimation(animations[control.dataset.animation]);
    control.classList.remove('is-active');
    disableControls(false);
  };

  const handleClick = (click) => {
      const control = click.target.closest('.control');
      if (control) clickControl(control);
  };

  document.querySelector('.control-panel').addEventListener('click', handleClick);
});
