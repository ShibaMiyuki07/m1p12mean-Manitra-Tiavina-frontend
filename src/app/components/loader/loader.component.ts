import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: [
    '../../../assets-bosh/css/font_awesome_all.css',
    '../../../assets-bosh/css/flaticon.css',
    '../../../assets-bosh/css/icomoon.css',
    '../../../assets-bosh/css/owl.css',
    '../../../assets-bosh/css/bootstrap.css',
    '../../../assets-bosh/css/jquery.fancybox.min.css',
    '../../../assets-bosh/css/animate.css',
    '../../../assets-bosh/css/hover.css',
    '../../../assets-bosh/css/global.css',
    '../../../assets-bosh/css/nice_select.css',
    '../../../assets-bosh/css/jquery_ui.css',
    '../../../assets-bosh/css/elpath.css',
    '../../../assets-bosh/css/progresscircle.css',
    '../../../assets-bosh/css/hover.css',
    '../../../assets-bosh/css/element_css/preloader.css',
    '../../../assets-bosh/css/element_css/bootsrap_tuchpin.css',
    '../../../assets-bosh/css/element_css/contact.css',
    '../../../assets-bosh/css/element_css/search_popup.css',
    '../../../assets-bosh/css/element_css/header_top.css',
    '../../../assets-bosh/css/element_css/header_upper.css',
    '../../../assets-bosh/css/element_css/header_lower.css',
    '../../../assets-bosh/css/element_css/menu_sidebar.css',
    '../../../assets-bosh/css/element_css/menu.css',
    '../../../assets-bosh/css/element_css/mobile_menu.css',
    '../../../assets-bosh/css/element_css/banner.css',
    '../../../assets-bosh/css/element_css/page_title.css',
    '../../../assets-bosh/css/element_css/main_footer_one.css',
    '../../../assets-bosh/css/element_css/footer_bottom_one.css',
    '../../../assets-bosh/css/element_css/scroll_to_top.css',
    '../../../assets-bosh/css/responsive.css',
    '../../../assets-bosh/css/style.css',
  ],
})
export class LoaderComponent {

  ngOnInit() {
    this.playLoaderAnimation();
  }

  private playLoaderAnimation(): void {
    if (typeof $ !== 'undefined') {
      console.log("loader fade");
      $('.loader-wrap').delay(5000).fadeOut(1000);
    } else {
      console.warn('jQuery non chargé');
      // Fallback vanilla JS
      document.querySelectorAll('.loader-wrap').forEach(el => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '0';
          setTimeout(() => el.remove(), 500);
        }, 200);
      });
    }
  }
}
