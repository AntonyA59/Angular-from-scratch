import { CreditCardDirective } from "./directives/credit-card.directive";
import { Angular } from "./directives/framework/framework";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";

Angular.bootstrapApplication(
  {
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [
      {
        provide: "formatter",
        construct: () => new Formatter("global"),
      },
      {
        provide: "verifier",
        construct: () => new CreditCardVerifier(),
      },
    ]
  }
)








