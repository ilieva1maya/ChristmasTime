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

// import { ValidatorFn } from "@angular/forms";

// export function imageValidator(urlList: string[]): ValidatorFn {
//     // Create a regular expression to match URLs starting with http:// or https://, followed by allowed domains
//     const validUrlPattern = urlList.join('|'); // join URLs by '|' to create a pattern

//     // Updated regular expression to check for http(s):// followed by the valid domain or pattern
//     const regExp = new RegExp(`^https?:\/\/(?:${validUrlPattern})(?:\/[a-zA-Z0-9.\/?&=]*)?$`);

//     return (control) => {
//         console.log(control.value);
//         // Check if the control value is a valid URL based on the regular expression
//         const isImageInvalid = control.value === '' || regExp.test(control.value);        
//         return isImageInvalid ? null : { imageValidator: true }; // Return null if valid, else return error object
//     };
// }