/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Injectable } from "@angular/core";

@Injectable()

export class AppSideMenus{
	items:any = [
    {
        "item_type": "title",
        "item_label": "Dashboard",
        "item_var": "dashboard",
        "item_link": "\/home",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "home",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Home",
        "item_var": "home",
        "item_link": "\/home",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "home-outline",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Products",
        "item_var": "products_by_category",
        "item_link": "\/products-by-category",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "wine-outline",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Wishlist",
        "item_var": "wishlist",
        "item_link": "\/wishlist",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "heart-circle-outline",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Cart",
        "item_var": "cart",
        "item_link": "\/cart",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "cart-outline",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "title",
        "item_label": "Help",
        "item_var": "help",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "help-circle",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "playstore",
        "item_label": "Rate This App",
        "item_var": "rate_this_app",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "logo-google-playstore",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Privacy Policy",
        "item_var": "privacy_policy",
        "item_link": "\/privacy-policy",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "help-circle",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "About Us",
        "item_var": "about_us",
        "item_link": "\/about-us",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "dark",
        "item_icon_left": "nuclear",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    }
] ;

}
