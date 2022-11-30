import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { ModifierPopupComponent } from 'src/app/utilities/modifier-popup/modifier-popup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: any;
  subcategory: any;
  mainMenu: any;
  modifiers: any = [];
  selectedMenu: any = [];
  selectedOrderItems: any = [];
  assignModifier: boolean
  selectedModifier: any = []
  selectedMenusArray = [];
  quantity: any;
  items: any;
  modifiersWithItemsObject: any = [];
  modifiersWithItemsArray = [];
  arr = [];
  orders: any = {};



  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    // this method will show by default all menus after login 
    this.receiveCategories()
    this.getItem()

  }
  displayProducts(val) {

  }
  MenuItemClicked(menu, modifiers) {

    let menuExits = false

    this.modifiers = modifiers.itemModifiers;
    this.selectedMenu = menu
    // add item id in modifiers




    // this.modifiers.push(menu)
    // console.log("//////////////",this.modifiers)


    // this.modifiers={
    //   ...menu,
    //   m:modifiers.itemModifiers
    // }
    // this.arr.push(this.modifiers)
    // console.log("............", this.arr)
    // const arr = []
    // let dash;
    // dash=arr.push(this.modifiersWithItems)
    // console.log("push object into array", dash)

    // const nieto = {
    //   label: "Title",
    //   value: "Ramones" 
    // }
    // var nietos = [];
    // var obj = {};
    // obj["01"] = nieto.label;
    // obj["02"] = nieto.value;
    // console.log("NIETOS", nietos.push(obj))
    // nietos.push(obj);
    // const entries = Object.entries(this.modifiersWithItems);
    // console.log("entriesssssssssssssssssssssss",entries);

    console.log("Modifiers ", this.modifiers)
    // this.selectedMenu = menu;
    // console.log("selected Menu its an individual objects", menu)
    // this.modifiers = this.selectedMenu.itemModifiers
    for (let i in this.selectedMenusArray) {
      if (this.selectedMenusArray[i].menuId === menu.itemId) {
        // console.log('inside of modifier compare')
        this.selectedMenusArray[i].menuQuantity++;
        menuExits = true;


      }
      // break;
    }

    if (!menuExits) {
      this.selectedMenusArray.unshift({
        menuId: menu.itemId,
        menuName: menu.itemName,
        menuPrice: menu.itemPrice,
        menuQuantity: menu.itemQuantity + 1,
        ModifierExist: menu.assignModifier,
        menuModifiers: menu.itemModifiers
      })

    }

    // console.log("this will convert object into array", this.selectedMenusArray)

    this.api.sendMenus(this.selectedMenusArray)


  }


  addQuantity(menu) {
    // console.log(menu)
    menu.quantity += 1;

  }
  selectedModifiers(data){
    console.log(data,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
      this.modifiersWithItemsObject = {
      ...this.selectedMenu,
      ...data
    }
    console.log("xfuhioj",this.modifiersWithItemsObject)
   
      let ArrayofMM=[]
    ArrayofMM.push(this.modifiersWithItemsObject)
    this.modifiersWithItemsArray = ArrayofMM
    console.log("wanna convert object to array",  this.modifiersWithItemsArray)
     this.api.sendOrderDetail(this.modifiersWithItemsArray)




  }

  // sendSelectedModifiers(data) {


  //   data.selected = true;
   

  //   this.selectedModifier = []
  //   this.selectedModifier.unshift({
  //     modifierId: data.modifierId,
  //     modifierName: data.modifierName,
  //     modifierPrice: data.modifierPrice,
  //     modifierQuantity: 1
  //   })

   

  //   this.modifiersWithItemsObject = {
  //     ...this.selectedMenu,
  //     ...this.selectedModifier
  //   }
    // console.log("wanna try to add menu Id", this.modifiersWithItemsObject)
    // this.api.sendOrderDetail(this.modifiersWithItemsObject)
    // let ArrayofMM=[]
 
    // ArrayofMM.push(this.modifiersWithItemsObject)
  
    // this.modifiersWithItemsArray = ArrayofMM
  

    // console.log("wanna convert object to array",  this.modifiersWithItemsArray)




    // for (let i = 0; i <=  this.modifiersWithItemsArray.length; i++) {
      // if (this.modifiersWithItemsArray[i].itemId === this.selectedMenu.itemId) {
        // this.orders = {}
        // console.log("heloooo00000000000")
        // this line is used for finding last Index Array
        // let lastIndexArray;
        // lastIndexArray =  this.modifiersWithItemsArray[ this.modifiersWithItemsArray.length - 1]
        // console.log("Find Last Index",lastIndexArray)
        // this.orders = lastIndexArray;
        // console.log("plzzzzzzzzzzzzzzzzzzzzzzzzz",this.modifiersWithItemsArray.splice(0,this.modifiersWithItemsArray.length))
      
      

      // } 
      // else {
      //   console.log("heloooo00000000000")
      //   while (this.modifiersWithItemsArray.length > 0) {
      //     console.log("heloooo")
      //     this.modifiersWithItemsArray.pop();
      //     console.log(this.modifiersWithItemsArray.pop(),"clear all elements from array")
      //   }
      //   if (this.modifiersWithItemsArray[i].itemId != this.selectedMenu.itemId) {
      //     console.log("heloooo00000000000")
      //     this.orders = {}
      //     let lastIndexArray;
      //     lastIndexArray =  this.modifiersWithItemsArray[this.modifiersWithItemsArray.length - 1]
      //     this.orders = lastIndexArray;
      //   }
      // }
     
      // console.log("order order", this.orders)
      // this.modifiersWithItemsArray.splice(0,this.modifiersWithItemsArray.length)
      // console.log("plzzzzzzzzzzzzzzzzzzzzzzzzz",this.modifiersWithItemsArray.splice(0,this.modifiersWithItemsArray.length))
      // if (this.modifiersWithItemsArray.length > 0) {
      //   console.log("plzzzzzzzzzzzzzzzzzzzzzzzzz")
      //   console.log(this.modifiersWithItemsArray.pop(),"clear all elements from array")
      // }
      // break;


    // }



  // } 
  receiveCategories() {
    // get Categories from api service 
    this.api.getCategories().subscribe({
      next: (res) => {
        this.categories = res;

        for (let i = 0; i <= this.categories.length; i++) {
          // this will by default true 1st element of array which show on screen
          this.categories[0].hasMenus = true;
          // get sub category from api service
          this.api.getsubCategory(this.categories[0].sectionId).subscribe({
            next: (res) => {
              this.subcategory = res; //this subcategory used in html file to show its child
              this.allMenusShow()
            },
            error: (err) => {
              console.log('error');
              console.log(err.message)
            }
          })
          break;
        }
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  // click on subcategory which will display menu
  displaySubCategory(category: any) {
    this.categories.forEach(element => {
      if (element.sectionId == category) {
        element.hasMenus = true;
        // this will receive sub category from api array
        this.api.getsubCategory(category).subscribe({
          next: (res) => {
            this.subcategory = res;
            //  console.log(this.subcategory)
            //  this method will show main menu
            this.allMenusShow()
          },
          error: (err) => {
            console.log('error');
            console.log(err.message)
          }
        })
        // console.log(this.categories)
      } else {
        element.hasMenus = false;
      }

    })


  }
  allMenusShow() {
    for (let i = 0; i <= this.subcategory.length; i++) {
      // his will get all menus from api
      this.api.getmainmenu(this.subcategory[i].categoryId).subscribe({
        next: (res) => {
          console.log(res, "resource")
          this.assignModifier = res[i].assignModifier
          console.log(this.assignModifier, "Assign Modifiers")
          this.mainMenu = res
          this.setItem(this.mainMenu)
          var btn = document.getElementsByClassName('category_item')[0]

          let button;
          button = btn;
          if (this.subcategory[i].categoryId == '146') {
            button.style.background = 'rgb(255,69,58)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '157') {
            button.style.background = 'rgb(255,204,0)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '148') {
            button.style.background = 'rgb(52,199,89)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '159') {
            button.style.background = 'rgb(0,122,255)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '147') {
            button.style.background = 'rgb(255,149,0)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '150') {
            button.style.background = 'rgb(0,199,190)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '151') {
            button.style.background = 'rgb(165, 137, 10)'
            button.style.color = 'white'
          }
          else if (this.subcategory[i].categoryId == '153') {
            button.style.background = 'rgb(50,173,230)'
            button.style.color = 'white'
          }

          console.log(this.mainMenu, "products")

        },
        error: (err) => {
          console.log(err.message)
        }
      })
      // console.log(this.subcategory[i].categoryId);
      break;

    }
  }


  orderDetails() {

  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  // add Items in Local Stoage for persistence
  setItem(mainMenu) {
    localStorage.setItem("mainMenu", JSON.stringify(mainMenu))
  }
  getItem() {
    this.items = JSON.parse(localStorage.getItem("mainMenu"))
    console.log(this.items, "get gut")
  }
}
