import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formatter } from "../services/formatter";
import { Detector } from "./framework/change-detector";

@Directive(
  {
    selector: "[credit-card]"
  }
)
export class CreditCardDirective {

  @Input("border-color")
  @HostBinding("style.borderColor")
  borderColor = "blue";

  constructor(private verifier: CreditCardVerifier, public element: HTMLElement, private formatter: Formatter) { }

  @HostBinding("value")
  value = ""

  @Input("with-spaces")
  willHaveSpaces = true


  @HostListener('input', ["event.target.value"])
  formatCreditCardNumber(value: string) {
    this.value = this.formatter.formatNumber(value, 16, 4, this.willHaveSpaces)
  }

}