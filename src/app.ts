import { CreditCardDirective } from "./directives/credit-card.directive";
import { Angular } from "./framework/framework";
import { NgZone } from "./framework/zone";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";
import { ChronoDirective } from "./directives/chrono.directive";



Angular.bootstrapApplication(
  {
    declarations: [PhoneNumberDirective, CreditCardDirective, ChronoDirective],
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
  });









