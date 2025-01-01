



export interface navIcon {
  id: number;
  icon: string;
  label: string;
  navigate: string;
  isAccordion: boolean;
  children: navIcon[]
}
export const navIcon: navIcon[] = [
  {
    id: 0,
    icon: "fa-solid fa-gauge",
    label: 'Tổng quan',
    navigate: '/admin/dashboard',
    isAccordion: false,
    children: []
  },
  {
    id: 1,
    icon: "fa-brands fa-product-hunt",
    label: 'Sản phẩm',
    navigate: '/admin/product',
    isAccordion: true,
    children: [
      {
        id: 1.1,
        icon: "fa-solid fa-plus",
        label: 'Thêm sản phẩm',
        navigate: '/admin/createProduct',
        isAccordion: false,
        children: []
      },
      {
        id: 1.2,
        icon: "fa-solid fa-list",
        label: 'Danh sách sản phẩm',
        navigate: '/admin/product',
        isAccordion: false,
        children: []
      },
      {
        id: 1.3,
        icon: "fa-solid fa-magnet",
        label: 'Thuộc tính sản phẩm',
        navigate: '/admin/attributes',
        isAccordion: false,
        children: []
      }
    ]
  },
  {
    id: 2,
    icon: "fa-solid fa-cart-shopping",
    label: 'Đơn hàng',
    navigate: '/admin/order',
    isAccordion: false,
    children: []
  },
  {
    id: 3,
    icon: "fa-solid fa-wand-magic-sparkles",
    label: 'Đánh giá sản phẩm',
    navigate: '/admin/review',
    isAccordion: false,
    children: []
  },
  {
    id: 4,
    icon: "fa-solid fa-warehouse",
    label: 'Kho',
    navigate: '/admin/warehouse',
    isAccordion: false,
    children: []
  },
  {
    id: 5,
    icon: "fa-solid fa-users",
    label: 'Người dùng',
    navigate: '/admin/users',
    isAccordion: false,
    children: []
  },
  // {
  //   id: 6,
  //   icon: "fa-brands fa-salesforce",
  //   label: 'Khuyến mãi',
  //   navigate: '/admin/category',
  //   isAccordion: true,
  //   children: [
  //     {
  //       id: 6.1,
  //       icon: "fa-solid fa-plus",
  //       label: 'Thêm sản phẩm',
  //       navigate: '/admin/createSale',
  //       isAccordion: false,
  //       children: []
  //     },
  //     {
  //       id: 6.2,
  //       icon: "fa-solid fa-list",
  //       label: 'Danh sách sản phẩm',
  //       navigate: '/admin/sale',
  //       isAccordion: false,
  //       children: []
  //     }
  //   ]
  // },
  {
    id: 7,
    icon: "fa-solid fa-layer-group",
    label: 'Danh mục sản phẩm',
    navigate: '/admin/category',
    isAccordion: false,
    children: []
  }
];

export const pathName = {
  auth:{
    login: '',
    signUp: 'sign-up',
    forgotPassword: 'forgot-password',
    verifyCode: 'verify-code',
    resetPassword: 'reset-password',
  },
  user: {
    home: 'home',
    cart: 'cart',
    checkout: 'checkout',
    productDetail: 'productDetail/:id',
    search: 'search',
    profile: 'profile',
    order: 'order',
  },
  admin: {
    dashBroad: 'dashBroad',
    product: 'product',
    category: 'category',
    user: 'user',
    comment: 'comment',
    statistical: 'statistical',
  }
};
