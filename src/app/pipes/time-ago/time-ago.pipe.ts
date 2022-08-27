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
 * TimeAgo pipe
 * Convert Date into time ago format

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "timeAgo",
})

export class TimeAgoPipe implements PipeTransform {

	constructor(
		
	){



	}

	transform(value:any,args?:any): any{

			let years_ago:string = `years ago` ;
			let months_ago:string = `months ago` ;
			let days_ago:string = `days ago` ;
			let hours_ago:string = `hours ago` ;
			let minutes_ago:string = `minutes ago` ;
			let seconds_ago:string = `seconds ago` ;
			let date: any = new Date(value);
			var seconds = Math.floor((Date.now() - date) / 1000);
			
			var interval = Math.floor(seconds / 31536000);
			if (interval > 1){
				return `${interval} ${years_ago}`;
			}
			
			interval = Math.floor(seconds / 2592000);
			if (interval > 1){
				return `${interval} ${months_ago}`;
			}
			
			interval = Math.floor(seconds / 86400);
			if (interval > 1) {
				return `${interval} ${days_ago}`;
			}
			
			interval = Math.floor(seconds / 3600);
			if (interval > 1) {
				return `${interval} ${hours_ago}`;
			}
			
			interval = Math.floor(seconds / 60);
			if (interval > 1) { 
				return `${interval} ${minutes_ago}`; 
			}
			
			return Math.floor(seconds) + ` ${seconds_ago}`;
			


	}
}
