export function playerInput(inputKey) {
    document.addEventListener('keydown', (e) => {
        if (e.key in inputKey) {
            inputKey[e.key] = true;
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.key in inputKey) {
            inputKey[e.key] = false;
        }
    });
}
//# sourceMappingURL=playerInput.js.map