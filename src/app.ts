class PhoneNumberDirective {
    constructor(public element: HTMLElement){}
    init(){
        this.element.style.borderColor = "red";

        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            const value = element.value.replace(/[^\d]/g, '').substring(0,10);
            const groups: string[] = []
            for(let i = 0; i< value.length; i+=2){
                groups.push(value.substring(i, i+2))
            } 

            element.value =groups.join(' ');
            console.log(groups);
        })
    }
}

const element = document.querySelector<HTMLElement>('#mobile-number');
if(element){
    const directive = new PhoneNumberDirective(element)
    directive.init();
}