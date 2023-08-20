import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { Formatter } from "../services/formatter"
import { Detector } from "../framework/change-detector";

@Directive({
  selector: "[phone-number]",
  providers: [{
    provide: "formatter",
    construct: () => new Formatter("spécifique")
  }]

})
export class PhoneNumberDirective {

  constructor(public element: HTMLElement, private formatter: Formatter) { }


  @Input("border-color")
  @HostBinding("style.borderColor")
  borderColor = "red";

  @Input("with-spaces")
  willHaveSpaces = true;

  @HostBinding("value")
  value = ""


  @HostBinding('placeholder')
  placeholderText = "Hello World"

  @HostListener("click")
  onClick() {
    this.placeholderText = "Hello Antony";
  }

  @HostListener("input", ["event.target.value"])
  formatPhoneNumber(value: string) {
    this.value = this.formatter.formatNumber(value, 10, 2, this.willHaveSpaces);
    Detector.digest();
  }

}