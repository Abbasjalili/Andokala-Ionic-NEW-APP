/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { SafeResourceUrl } from "@angular/platform-browser";

/**
 * TrustResourceUrl pipe
 * sanitizing Resource URL

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "trustResourceUrl",
})

export class TrustResourceUrlPipe implements PipeTransform {

	constructor(
		public domSanitizer: DomSanitizer
	){



	}

	transform(value:any): SafeResourceUrl{

			return this.domSanitizer.bypassSecurityTrustResourceUrl(value);


	}
}
