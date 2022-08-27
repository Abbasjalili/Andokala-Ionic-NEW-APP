/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Translate pipe
 * Just error prevention

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "translate",
})

export class TranslatePipe implements PipeTransform {

	constructor(
		
	){



	}

	transform(value:string): string{

			return value;


	}
}
