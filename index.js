console.log('work');

const $wr = document.querySelector('[data-wr]');
// console.log($wr);
const ACTIONS = {
  DETAIL: 'detail',
  DELETE: 'delete',
};

const getCatHTML = (cat) => `
<div data-cat-id="${cat.id}" class="card mb-2 mx-2" style="width: 18rem;">
<img src="${cat.image}" class="card-img-top" alt="${cat.name}">
<div class="card-body">
  <h5 class="card-title">${cat.name}</h5>
  <p class="card-text">${cat.description}</p>
  <button data-action="${ACTIONS.DETAIL}" type="button" class="btn btn-primary">Detail</button>
  <button data-action="${ACTIONS.DELETE}" type="button" class="btn btn-danger">Delete</button>
</div>
</div>
`;

fetch('https://cats.petiteweb.dev/api/single/Egerasina/show/')
  .then((res) => res.json())
  .then((data) => {
    $wr.insertAdjacentHTML('afterbegin', data.map((cat) => getCatHTML(cat)).join(''));
    console.log({ data });
  });
$wr.addEventListener('click', (e) => {
  if (e.target.dataset.action === ACTIONS.DELETE) {
    console.log(e.target);

    const $catWr = e.target.closest('[data-cat-id]');
    const catId = $catWr.dataset.catId;
    console.log({ catId });

    fetch(`https://cats.petiteweb.dev/api/single/Egerasina/delete/${catId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        return $catWr.remove();
      }
      alert(`Удаление кота с id = ${catId} не удалось`);
    });
  }
});
