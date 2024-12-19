// Récupérer tous les éléments draggable et les zones de drop
const draggableElems = document.querySelectorAll('.cover'); // Appliquer à .cover
const dropZones = document.querySelectorAll('.category');

// Initialiser Draggabilly pour chaque cover
draggableElems.forEach((elem) => {
    const draggie = new Draggabilly(elem, {
        containment: document.body, // Limite à la fenêtre
    });

    // Gestion de l'événement `dragEnd`
    draggie.on('dragEnd', function () {
        const { left, top, width, height } = elem.getBoundingClientRect();

        let dropped = false; // Indique si l'élément a été déposé dans une drop zone

        dropZones.forEach((zone) => {
            const { left: zl, top: zt, width: zw, height: zh } = zone.getBoundingClientRect();

            // Vérifie si le centre de l'élément est dans une zone
            if (
                left + width / 2 > zl &&
                left + width / 2 < zl + zw &&
                top + height / 2 > zt &&
                top + height / 2 < zt + zh
            ) {
                // Déplacer le cadre dans la zone
                zone.appendChild(elem);
                elem.style.position = 'relative'; // Réinitialiser la position
                elem.style.left = '0';
                elem.style.top = '0';
                dropped = true;
            }
        });

        // Si l'élément n'est pas déposé dans une zone, il retourne à sa position initiale
        if (!dropped) {
            draggie.setPosition(0, 0); // Retourner à l'état initial
        }
    });
});
