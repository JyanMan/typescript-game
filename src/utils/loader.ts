export const load = {
    assets: (): void => {
        const playerSprite = new Image();
        playerSprite.src = '../../assets/Cute_Fantasy_Free/Player/Player.png';
        
        playerSprite.setAttribute('id', 'player-sprite');
    }
}