/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";


@Injectable({
	providedIn: "root"
})

export class StorageService {
	
	constructor(
		private storage: Storage
	){

		// storage
		this.storageInit();


	}


	async storageInit(){
		await this.storage.create();
	}


	/**
	* StorageService.getItems(table:string)
	**/
	public async getItems(table:string){
		let data:any = [] ;
		this.storage.forEach((val,key,index) => {
			let prefix : string = `${table}:`;
			if(key.substring(0,prefix.length) ==  prefix){
				data.push(val);
			}
		});
		return await data;
	}
	
	
	/**
	* StorageService.getItem(table:string,key:string)
	**/
	public async getItem(table:string,key:string){
		return await this.storage.get(`${table}:${key}`);
	}
	
	
	/**
	* StorageService.setItem(table:string,key:string,val:any)
	**/
	public async setItem(table:string,key:string,value:any){
		return await this.storage.set(`${table}:${key}`,value);
	}
	
	
	/**
	* StorageService.removeItem(table:string,key:string)
	**/
	public async removeItem(table:string,key:string){
		return await this.storage.remove(`${table}:${key}`);
	}
	
	
	/**
	* StorageService.clearItems(table:string)
	**/
	public async clearItems(table:string) {
		this.storage.forEach((iValue, iKey, iIndex) => {
			let prefix : string = `${table}:`;
			if(iKey.substring(0,prefix.length) ==  prefix){
				this.storage.remove(`${iKey}`);
			}
		});
	}



}

