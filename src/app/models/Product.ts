export interface Product {
    LABEL: string;
    Name: string;
    ART_CODE: string;
    details: string;
    prijs: string;
    NewPrijs: string;
    AFDE: string;
    BeginDateTime: string;
    EndDateTime: string;
}

export function initializeProduct(): Product {
    return {
        LABEL: '',
        Name: '',
        ART_CODE: '',
        details: '',
        prijs: '',
        NewPrijs: '',
        AFDE: '',
        BeginDateTime: '',
        EndDateTime: '',
    }
}