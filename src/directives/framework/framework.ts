import { Detector } from "./change-detector";
import { Module, ProvidersMetadata } from "./types";
import set from "lodash/set";
export class Framework {

    /**
     * Le tableau qui recense l'ensemble des directives déclarées par
     * mes collègue dans le projet
     */
    directives: any = [];
    /**
     * Le tableau qui contients les services déja construites
     * (Pour ne pas avoir à les reconstruire indéfiniment)
     */
    services: { name: string; instance: any }[] = [];

    /**
     * Le tableau qui contient les définitions de mes service (comment
     * construire tel ou tel service)
     */
    providers: { provide: string; construct: Function }[] = [];
    /**
     * Le traitement qui va instancier les directives et les greffer  
     * aux élément HTML ciblés par les sélecteurs CSS
     */
    bootstrapApplication(metadata: Module) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;
        this.directives.forEach((directive) => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);

            elements.forEach((element) => {
                const params = this.analyseDirectiveConstructor(directive, element)

                const directiveInstance: any = Reflect.construct(directive, params);
                const proxy = new Proxy(directiveInstance, {
                    set(target, propName: string, value, proxy) {
                        target[propName] = value;
                        if (!directive.bindings) {
                            return true;
                        }
                        const binding = directive.bindings.find((b) => b.propName === propName);

                        if (!binding) {
                            return true;
                        }

                        Detector.addBinding(element, binding.attrName, value);


                        // set(target.element, binding.attrName, value)
                        return true;
                    }
                });
                proxy.init();
            });
        })
    }

    /**
     * Permet d'analyser les besoins d'un constructeur et de créer les
     * instance nécéssaires (les dépendance)
     * @param directive La classe de la directive à instancier
     * @param element L'élément HTML sur lequel on veut greffer la directive
     * @returns Le tableau de paramètres nécessaire pour instancier ma directive
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
        if (!hasConstructor) {
            return [];
        }

        const paramsNames = this.extractParamNamesFromDirective(directive);

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
            const service = this.services.find((s) => s.name === name);
            if (service) {
                return service.instance;
            }
            const provider = this.providers.find(p => p.provide === name);

            if (!provider) {
                throw new Error("Aucun fournisseur n'existe pour le service")
            }
            const instance = provider.construct();

            this.services.push({
                name: name,
                instance: instance
            })

            return instance;
        });

        return params;
    };
    /**
     * Extrait les noms des paramètres du constructeur d'une directive
     * 
     * @param directive La directive dont je veux connaître les paramètres
     * @returns Un tableau avec les noms des paramètres du constructeur
     */
    private extractParamNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString())
        if (!params) {
            return [];
        }
        return params[1].split(", ");
    }
}

export const Angular = new Framework();