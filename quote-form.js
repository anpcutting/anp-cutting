(() => {
  const form = document.querySelector('.quote-form');
  const projectType = document.querySelector('#project-type');
  const projectDetails = document.querySelector('#project-details');
  const fileDrop = document.querySelector('#file-drop');
  const picker = document.querySelector('#file-picker');
  const storedInputs = [...document.querySelectorAll('.stored-file')];
  const fileStatus = document.querySelector('#file-status');
  const referralSource = document.querySelector('[name="referral_source"]');

  if (referralSource) {
    const options = [
      'Select an option',
      'Google Search',
      'ChatGPT or another AI assistant',
      'Facebook',
      'Instagram',
      'TikTok',
      'LinkedIn',
      'Pinterest',
      'YouTube',
      'Etsy, Amazon or another marketplace',
      'Event planner, designer or contractor',
      'Family or friend referral',
      'Previous customer',
      'Saw our work in person',
      'Other'
    ];
    referralSource.replaceChildren(...options.map((label, index) => {
      const option = new Option(label, index ? label : '');
      option.disabled = index === 0;
      option.selected = index === 0;
      return option;
    }));
  }

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', () => {
      const project = card.dataset.project;
      projectType.value = project;
      if (!projectDetails.value.trim()) projectDetails.value = `I’m interested in ${project.toLowerCase()}.`;
    });
  });

  const setFiles = (files) => {
    const selected = [...files].slice(0, storedInputs.length);
    const totalSize = selected.reduce((total, file) => total + file.size, 0);
    if (files.length > storedInputs.length) { fileStatus.textContent = 'Please choose up to 3 files.'; return; }
    if (totalSize > 8 * 1024 * 1024) { fileStatus.textContent = 'Your files must total 8 MB or less.'; return; }
    storedInputs.forEach((input, index) => { const transfer = new DataTransfer(); if (selected[index]) transfer.items.add(selected[index]); input.files = transfer.files; });
    fileStatus.textContent = selected.length ? selected.map((file) => file.name).join(' · ') : 'PDF, AI, EPS, SVG, DXF, DWG, PNG, JPG, WEBP or ZIP';
  };

  fileDrop.addEventListener('click', () => picker.click());
  fileDrop.addEventListener('dragover', (event) => { event.preventDefault(); fileDrop.classList.add('is-dragging'); });
  fileDrop.addEventListener('dragleave', () => fileDrop.classList.remove('is-dragging'));
  fileDrop.addEventListener('drop', (event) => { event.preventDefault(); fileDrop.classList.remove('is-dragging'); setFiles(event.dataTransfer.files); });
  picker.addEventListener('change', () => setFiles(picker.files));
  form.addEventListener('submit', () => { picker.disabled = true; });
})();
