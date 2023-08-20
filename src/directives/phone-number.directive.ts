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
  static bindings = [
    {
      propName: "borderColor", attrName: "style.borderColor",
    },
    {
      propName: "placeholderText", attrName: "placeholder"
    }
  ]
  constructor(public element: HTMLElement, private formatter: Formatter) { }


  @Input("border-color")
  @HostBinding("style.borderColor")
  borderColor = "red";

  @Input("with-spaces")
  willHaveSpaces = true;

  @HostBinding('placeholder')
  placeholderText = "Hello World"

  @HostListener("click")
  onClick() {
    this.placeholderText = "Hello Antony";

    this.placeholderText = "Hello Magali"

    this.borderColor = 'blue';

    this.borderColor = 'red';

    this.placeholderText = "Hello Joseph"
  }

  @HostListener("input", ["event.target"])
  formatPhoneNumber(element: HTMLInputElement) {
    element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
  }

}