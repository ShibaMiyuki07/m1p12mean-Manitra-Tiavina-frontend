import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../components/header/header.component";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {Product} from "../../../models/product";
import {ApiProductServiceService} from "../../../services/productApi/api-product-service.service";
import {DecimalPipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {CategoryCount} from "../../../models/CategoryCount";
import {environment} from "../../../../environments/environment";
import {FooterComponent} from "../../../components/footer/footer.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-client-product-list',
  standalone: true,
  imports: [
    HeaderComponent,
    LoaderComponent,
    NgForOf,
    NgIf,
    FooterComponent,
    FormsModule,
    SlicePipe
  ],
  templateUrl: './client-product-list.component.html',
  styleUrls: ['./client-product-list.component.css',
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
    '../../../../assets-bosh/css/progresscircle.css',
    '../../../../assets-bosh/css/jquery_ui.css',
    '../../../../assets-bosh/css/elpath.css',
    '../../../../assets-bosh/css/element_css/preloader.css',
    '../../../../assets-bosh/css/element_css/time-travel.css',
    '../../../../assets-bosh/css/element_css/categories.css',
    '../../../../assets-bosh/css/element_css/instagram.css',
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
    '../../../../assets-bosh/css/element_css/xs_sidebar.css',
    '../../../../assets-bosh/css/element_css/shop_block_one.css',
    '../../../../assets-bosh/css/element_css/shop_section.css',
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
  ]
})

export class ClientProductListComponent implements OnInit {
  url = environment.apiUrl;
  currentActiveMenu = "products";
  products: Product[] | undefined = [];
  productService: ApiProductServiceService = inject(ApiProductServiceService);
  categoryCount : CategoryCount[] = [];
  productsCopy: Product[] | undefined = [];
  viewType:string = "gridView";
  searchTerm: string = "";
  actualPage: number = 1;
  pageNumber: number = 0;



  async ngOnInit() {
    this.products = await this.productService.getAllProducts().toPromise();
    this.productsCopy = this.products;
    this.getPageNumber();
    this.products = this.productsCopy?.slice(this.actualPage-1,(this.actualPage*12));
    console.log(this.products);
    this.categoryCount = this.getCategoryCounts();
  }

  searchResult()
  {
    this.products = this.productsCopy?.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.category.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.getPageNumber();
  }

  getAll()
  {
    this.actualPage = 1;
    this.products = this.productsCopy;
    this.getPageNumber();
    this.products = this.productsCopy?.slice((this.actualPage-1)*12,this.actualPage*12);
    console.log(this.productsCopy);

  }


  changePage(pageNumber: number): void {
    this.actualPage = pageNumber;
    this.products = this.productsCopy?.slice(((this.actualPage-1)*12),(this.actualPage*12))
  }

  changeViewType() {
    if (this.viewType == 'gridView') {
      this.viewType = 'listView';
    }
    else if (this.viewType == 'listView') {
      this.viewType = 'gridView';
    }
    console.log(this.viewType);
  }

  getPageNumber()
  {
    this.pageNumber = 1;
    console.log(this.products!.length);
    while(this.pageNumber * 12 < this.products!.length) {
      this.pageNumber++;
    }
    console.log(this.pageNumber);
  }


  getCategoryCounts(): CategoryCount[] {
    if (!this.productsCopy) return [];

    // Count using reduce
    const categoryCounts = this.productsCopy.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Convert to array format
    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));
  }

  filterByCategory(category: string)
  {
    this.actualPage = 1;
    this.products = this.productsCopy?.filter(product => product.category == category);
    this.getPageNumber();
  }
}
