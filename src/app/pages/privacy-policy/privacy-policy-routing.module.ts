/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivacyPolicyPage } from "./privacy-policy.page";

const routes: Routes = [
	{
		path: "",
		component: PrivacyPolicyPage,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PrivacyPolicyPageRoutingModule {}
