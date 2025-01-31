const draggableElems = document.querySelectorAll('.cover img');
const dropZones = document.querySelectorAll('.category');

draggableElems.forEach((img) => {
    let originalX = 0, originalY = 0;

    const draggie = new Draggabilly(img, {
        containment: document.body
    });

    draggie.on('dragStart', function () {
        img.style.transition = 'none';
        img.style.transform = 'scale(1.2)';
        const rect = img.getBoundingClientRect();
        originalX = rect.left;
        originalY = rect.top;
    });

    draggie.on('dragEnd', function () {
        img.style.transform = 'scale(1)';

        let dropped = false;
        dropZones.forEach((zone) => {
            const { left: zl, top: zt, width: zw, height: zh } = zone.getBoundingClientRect();
            const { left, top, width, height } = img.getBoundingClientRect();

            if (left + width > zl && left < zl + zw && top + height > zt && top < zt + zh) {
                zone.appendChild(img);
                img.style.position = 'relative';
                img.style.left = '0';
                img.style.top = '0';
                dropped = true;

                // Animation de dépôt
                img.style.transition = 'transform 0.3s ease-in-out';
                img.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    img.style.transform = 'scale(1)';
                }, 300);
            }
        });

        if (!dropped) {
            img.style.transition = 'transform 0.3s ease-out';
            draggie.setPosition(originalX, originalY);
        }
    });
});

