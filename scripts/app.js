let imageCount = 0;
let imageHistory = [];
let currentImageIndex = -1;

// Tallenna ensimmäinen kuva historiaan, kun sivu ladataan
window.addEventListener('load', function() {
    var img = document.getElementById('randomImage');
    var initialImageUrl = 'https://picsum.photos/500?random=' + new Date().getTime();
    img.src = initialImageUrl;
    imageHistory.push(initialImageUrl);
    currentImageIndex++;
    document.getElementById('imageIndexDisplay').textContent = 'Kuvan numero: ' + currentImageIndex;
    imageCount++;
});

document.getElementById('nextImageBtn').addEventListener('click', function() {
    var img = document.getElementById('randomImage');

    if (currentImageIndex < imageHistory.length - 1) {
        // Hae seuraava kuva taulukosta
        currentImageIndex++;
        img.src = imageHistory[currentImageIndex];
    } else {
        // Luo uusi kuva
        var newImageUrl = 'https://picsum.photos/500?random=' + new Date().getTime();
        img.src = newImageUrl;

        // Tallenna uusi kuva historiaan
        imageHistory.push(newImageUrl);
        currentImageIndex++;

        // Päivitä imageCount
        imageCount++;
    }

    // Päivitä imageIndexDisplay-elementin arvo
    document.getElementById('imageIndexDisplay').textContent = 'Kuvan numero: ' + currentImageIndex;

    // Tulosta imageCount konsoliin
    console.log('Image count: ' + imageCount);
});

document.getElementById('prevImageBtn').addEventListener('click', function() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        var img = document.getElementById('randomImage');
        img.src = imageHistory[currentImageIndex];

        // Päivitä imageIndexDisplay-elementin arvo
        document.getElementById('imageIndexDisplay').textContent = 'Kuvan numero: ' + currentImageIndex;
    }
});

document.getElementById('imageNotes').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Estä rivinvaihto
        saveNote();
    }
});

document.getElementById('saveNotesBtn').addEventListener('click', saveNote);

document.getElementById('selectAllNotesBtn').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('.noteCheckbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
});

document.getElementById('deleteSelectedNotesBtn').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('.noteCheckbox:checked');
    checkboxes.forEach(function(checkbox) {
        checkbox.parentElement.remove();
    });
});

function saveNote() {
    var notes = document.getElementById('imageNotes').value;
    var savedNotesDiv = document.getElementById('savedNotes');

    // Luo uusi div-elementti muistiinpanoille
    var newNoteDiv = document.createElement('div');
    newNoteDiv.className = 'note d-flex align-items-center mb-2 p-2 border rounded';

    // Luo checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'noteCheckbox mr-2';

    // Luo uusi p-elementti muistiinpanoille
    var newNote = document.createElement('p');
    newNote.className = 'mb-0 flex-grow-1';
    newNote.textContent = notes;

    // Lisää checkbox ja muistiinpano div-elementtiin
    newNoteDiv.appendChild(checkbox);
    newNoteDiv.appendChild(newNote);

    // Lisää uusi muistiinpano savedNotes-div-elementtiin
    savedNotesDiv.appendChild(newNoteDiv);

    // Tyhjennä tekstikenttä
    document.getElementById('imageNotes').value = '';
}