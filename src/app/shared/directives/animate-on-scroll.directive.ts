import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from "@angular/core";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "flip";

@Directive({
  selector: "[dbAnimateOnScroll]",
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input("dbAnimateOnScroll") animationType: AnimationType = "fade-up";
  @Input() animationDelay = 0;
  @Input() animationThreshold = 0.15;

  private readonly el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;
  private readonly isVisible = signal(false);

  ngOnInit(): void {
    this.setInitialState();
    this.initObserver();
  }

  private setInitialState(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.style.transition = `opacity 0.7s ease ${this.animationDelay}ms, transform 0.7s ease ${this.animationDelay}ms`;
    el.style.opacity = "0";

    const transforms: Record<AnimationType, string> = {
      "fade-up": "translateY(40px)",
      "fade-down": "translateY(-40px)",
      "fade-left": "translateX(40px)",
      "fade-right": "translateX(-40px)",
      "zoom-in": "scale(0.85)",
      flip: "rotateX(15deg)",
    };
    el.style.transform = transforms[this.animationType];
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animate();
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: this.animationThreshold },
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const el = this.el.nativeElement as HTMLElement;
    this.isVisible.set(true);
    el.style.opacity = "1";
    el.style.transform = "none";
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
