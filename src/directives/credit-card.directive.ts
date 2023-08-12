import { Directive } from "../decorators/directive";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formatter } from "../services/formatter";

@Directive(
  {
    selector: "[credit-card]"
  }
)
export class CreditCardDirective {

  constructor(private verifier: CreditCardVerifier, public element: HTMLElement, private formatter: Formatter) { }


  willHaveSpaces = true



  formatCreditCardNumber(element: HTMLInputElement) {
    element.value = this.formatter.formatNumber(element.value, 16, 4, this.willHaveSpaces)
  }

  init() {
    this.element.style.borderColor = "blue";
    this.element.addEventListener('input', (event) => {
      this.formatCreditCardNumber(event.target as HTMLInputElement)
    })
  }
}