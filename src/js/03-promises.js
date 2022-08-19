import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let i = 0; i < amount; i++) {
    let position = i + 1;

    if (i > 0) {
      delay += step;
    }

    createPromise(position, delay)
      .then(success => {
        Notiflix.Notify.success(success);
      })
      .catch(error => Notiflix.Notify.failure(error));
  }

  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
