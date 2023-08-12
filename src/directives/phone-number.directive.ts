import { Directive } from "../decorators/directive";
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
  borderColor = "red"

  @Input("with-spaces")
  willHaveSpaces = true;


  formatPhoneNumber(element: HTMLInputElement) {
    element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces)
  }


  init() {
    this.element.addEventListener("input", (event) => {
      this.formatPhoneNumber(event.target as HTMLInputElement);
    });
    this.element.style.borderColor = this.borderColor;
  }
}