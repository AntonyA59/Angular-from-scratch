/**
 * Permet de lier une méthode de la directive à un évènement qui aura lieu sur l'élément HTML
 * 
 * @param eventName L'événement auquel on souhaite réagir et lier la méthode
 * @param params Un tableau de paramètres dont on a besoin
 * Exemple:
 * @HostListener('click', ["event.target"])
 * onClick(target){}
 * 
 */
export function HostListener(
    eventName: string,
    params: (string | number)[] = []
) {
    return function (decoratedClass, methodName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { };

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = params.map((param) => eval(param.toString()))
                this[methodName](...paramsToSend);
            });
        };
    };
}