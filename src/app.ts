import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";


const directives = [PhoneNumberDirective, CreditCardDirective];
const services: { name: string; instance: any }[] = [];
{

}

const providers = [
  {
    provide: "formatter",
    construct: () => new Formatter("global"),
  },
  {
    provide: "verifier",
    construct: () => new CreditCardVerifier(),
  },
];





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

    const directivesProviders = directive.providers || [];

    const directiveProvider = directivesProviders.find(p => p.provide === name)

    if (directiveProvider) {
      const instance = directiveProvider.construct();
      return instance;
    }
    const service = services.find((s) => s.name === name);
    if (service) {
      return service.instance;
    }
    const provider = providers.find(p => p.provide === name);

    if (!provider) {
      throw new Error("Aucun fournisseur n'existe pour le service")
    }
    const instance = provider.construct();

    services.push({
      name: name,
      instance: instance
    })

    return instance;
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
