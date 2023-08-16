import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { Formatter } from "../services/formatter"

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

  @HostBinding('placeholder')
  placeHolderText = "Hello world"


  @HostListener("input", ["event.target"])
  formatPhoneNumber(element: HTMLInputElement) {
    element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
  }

}