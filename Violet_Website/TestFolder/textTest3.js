const inputBox = document.querySelector('.inputMessage');
const imageBox = document.querySelector('.inputImage');

document.addEventListener("DOMContentLoaded", function () {
  inputBox.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault(); // prevent image going into inputBox
        const file = item.getAsFile();
        console.log("FileName: ", file.name)
        insertImageToBox(file);
      }
    }
  });
document.querySelector('.inputImage').addEventListener('click', (e) => {
  if (e.target.classList.contains('removeMark')) {
    const wrapper = e.target.closest('.insertedImage');
    if (wrapper) {
      wrapper.remove();
      const count = document.querySelectorAll('.insertedImage').length;
      console.log("Total insertedImage divs:", count);
    }
  }
});

});

function insertImageToBox(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    // Create wrapper div
    const insertedImage = document.createElement('div');
    insertedImage.classList.add('insertedImage');

    // Create image element
    const insertImage = document.createElement('img');
    insertImage.src = event.target.result;
    insertedImage.appendChild(insertImage);

    // Create remove mark box and icon
    const removeMarkBox = document.createElement('div');
    removeMarkBox.classList.add('removeMarkBox');

    const removeMark = document.createElement('img');
    removeMark.classList.add('removeMark');
    removeMark.src = '/images/TrashCan-removebg-preview.png';

    removeMarkBox.appendChild(removeMark);
    insertedImage.appendChild(removeMarkBox);

    // Append to main container
    imageBox.appendChild(insertedImage);

    // Optional: update count
    const count = document.querySelectorAll('.insertedImage').length;
    console.log("Total insertedImage divs:", count);
  };

  reader.readAsDataURL(file);
}

const count = document.querySelectorAll('.insertedImage').length;
console.log("Total insertedImage divs:", count);
