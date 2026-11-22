import confetti from 'canvas-confetti';

/**
 * Fires a celebratory wedding confetti shower with royal gold, champagne, navy, and ivory particles.
 */
export function fireWeddingConfetti() {
  if (typeof window === 'undefined') return;

  const count = 100;
  const defaults = {
    origin: { y: 0.62 },
    zIndex: 9999,
  };

  const colors = ['#DFBF73', '#B5965A', '#FFDF73', '#0D1B36', '#8B0000', '#F8F5EE'];

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors,
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
