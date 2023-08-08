import { Formatter } from "../services/formatter";

export class CreditCardDirective{

    constructor(public element: HTMLElement) {}

    static selector = "[credit-card]"

    willHaveSpaces = true
    
    formatter:Formatter;

    formatCreditCardNumber(element: HTMLInputElement) {
      this.formatter = new Formatter;
      
      element.value  = this.formatter.formatNumber(element.value,16,4,this.willHaveSpaces)
    }
    
      init(){
        this.element.style.borderColor = "blue";
        this.element.addEventListener('input', (event) => {
          this.formatCreditCardNumber(event.target as HTMLInputElement)
        })
      }
  }