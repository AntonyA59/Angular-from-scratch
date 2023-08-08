import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";


const directives = [PhoneNumberDirective, CreditCardDirective];
directives.forEach(directive => {
  const elements = document.querySelectorAll<HTMLElement>(directive.selector);

  elements.forEach((element) => {
    const directiveInstance = new directive(element);
    directiveInstance.init();

  });
})


const creditCardElements = document.querySelectorAll<HTMLElement>("[credit-card]");

creditCardElements.forEach((element) => {
  const directive = new CreditCardDirective(element);
  directive.init();
});