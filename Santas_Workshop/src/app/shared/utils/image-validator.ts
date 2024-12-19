import { ValidatorFn } from "@angular/forms"

export function imageValidator(url: string[]): ValidatorFn {
    const validUrl = url.join('|')
    
    
    const regExp = new RegExp(`^https?:\/\/(${validUrl})`)

    return (control) => {
        console.log(control.value);
        const isImageInvalid = control.value === '' || regExp.test(control.value);        
        return isImageInvalid ? null : {imageValidator: true}
    }
}  

