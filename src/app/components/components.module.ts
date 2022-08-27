/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { DirectivesModule } from "./../directives/directives.module";

import { ImageZoomComponent } from "./image-zoom/image-zoom.component";
import { PopoverComponent } from "./popover/popover.component";

@NgModule({
	declarations: [
		ImageZoomComponent,
		PopoverComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		DirectivesModule
	],
	exports: [
		ImageZoomComponent,
		PopoverComponent
	],
	entryComponents: [
		ImageZoomComponent,
		PopoverComponent
	]
})

export class ComponentsModule {}
