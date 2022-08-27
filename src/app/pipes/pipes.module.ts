/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import {NgModule} from "@angular/core";

import {ObjectLengthPipe} from "./object-length/object-length.pipe";
import {PhpTimePipe} from "./php-time/php-time.pipe";
import {ReadMorePipe} from "./read-more/read-more.pipe";
import {StripTagsPipe} from "./strip-tags/strip-tags.pipe";
import {TimeAgoPipe} from "./time-ago/time-ago.pipe";
import {TranslatePipe} from "./translate/translate.pipe";
import {TrustHtmlPipe} from "./trust-html/trust-html.pipe";
import {TrustResourceUrlPipe} from "./trust-resource-url/trust-resource-url.pipe";
import {TrustUrlPipe} from "./trust-url/trust-url.pipe";

@NgModule({
	declarations: [
		ObjectLengthPipe,
		PhpTimePipe,
		ReadMorePipe,
		StripTagsPipe,
		TimeAgoPipe,
		TranslatePipe,
		TrustHtmlPipe,
		TrustResourceUrlPipe,
		TrustUrlPipe
	],
	imports: [],
	exports: [
		ObjectLengthPipe,
		PhpTimePipe,
		ReadMorePipe,
		StripTagsPipe,
		TimeAgoPipe,
		TranslatePipe,
		TrustHtmlPipe,
		TrustResourceUrlPipe,
		TrustUrlPipe
	]
})

export class PipesModule {}
