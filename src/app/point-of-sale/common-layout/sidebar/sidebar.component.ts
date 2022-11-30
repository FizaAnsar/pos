 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isCollapsed = true;
  noteVAlue: string = '';
  changenotevalue(note) {
    // console.log(note)
    this.noteVAlue = '';
    this.noteVAlue = note;
  }
  cartItems = [];
  cartTotal = 0;
  gst = 0
  total = 0
  serviceCharge = 0
  Cart = []
  dropdownvalue: any;


  modifiers: any = [];
  menuNames: any = [];
  searchQuantity: any;



  allmenus: any;
  formGroup: FormGroup;
  filteredOptions;
  arr = Array();
  menuNameArray = [];
  menuArray = [];
  menuCodeName;
  searchCart: any = [];
  orderData: any = [];
  allModifiers: any = [];
  selectedModifier: any;
  selectedModifierArray: any[];
  withoutModifiers: any[];

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder, private confirmService: NgConfirmService
  ) { }

  ngOnInit(): void {
    this.api.recieveMenus().subscribe(selectedMenu => {
      // console.log("sidebarrrrrrrrrrrrrrrr", selectedMenu)
      this.allmenus = selectedMenu;
      // console.log("sjyfikuglihlo", this.allmenus);
      this.cartTotals()

    })
    this.api.receiveOrderMenu().subscribe(orderDetail => {
      // console.log("In SideBars", orderDetail)
      this.addProductToCart(orderDetail)
    })
    // this.order()
    this.initForm()
    this.getMenuNames()
  }


  addProductToCart(cart) {
    // let menuExits = false
    // for (let i in this.cartItems) {
    //   if (this.cartItems[i].menuId === cart.itemId) {
    //     this.modifiers.unshift({
    //       modifierId: cart[i].modifierId,
    //       modifierName: cart[i].modifierName,
    //       modifierPrice: cart[i].modifierPrice,
    //       modifierQuantity: 1,
    //     })
       
      // }
      // if (this.cartItems[i].menuId === cart.itemId) {
      //   if (this.cartItems[i].modifierId != cart[0].modifierId) {
      //     console.log("stoppppppppppppppppppp")
      //     this.modifiers.unshift({
      //       modifierId: cart[i].modifierId,
      //       modifierName: cart[i].modifierName,
      //       modifierPrice: cart[i].modifierPrice,
      //       modifierQuantity: 1,
      //     })

      //   }
      // }
      // menuExits = true;

    // }
    // console.log(this.cartItems, "outside of for statement ");
    // console.log(this.modifiers, "outside of for statement MODIFIERS");

    // if (!menuExits) {

    //   for (let i = 0; i <= this.cartItems.length; i++) {
    //     this.cartItems.unshift({
    //       menuId: cart.itemId,
    //       menuName: cart.itemName,
    //       menuQty: cart.itemQuantity + 1,
    //       menuPrice: cart.itemPrice,


    //     })
      // }
    // }
    // console.log(this.cartItems, "outside of for statement ");
    // this.cartTotals()
    console.log("All Menus",this.allmenus)
    console.log("cart with modifier",cart)
    // console.log("thisdcsb", this.allmenus[i].menuId );
    console.log(cart[0].itemId)
    let menuwithModifier =[]
    for(let i=0; i<=this.allmenus.length; i++){
      if(this.allmenus[i].menuId === cart[0].itemId){
       menuwithModifier.unshift({
          modifierId:cart[0].modifierId,
          modifierName:cart[0].modifierName,
          modifierPrice:cart[0].modifierPrice
        })
      }
   
      console.log("After adding Modifiers in it",menuwithModifier)
    }
    
  }
  cartTotals() {
    // let cart_Total = 0;
    this.cartTotal = 0
    this.allmenus.forEach(item => {
      this.cartTotal += (item.menuQuantity * item.menuPrice);
      // passing menu Total to payment

      // console.log("cart Total")
      // this.storeTotalinLS(cart_Total)
      // this.getTotalfromLS()

    })

    this.gst = (this.cartTotal * (17 / 100))
    this.total = this.cartTotal + (this.cartTotal * (16 / 100))
    this.serviceCharge = this.cartTotal + (this.cartTotal * (5 / 100))
  }
  menuInc(cartItem) {
    cartItem.menuQuantity += 1;
    this.cartTotals()
  }

  menuDec(cartItem) {
    if (cartItem.menuQuantity != 1) {
      cartItem.menuQuantity -= 1;
      this.cartTotals()

    }
  }

  sendVariables() {
    this.api.menuTotal = this.cartTotal;
    this.api.gst = this.gst;
    this.api.total = this.total;
    this.api.serviceCharge = this.serviceCharge;
    this.router.navigate(['/point-of-sale', {
      outlets: { 'pos': ['payment'] }
    }])
  }
  removeMenuItem(cartItem) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {

        let index = this.allmenus.findIndex((item) => {
          // localStorage.removeItem(item)

          return item.menuId === cartItem.menuId

        });
        // this.Cart.splice(index, 1);
        this.allmenus.splice(index, 1);
        // this.setInStorage(this.Cart)
        this.cartTotals()
        if (this.allmenus.length === 0) {

          this.cartTotal = 0
          // this.storeTotalinLS(this.cartTotal)
        }


        // this.getfromStorage()
      },
      () => {

      })

  }
  modInc(cartItem) {
    cartItem.modifierQuantity += 1
    this.cartTotals()
  }
  modDec(cartItem) {
    if (cartItem.modifierQuantity != 1) {
      cartItem.modifierQuantity -= 1;
      this.cartTotals()

    }
  }
  /////Search Functionality start////////////////////////////

  initForm() {
    this.formGroup = this.fb.group({
      'menuItems': ['']
    })
    // .pipe(debounceTime(1000))
    this.formGroup.get('menuItems').valueChanges
      .subscribe(resp => {
        if (resp && resp.length) {

          this.filteredData(resp)
        } else {
          this.filteredOptions = []
        }
      })
  }
  filteredData(eneterdData) {


    this.filteredOptions = this.menuNameArray.filter(item => {
      return item.toLowerCase().indexOf(eneterdData.toLowerCase()) > -1
    })

  }
  getMenuNames() {
    this.api.getMenuNames().subscribe({
      next: (res) => {

        let Category;
        Category = res;
        for (let i = 0; i < Category.length; i++) {
          let subCategories;
          subCategories = Category[i].categoryDAOs;
          for (let n = 0; n < subCategories.length; n++) {
            let products;
            products = subCategories[n].menuDAOs;
            for (let k = 0; k < products.length; k++) {
              let menus;
              menus = products[k]
              // console.log("all menus in orders", menus)
              this.menuNameArray.push(menus.menuName);
              this.menuArray.push(menus)

            }
          }
          break;
        }
        console.log(this.menuNameArray);
        console.log("whole menu array", this.menuArray)
      },
      error: (err) => {
        console.log(err.message)

      }
    }
    )
  }


  getMenuCode(e) {
    //  console.log(e)
    for (let i = 0; i <= this.menuArray.length; i++) {
      // console.log(this.menuArray[i].menuCode)
      if (this.menuArray[i].menuCode === e) {
        this.menuCodeName = this.menuArray[i].menuName
        console.log(this.menuCodeName)
      }
    }
  }
  getQuantityofSearch(value) {
    this.searchQuantity = value
  }
  handleKeyUpforMenuCode(e, Code) {
    // console.log(e)
    if (e.key === 'Enter' || e.keyCode === 13) {
      //  console.log(nextButtons ,"button")
      document.getElementById('3').focus()
      for (let i = 0; i <= this.menuArray.length; i++) {
        // console.log(this.menuArray[i].menuCode)
        if (this.menuArray[i].menuCode === Code) {
          this.menuCodeName = this.menuArray[i].menuName
          console.log(this.menuCodeName)
        }
      }

      console.log(e)
      this.addSearchItemstoCart()
    }
  }

  handlekeyuponDropdownforInput(event) {
    console.log("for selection change", event)
    if (event.key === 'Enter' || event.keyCode === 13) {
      document.getElementById('3').focus()
      this.menuCodeName = this.dropdownvalue;
      // console.log(event)
      // this.addSearchItemstoCart()
    }
  }
  handlekeyuponDropdown(selectedVal) {
    this.dropdownvalue = selectedVal
  }

  addSearchItemstoCart() {
    this.searchCart.unshift({
      searchName: this.menuCodeName,
      searchQty: this.searchQuantity
    })
    console.log(this.searchCart, "search Item")
  }

  handleKeyUpforaddSearchItemsinCart(e, val) {
    this.searchQuantity = val
    if (e.key === 'Enter' || e.keyCode === 13) {

      //  console.log(e)
      this.addSearchItemstoCart()
    }
  }

  /////Search Functionality end////////////////////////////
}
