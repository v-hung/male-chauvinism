// sticky-sidebar.d.ts

declare module "sticky-sidebar" {
  class StickySidebar {
    private selector: string;
    private options: StickySidebarOptions;
  
    constructor(selector: string | HTMLElement, options: StickySidebarOptions) {
      this.selector = selector;
      this.options = options;
    }
  
    updateSticky(): void {
      // Implement logic for updating sticky sidebar
    }
  
    destroy(): void {
      // Implement logic for destroying sticky sidebar
    }
  }
  
  interface StickySidebarOptions {
    topSpacing?: number;
    bottomSpacing?: number;
    containerSelector?: string;
    innerWrapperSelector?: string;
    minWidth?: number;
    resizeSensor?: boolean
  }
  
  export default StickySidebar;
}
