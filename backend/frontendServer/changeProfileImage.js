export function changeImage() {
  const profileImage = document.querySelector(".profileImage");
  const updateImage = document.querySelector(".updateImage");
  const username = localStorage.getItem("username");

  profileImage.addEventListener('click', () => {
    updateImage.click();
  });

  updateImage.addEventListener('change', () => {
    const file = updateImage.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", file);
    

    fetch('/uploadImage', {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log("Upload response:", data);

      // Optional preview update
      /*
      const reader = new FileReader();
      reader.onload = () => {
        profileImage.src = reader.result;
      };
      reader.readAsDataURL(file);
      */
     if(data.message === 'Image uploaded and DB updated'){
      window.location.reload();
     }
      

    })
    .catch(err => {
      console.error("Fetch error:", err);
    });
  });
}
