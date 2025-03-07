export function playerInput(inputKey: Record<string, boolean>) {
    document.addEventListener('keydown', (e) => {
        if (e.key in inputKey) {
            inputKey[e.key] = true;
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key in inputKey) {
            inputKey[e.key] = false;
        }
    })
}