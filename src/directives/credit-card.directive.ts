import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formatter } from "../services/formatter";

@Directive(
  {
    selector: "[credit-card]"
  }
)
export class CreditCardDirective {

  @HostBinding('style.borderColor')
  borderColor = "blue";

  constructor(private verifier: CreditCardVerifier, public element: HTMLElement, private formatter: Formatter) { }


  willHaveSpaces = true


  @HostListener('input', ["event.target"])
  formatCreditCardNumber(element: HTMLInputElement) {
    element.value = this.formatter.formatNumber(element.value, 16, 4, this.willHaveSpaces)
  }

}