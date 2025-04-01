import {Component, inject} from "@angular/core";
import {HeaderComponent} from "../../../components/header/header.component";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {ActivatedRoute} from "@angular/router";
import {ApiProductServiceService} from "../../../services/productApi/api-product-service.service";
import {Product} from "../../../models/product";
import {lastValueFrom} from "rxjs";
import {ApiServiceServiceService} from "../../../services/serviceApi/api-service-service.service";
import {PromotionService} from "../../../services/promotionApi/api-promotion-service.service";
import {Promotion} from "../../../models/Promotion";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css',
    '../../../../assets-bosh/css/font_awesome_all.css',
    '../../../../assets-bosh/css/flaticon.css',
    '../../../../assets-bosh/css/icomoon.css',
    '../../../../assets-bosh/css/owl.css',
    '../../../../assets-bosh/css/bootstrap.css',
    '../../../../assets-bosh/css/jquery.fancybox.min.css',
    '../../../../assets-bosh/css/animate.css',
    '../../../../assets-bosh/css/hover.css',
    '../../../../assets-bosh/css/global.css',
    '../../../../assets-bosh/css/nice_select.css',
    '../../../../assets-bosh/css/jquery_ui.css',
    '../../../../assets-bosh/css/elpath.css',
    '../../../../assets-bosh/css/progresscircle.css',
    '../../../../assets-bosh/css/hover.css',
    '../../../../assets-bosh/css/element_css/preloader.css',
    '../../../../assets-bosh/css/element_css/time-travel.css',
    '../../../../assets-bosh/css/element_css/categories.css',
    '../../../../assets-bosh/css/element_css/dot_style_one.css',
    '../../../../assets-bosh/css/element_css/owl_nav_one.css',
    '../../../../assets-bosh/css/element_css/pagination.css',
    '../../../../assets-bosh/css/element_css/bootsrap_tuchpin.css',
    '../../../../assets-bosh/css/element_css/search_popup.css',
    '../../../../assets-bosh/css/element_css/header_top.css',
    '../../../../assets-bosh/css/element_css/header_upper.css',
    '../../../../assets-bosh/css/element_css/header_lower.css',
    '../../../../assets-bosh/css/element_css/menu_sidebar.css',
    '../../../../assets-bosh/css/element_css/menu.css',
    '../../../../assets-bosh/css/element_css/mobile_menu.css',
    '../../../../assets-bosh/css/element_css/banner.css',
    '../../../../assets-bosh/css/element_css/cta_section.css',
    '../../../../assets-bosh/css/element_css/cart_section.css',
    '../../../../assets-bosh/css/element_css/check_box.css',
    '../../../../assets-bosh/css/element_css/page_title.css',
    '../../../../assets-bosh/css/element_css/feature_block_one.css',
    '../../../../assets-bosh/css/element_css/product_block_one.css',
    '../../../../assets-bosh/css/element_css/clients_one.css',
    '../../../../assets-bosh/css/element_css/newsletter_one.css',
    '../../../../assets-bosh/css/element_css/main_footer_one.css',
    '../../../../assets-bosh/css/element_css/footer_bottom_one.css',
    '../../../../assets-bosh/css/element_css/scroll_to_top.css',
    '../../../../assets-bosh/css/element_css/week_sale.css',
    '../../../../assets-bosh/css/element_css/add.css',
    '../../../../assets-bosh/css/element_css/brand.css',
    '../../../../assets-bosh/css/element_css/blog.css',
    '../../../../assets-bosh/css/responsive.css',
    '../../../../assets-bosh/css/style.css',
  ],
  imports: [
    HeaderComponent,
    LoaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class CartComponent{

  currentActiveMenu: string = 'cart';
  promotion : Promotion = new class implements Promotion {
    _id: any;
    name: string = "";
    description: string = "";
    discount: number = 0;
    products: any;
    services: any;
    validFrom: Date  = new Date();
    validUntil: Date = new Date();
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
  };

  product : Product = new class implements Product {
    _id: any;
    category: string = "";
    createdDate: Date = new Date();
    description: string = "";
    image: string = "";
    name: string = "";
    price: number = 0;
    updatedDate: Date = new Date();
  };

  constructor(private promotionService: PromotionService) {}

  async ngOnInit(): Promise<void> {

  }

  calculateDiscountedPrice(originalPrice: number, discount: number): number {
    return originalPrice * (1 - discount / 100);
  }

  getSafeImagePath(filename: string): string {
    // Vérifie que le fichier existe
    const fullPath = `assets-bosh/images/upload/${filename}`;
    return fullPath;
  }
}
