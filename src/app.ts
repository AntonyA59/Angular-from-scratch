import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";


const directives = [PhoneNumberDirective, CreditCardDirective];

const formatter = new Formatter();
const verifier = new CreditCardVerifier()



directives.forEach(directive => {
  const elements = document.querySelectorAll<HTMLElement>(directive.selector);

  elements.forEach((element) => {
    const params = analyseDirectiveConstructor(directive, element)

    const directiveInstance = Reflect.construct(directive, params);
    directiveInstance.init();
  });
})

function analyseDirectiveConstructor(directive, element: HTMLElement) {
  const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
  if (!hasConstructor) {
    return [];
  }

  const paramsNames = extractParamNamesFromDirective(directive);

  const params = paramsNames.map(name => {
    if (name === "element") {
      return element;
    }

    if (name === "formatter") {
      return formatter
    }

    if (name === "verifier") {
      return verifier;
    }
  });

  return params;
}


function extractParamNamesFromDirective(directive) {
  const params = /constructor\((.*)\)/g.exec(directive.toString())
  if (!params) {
    return [];
  }
  return params[1].split(", ");
}
