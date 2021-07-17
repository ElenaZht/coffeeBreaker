import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faChevronLeft, faChevronRight, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {ActivatedRoute} from '@angular/router';
library.add(faChevronUp);
library.add(faChevronRight);
library.add(faChevronLeft);
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MenuItemDialogComponent} from '../menu-item-dialog/menu-item-dialog.component';
@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit  {
  category: any;
  choosedItem: any;
  categories = [
    {categoryName: 'Coffee', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {prodId: 1000, title: 'Coffee Breaker', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}, {ing: 'Blueberry', ingClass: 'blueberry'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1001, title: 'Frappe', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Cream', ingClass: 'cream'},  {ing: 'Syrup', ingClass: 'syrup'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1002, title: 'Latte Makiata', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Chocolate', ingClass: 'chocolate'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1003, title: 'Latte', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1004, title: 'Latte Honey', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Honey', ingClass: 'honey'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1005, title: 'Ice caffee', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'},  {ing: 'Ice', ingClass: 'ice'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1006, title: 'Espresso', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1007, title: 'Capuchino', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1008, title: 'Americano', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1009, title: 'Ristretto', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1010, title: 'Lungo', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1011, title: 'Latte Oreo', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Oreo Cookies', ingClass: 'oreo'}], nutr: '../../assets/nutritions.png'
        }
      ], classLeft: 'coffee-beans', classRight: 'coffee-spot', goLeft: 'Bakery', goRight: 'Tea'},
    {categoryName: 'Tea', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {prodId: 1012, title: 'Tea Green Mint Lime', price: 12 , desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Green tea', ingClass: 'tea-leaves'},  {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Lime Peal', ingClass: 'limes'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1013, title: 'Tea 5 herbs', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Eucalyptus', ingClass: 'eucalyptus'}, {ing: 'Rosemary', ingClass: 'rosemary'}, {ing: 'Thyme', ingClass: 'thyme'}, {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Chamomile', ingClass: 'chamomile'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1014, title: 'Tea Lady Gray', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Black tea', ingClass: 'black-tea'}, {ing: 'Bergamonia', ingClass: 'bergamonia'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1015, title: 'Tea Honey&Cinnamon', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'Tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Green tea', ingClass: 'tea-leaves'}, {ing: 'Honey', ingClass: 'honey'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}], nutr: '../../assets/nutritions.png'
        }
      ], classLeft: 'tea-pile', classRight: 'tea-spot', goLeft: 'Coffee', goRight: 'Drinks'},
    {categoryName: 'Drinks', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', products: [
        {prodId: 1016, title: 'Cool Orange', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/orange-cup.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Oranges', ingClass: 'oranges'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Mint Leaves', ingClass: 'mint'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1017, title: 'Mango Sunrise', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/yellow-cup.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mango', ingClass: 'mango'},   {ing: 'Syrup', ingClass: 'syrup'}, {ing: 'Ice', ingClass: 'ice'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1018, title: 'Rich Raspberry', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/pink-cup.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Raspberry', ingClass: 'raspberry'}, {ing: 'Cream', ingClass: 'cream'}, {ing: 'Ice', ingClass: 'ice'}, {ing: 'Thyme', ingClass: 'thyme'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}, {ing: 'Sugar', ingClass: 'sugar'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1019, title: 'Ice Choco', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cocoa-cup.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [ {ing: 'Ice', ingClass: 'ice'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Chocolate', ingClass: 'chocolate'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1020, title: 'Coca Cola', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cola-bottle.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1021, title: 'Sprite', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sprite-bottle.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1022, title: 'Mineral Water', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/water-bottle.png', menuCategory: 'Drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        }
      ], classLeft: 'juice', classRight: 'ice2', goLeft: 'Tea', goRight: 'Sweets'},
    {categoryName: 'Bakery', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', products: [
        {prodId: 1023, title: 'Cruasan', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cruasan.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1024, title: 'Cruasan & Nutella', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cruasan-nutella.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Nutella', ingClass: 'nutella'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1025, title: 'Cookie', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cookie.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1026, title: 'Cupcake Brownie', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cupcake-choco.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cocoa', ingClass: 'cocoa'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1027, title: 'Cupcake Happy Birthday', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cupcake-hb.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Candle', ingClass: 'candle'}, {ing: 'Sprinkling', ingClass: 'sprinkling'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1028, title: 'Glass Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-glass.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1029, title: 'Zebra Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-white.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cream', ingClass: 'cream'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1030, title: 'Sugar Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-sugar.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1031, title: 'Sprinkling Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-pink.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Sprinkling', ingClass: 'sprinkling'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1032, title: 'Brownie', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/brownie.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cocoa', ingClass: 'cocoa'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1033, title: 'Peanut Macaroons', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/macaroons.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Peanut Butter', ingClass: 'peanut-butter'}, {ing: 'Almond', ingClass: 'almond'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1034, title: 'Apple Shtrudel', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/shtrudel.png', menuCategory: 'Bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Apple', ingClass: 'apple'}], nutr: '../../assets/nutritions.png'
        }
      ], classLeft: 'eggs-left', classRight: 'sprinkling-right', goLeft: 'Sandwiches', goRight: 'Coffee'},
    {categoryName: 'Sandwiches', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {prodId: 1035, title: 'Chicken Sandwich', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich3.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Chicken Breast', ingClass: 'chiken'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1036, title: 'Roastbeef Sandwich', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich2.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Beef', ingClass: 'beef'}, {ing: 'Cheese', ingClass: 'cheese'}], nutr: '../../assets/nutritions.png'
        },

        {prodId: 1037, title: 'Toast Mozzarella', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost1.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Mozzarella', ingClass: 'mozzarella'}, {ing: 'Basil', ingClass: 'basil'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1038, title: 'Toast Mozzarella & Spicy Tomatoes', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost2.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Mozzarella', ingClass: 'mozzarella'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Spice', ingClass: 'spicies'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1039, title: 'Tost Spicy Beef', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost3.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Beef', ingClass: 'beef'},  {ing: 'Cheese', ingClass: 'cheese'}, {ing: 'Spice', ingClass: 'spicies'}], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1040, title: 'Sandwich Veggies & Mozzarella', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich.jpg', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Chicken Breast', ingClass: 'chiken'},  {ing: 'Mozzarella', ingClass: 'mozzarella'}], nutr: '../../assets/nutritions.png'
        }
      ], classLeft: 'baget-left', classRight: 'vegs-right', goLeft: 'Sweets', goRight: 'Bakery'},
    {categoryName: 'Sweets', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {prodId: 1041, title: 'Twix', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/twix.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1042, title: 'Snickers', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/snickers.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1043, title: 'Bounty', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/bounty.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1044, title: 'M & Ms', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/mms.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1045, title: 'KitKat', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/kitkat.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1046, title: 'Milka Milk Chocolate', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/milka.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1047, title: 'Haribo Gummy Candies', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/gummy.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        },
        {prodId: 1048, title: 'MaxMallows Marshmallow', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/marsh.png', menuCategory: 'Sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [], nutr: '../../assets/nutritions.png'
        }

      ], classLeft: 'bears-left', classRight: 'twix-right', goLeft: 'Drinks', goRight: 'Sandwiches'}
  ];

  windowScrolled: boolean;
  constructor(private route: ActivatedRoute,  private router: Router, public dialog: MatDialog) {
    this.category = this.categories[0];
    const categoryName = this.route.snapshot.paramMap.get('category_name');
    console.log('category name: ', categoryName);
    this.category = this.categories.find(c => {
      return c.categoryName === categoryName;
    });
    console.log('category ', this.category);

    const queryParams = this.route.snapshot.queryParams;
    const itemId = queryParams.itemId;
    this.choosedItem = this.category.products.find(i => {
      return i.prodId === parseInt(itemId);
    });

  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 1) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  ngOnInit() {
    if (this.choosedItem) {
      setTimeout(() => {
      console.log('before onItem ');
      this.onItem(this.choosedItem);
      }, 500);
    }
  }


  go(c) {
    let curCategory = this.categories.findIndex(i => {
      return i.categoryName === this.category.categoryName;
    });
    if (curCategory === 0 && c < 0) {
      curCategory = this.categories.length - 1;
    } else if (curCategory === this.categories.length - 1 && c > 0) {
      curCategory = 0;
    } else {
      curCategory = curCategory + c;
    }
    this.category = this.categories[curCategory];
  }
  onItem(item) {
    const dialogRef = this.dialog.open(MenuItemDialogComponent, {panelClass: 'custom-dialog-container', height: '60vmin',
      width: '55vmax', data: item});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The lang dialog was closed', result);
    });
  }

}
