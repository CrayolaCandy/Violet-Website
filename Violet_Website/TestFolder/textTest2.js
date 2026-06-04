const userInput = document.querySelector('.userInput');

    // Ensure caret target exists even when empty
    function ensureCaretTarget() {
      if (userInput.innerHTML.trim() === '') {
        userInput.innerHTML = '<br>';
      }
    }

    // Place caret at end on click
    function placeCaretAtEnd() {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(userInput);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // Events
    userInput.addEventListener('focus', ensureCaretTarget);
    userInput.addEventListener('blur', ensureCaretTarget);

    userInput.addEventListener('click', () => {
      ensureCaretTarget();
      placeCaretAtEnd();
    });

    window.addEventListener('load', ensureCaretTarget);

    // Handle submission
    document.querySelector('.submitButton').addEventListener('click', () => {
      const messageHTML = userInput.innerHTML.trim();
      alert("Submitted message:\n" + messageHTML);
      userInput.innerHTML = '<br>'; // reset
    });