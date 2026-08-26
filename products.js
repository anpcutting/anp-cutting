(() => {
  const preview = document.querySelector('#sheet-preview-image');
  const selected = document.querySelector('#selected-sheet');
  const price = document.querySelector('#sheet-price');
  const finishes = [...document.querySelectorAll('input[name="finish"]')];
  const size = document.querySelector('#sheet-size');

  const updatePreview = () => {
    const finish = finishes.find((input) => input.checked);
    if (!finish || !size || !preview || !selected) return;
    const selectedSize = size.options[size.selectedIndex];
    preview.src = finish.dataset.image;
    preview.alt = finish.dataset.alt;
    selected.textContent = `Selected: ${finish.value} · ${selectedSize.value}`;
    if (price) price.textContent = selectedSize.dataset.price;
  };

  finishes.forEach((input) => input.addEventListener('change', updatePreview));
  if (size) size.addEventListener('change', updatePreview);
})();
