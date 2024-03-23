document.addEventListener('DOMContentLoaded', function () {
  // Fetch the crafts data from the server
  fetch('/api/crafts')
      .then(response => response.json())
      .then(crafts => {
          const gallery = document.getElementById('gallery');
          // Iterate over each craft and create its HTML
          crafts.forEach(craft => {
              const craftDiv = document.createElement('div');
              craftDiv.className = 'w3-col l3 m6 w3-margin-bottom';

              const img = document.createElement('img');
              img.src = `/images/crafts/${craft.image}`;
              img.alt = craft.name;
              img.style.width = '100%';
              img.style.cursor = 'pointer';
              img.onclick = function () {
                  showModal(craft);
              };
              craftDiv.appendChild(img);

              gallery.appendChild(craftDiv);
          });
      })
      .catch(error => {
          console.error('Error fetching the crafts:', error);
      });

  // Get the modal and elements
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('img01');
  const captionText = document.getElementById('caption');
  const suppliesList = document.getElementById('suppliesList');
  const span = document.getElementsByClassName('close')[0];

  // Function to show the modal with the correct data
  function showModal(craft) {
      modal.style.display = 'block';
      modalImg.src = `/images/crafts/${craft.image}`;
      captionText.innerHTML = `<strong>${craft.name}</strong>: ${craft.description}`;

      // Clear previous supplies list
      suppliesList.innerHTML = '';

      // Add supplies to the modal
      craft.supplies.forEach(supply => {
          const li = document.createElement('li');
          li.textContent = supply;
          suppliesList.appendChild(li);
      });
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
      modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  };
});

