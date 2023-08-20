import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";

@Directive({
    selector: "div[chrono]"
})
export class ChronoDirective {
    @HostBinding("textContent")
    count = 0;

    intervalID: number;


    constructor(public element: HTMLElement) { }

    @HostListener("click")
    onClick() {
        if (this.intervalID) {
            window.clearInterval(this.intervalID);
            this.count = 0
            this.intervalID = undefined;
            return;
        }
        this.intervalID = window.setInterval(() => this.count++, 1000);
    }

    init() {
        this.intervalID = window.setInterval(() => this.count++, 1000);
    }
}