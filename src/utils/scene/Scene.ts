export abstract class Scene {
    abstract load(): void;
    abstract unload(): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
    abstract update(deltaTime: number): void;
    abstract fixedUpdate(fixedDeltaTime: number): void;
}