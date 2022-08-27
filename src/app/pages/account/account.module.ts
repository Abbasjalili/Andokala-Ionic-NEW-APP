/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { DirectivesModule } from "./../../directives/directives.module";
import { PipesModule } from "./../../pipes/pipes.module";
import { ComponentsModule } from "./../../components/components.module";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { AccountPageRoutingModule } from "./account-routing.module";
import { environment } from "./../../../../src/environments/environment";
import { Globals } from "../../class/globals/globals";
import { Observable } from "rxjs";
import { AccountService } from "./../../services/account/account.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { AccountPage } from "./account.page";


/** i18n **/
import localeFa from "@angular/common/locales/fa";
registerLocaleData(localeFa, "fa");


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		HttpClientModule,
		DirectivesModule,
		PipesModule,
		ComponentsModule,
		IonicStorageModule.forRoot({ name : "Andokala"  }),
		AccountPageRoutingModule
	],
	declarations: [AccountPage],
	exports: [],
	entryComponents: [],
	providers: [
	{ provide: LOCALE_ID, useValue: "fa" },
			StatusBar,
			AccountService,
			PopoverController,
			Globals
	]
})
export class AccountPageModule {}
