const draggableElems = document.querySelectorAll('.cover');
const dropZones = document.querySelectorAll('.category');

draggableElems.forEach((elem) => {
    const draggie = new Draggabilly(elem, {
        containment: document.body, // Permet de déplacer dans toute la fenêtre
    });

    draggie.on('dragEnd', function () {
        const { left, top, width, height } = elem.getBoundingClientRect(); // Position de l'élément draggable
        let dropped = false;

        dropZones.forEach((zone) => {
            const { left: zl, top: zt, width: zw, height: zh } = zone.getBoundingClientRect(); // Position de la zone de dépôt

            // Vérification si l'élément est à l'intérieur de la zone de dépôt
            if (
                left + width > zl &&  // Si l'élément est à droite du côté gauche de la zone
                left < zl + zw &&      // Si l'élément est à gauche du côté droit de la zone
                top + height > zt &&   // Si l'élément est sous le côté supérieur de la zone
                top < zt + zh          // Si l'élément est au-dessus du côté inférieur de la zone
            ) {
                zone.appendChild(elem);  // Déposer l'élément dans la zone
                elem.style.position = 'relative'; // Réinitialiser la position
                elem.style.left = '0';
                elem.style.top = '0';
                dropped = true;
            }
        });

        // Si l'élément n'est pas dans une zone valide, il retourne à sa position initiale
        if (!dropped) {
            draggie.setPosition(0, 0);  // Retourne à la position d'origine
        }
    });
});

