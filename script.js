// Sélectionner tous les éléments draggables (covers) et zones de dépôt
const draggableElems = document.querySelectorAll('.cover'); // Déclare une seule fois
const dropZones = document.querySelectorAll('.category');

// Initialisation du drag pour chaque élément
draggableElems.forEach((elem) => {
    const draggie = new Draggabilly(elem, {
        containment: document.body, // Permet de déplacer dans toute la fenêtre
    });

    // Événement déclenché lorsqu'on termine de déplacer un élément
    draggie.on('dragEnd', function () {
        // Récupère les dimensions et position de l'élément draggable
        const { left, top, width, height } = elem.getBoundingClientRect();

        let dropped = false; // Indique si l'élément a été déposé dans une zone valide

        // Parcourir toutes les zones de dépôt
        dropZones.forEach((dropZone) => {
            // Récupère les dimensions et position de la zone actuelle
            const { left: zl, top: zt, width: zw, height: zh } = dropZone.getBoundingClientRect();

            // Vérifie si l'élément se trouve dans cette zone
            if (
                left + width / 2 > zl && // Centre de l'élément dans la largeur
                left + width / 2 < zl + zw &&
                top + height / 2 > zt && // Centre de l'élément dans la hauteur
                top + height / 2 < zt + zh
            ) {
                // Ajouter l'élément dans la zone de dépôt
                dropZone.appendChild(elem);
                elem.style.position = 'relative'; // Réinitialiser la position
                elem.style.left = '0';
                elem.style.top = '0';
                dropped = true;
            }
        });

        // Si l'élément n'a pas été déposé dans une zone valide
        if (!dropped) {
            draggie.setPosition(0, 0); // Retour à sa position initiale
        }
    });
});
