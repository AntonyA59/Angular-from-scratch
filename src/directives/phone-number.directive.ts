import { Formatter } from "../services/formatter"

export class PhoneNumberDirective {
    constructor(public element: HTMLElement) {}

    static selector = "[phone-number]"

    borderColor = "red"
    
    willHaveSpaces = true;

    formatter:Formatter;
    formatPhoneNumber(element: HTMLInputElement) {   
      this.formatter = new Formatter;

      element.value  = this.formatter.formatNumber(element.value,10,2,this.willHaveSpaces)
    }
  
    init() {
      
      
    if(this.element.hasAttribute('with-spaces')){
      this.willHaveSpaces = this.element.getAttribute('with-spaces') === 'true';
    }

    if(this.element.hasAttribute('border-color')){
      this.borderColor = this.element.getAttribute('border-color')!;
    }
      this.element.addEventListener("input", (event) => {
        this.formatPhoneNumber(event.target as HTMLInputElement);
      });
      this.element.style.borderColor = this.borderColor;
    }
  }