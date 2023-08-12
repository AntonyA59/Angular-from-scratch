export type ProviderMetadata =
    {
        /**
         * Le nom du service que l'on cherche à obtenir
         * Par exemple: "Formatter"
         */
        provide: string;
        /**
         * Une fonction qui retourne une instance du service que l'on cherche à fournir
         * 
         * Par exemple : () => new Formatter
         */
        construct: Function;
    };

export type ProvidersMetadata = ProviderMetadata[];

export type ServiceInstance = {
    /**
     * Le nom du service que l'on contient
     */
    name: string;

    /**
     * L'instance du service
     */
    instance: any;
}

export type ServiceInstances = ServiceInstance[];

export type Module = {
    /**
     * Le tableau qui doit contenir les classes de mes directives
     */
    declarations: any[];
    /**
     * Un tableau qui contien les définition de services pour mes 
     * directives
     */
    providers?: ProvidersMetadata
}