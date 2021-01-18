import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faChevronLeft, faChevronRight, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {icon, library} from '@fortawesome/fontawesome-svg-core';
import {ActivatedRoute} from '@angular/router';
library.add(faChevronUp);
library.add(faChevronRight);
library.add(faChevronLeft);
import {Router} from '@angular/router';
@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  category: any;
  categories = [
    {categoryName: 'Coffee', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {title: 'Coffee Breaker', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}, {ing: 'Blueberry', ingClass: 'blueberry'}],
        },
        {title: 'Frappe', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Cream', ingClass: 'cream'},  {ing: 'Syrup', ingClass: 'syrup'}],
        },

        {title: 'Latte Makiata', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Chocolate', ingClass: 'chocolate'}],
        },
        {title: 'Latte', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}],
        },
        {title: 'Latte Honey', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Honey', ingClass: 'honey'}],
        },
        {title: 'Ice caffee', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'},  {ing: 'Ice', ingClass: 'ice'}],
        },
        {title: 'Espresso', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}],
        },
        {title: 'Capuchino', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}],
        },
        {title: 'Americano', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}],
        },

        {title: 'Ristretto', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}],
        },
        {title: 'Lungo', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Mineral Water', ingClass: 'water-splash'}],
        },

        {title: 'Latte Oreo', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Espresso', ingClass: 'coffee-splash'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Oreo Cookies', ingClass: 'oreo'}],
        }
      ], classLeft: 'coffee-beans', classRight: 'coffee-spot', goLeft: 'Bakery', goRight: 'Tea'},
    {categoryName: 'Tea', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {title: 'Tea Green Mint Lime', price: 12 , desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Green tea', ingClass: 'tea-leaves'},  {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Lime Peal', ingClass: 'limes'}],
        },
        {title: 'Tea 5 herbs', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'tea',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Eucalyptus', ingClass: 'eucalyptus'}, {ing: 'Rosemary', ingClass: 'rosemary'}, {ing: 'Thyme', ingClass: 'thyme'}, {ing: 'Mint Leaves', ingClass: 'mint'}, {ing: 'Chamomile', ingClass: 'chamomile'}],
        },

        {title: 'Tea Lady Gray', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Black tea', ingClass: 'black-tea'}, {ing: 'Bergamonia', ingClass: 'bergamonia'}],
        },
        {title: 'Tea Honey&Cinnamon', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/coffee-cup.png', menuCategory: 'coffee',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mineral Water', ingClass: 'water-splash'}, {ing: 'Green tea', ingClass: 'tea-leaves'}, {ing: 'Honey', ingClass: 'honey'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}],
        }
      ], classLeft: 'tea-pile', classRight: 'tea-spot', goLeft: 'Coffee', goRight: 'Drinks'},
    {categoryName: 'Drinks', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', products: [
        {title: 'Cool Orange', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/orange-cup.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Oranges', ingClass: 'oranges'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Mint Leaves', ingClass: 'mint'}],
        },
        {title: 'Mango Sunrise', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/yellow-cup.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Mango', ingClass: 'mango'},   {ing: 'Syrup', ingClass: 'syrup'}, {ing: 'Ice', ingClass: 'ice'}],
        },

        {title: 'Rich Raspberry', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/pink-cup.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Raspberry', ingClass: 'raspberry'}, {ing: 'Cream', ingClass: 'cream'}, {ing: 'Ice', ingClass: 'ice'}, {ing: 'Thyme', ingClass: 'thyme'}, {ing: 'Cinnamon', ingClass: 'cinnamon'}, {ing: 'Sugar', ingClass: 'sugar'}],
        },
        {title: 'Ice Choco', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cocoa-cup.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [ {ing: 'Ice', ingClass: 'ice'}, {ing: 'Milk 3%', ingClass: 'milk-splash'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Chocolate', ingClass: 'chocolate'}],
        },
        {title: 'Coca Cola', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cola-bottle.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Sprite', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sprite-bottle.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Mineral Water', price: 8, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/water-bottle.png', menuCategory: 'drinks',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        }
      ], classLeft: 'juice', classRight: 'ice2', goLeft: 'Tea', goRight: 'Sweets'},
    {categoryName: 'Bakery', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', products: [
        {title: 'Cruasan', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cruasan.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}],
        },
        {title: 'Cruasan & Nutella', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cruasan-nutella.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Nutella', ingClass: 'nutella'}],
        },

        {title: 'Cookie', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cookie.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}],
        },
        {title: 'Cupcake Brownie', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cupcake-choco.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cocoa', ingClass: 'cocoa'}],
        },
        {title: 'Cupcake Happy Birthday', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/cupcake-hb.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Candle', ingClass: 'candle'}, {ing: 'Sprinkling', ingClass: 'sprinkling'}],
        },
        {title: 'Glass Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-glass.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}],
        },
        {title: 'Zebra Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-white.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cream', ingClass: 'cream'}],
        },
        {title: 'Sugar Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-sugar.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}],
        },
        {title: 'Sprinkling Donut', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/donut-pink.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Sprinkling', ingClass: 'sprinkling'}],
        },
        {title: 'Brownie', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/brownie.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Chocolate', ingClass: 'chocolate'}, {ing: 'Cocoa', ingClass: 'cocoa'}],
        },
        {title: 'Peanut Macaroons', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/macaroons.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Peanut Butter', ingClass: 'peanut-butter'}, {ing: 'Almond', ingClass: 'almond'}],
        },

        {title: 'Apple Shtrudel', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/shtrudel.png', menuCategory: 'bakery',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Flour', ingClass: 'flour'}, {ing: 'Sugar', ingClass: 'sugar'}, {ing: 'Eggs', ingClass: 'eggs'}, {ing: 'Yeast', ingClass: 'yeast'}, {ing: 'Butter', ingClass: 'butter'}, {ing: 'Apple', ingClass: 'apple'}],
        }
      ], classLeft: 'eggs-left', classRight: 'sprinkling-right', goLeft: 'Sandwiches', goRight: 'Coffee'},
    {categoryName: 'Sandwiches', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {title: 'Chicken Sandwich', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich3.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Chicken Breast', ingClass: 'chiken'}],
        },
        {title: 'Roastbeef Sandwich', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich2.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Beef', ingClass: 'beef'}, {ing: 'Cheese', ingClass: 'cheese'}],
        },

        {title: 'Toast Mozzarella', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost1.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Mozzarella', ingClass: 'mozzarella'}, {ing: 'Basil', ingClass: 'basil'}],
        },
        {title: 'Toast Mozzarella & Spicy Tomatoes', price: 15, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost2.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Mozzarella', ingClass: 'mozzarella'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Spice', ingClass: 'spicies'}],
        },
        {title: 'Tost Spicy Beef', price: 18, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/tost3.png', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Beef', ingClass: 'beef'},  {ing: 'Cheese', ingClass: 'cheese'}, {ing: 'Spice', ingClass: 'spicies'}],
        },
        {title: 'Sandwich Veggies & Mozzarella', price: 14, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/sandwich.jpg', menuCategory: 'Sandwiches',
          // tslint:disable-next-line:max-line-length
          ingredients: [{ing: 'Baguette', ingClass: 'baget'}, {ing: 'Lettuce', ingClass: 'letuce'}, {ing: 'Tomatoes', ingClass: 'tomatoes'}, {ing: 'Onion', ingClass: 'onion'}, {ing: 'Chicken Breast', ingClass: 'chiken'},  {ing: 'Mozzarella', ingClass: 'mozzarella'}],
        }
      ], classLeft: 'baget-left', classRight: 'vegs-right', goLeft: 'Sweets', goRight: 'Bakery'},
    {categoryName: 'Sweets', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
        '        sed do eiusmod consequat. Duis aute\n' +
        '        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      products: [
        {title: 'Twix', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/twix.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Snickers', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/snickers.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Bounty', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/bounty.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'M & Ms', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/mms.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'KitKat', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/kitkat.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Milka Milk Chocolate', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/milka.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'Haribo Gummy Candies', price: 10, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/gummy.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        },
        {title: 'MaxMallows Marshmallow', price: 12, desc: 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img: '../../assets/marsh.png', menuCategory: 'sweets',
          // tslint:disable-next-line:max-line-length
          ingredients: [],
        }

      ], classLeft: 'bears-left', classRight: 'twix-right', goLeft: 'Drinks', goRight: 'Sandwiches'}
  ];

  windowScrolled: boolean;
  constructor(private route: ActivatedRoute,  private router: Router) {
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
    this.category = this.categories[0];
    const categoryName = this.route.snapshot.paramMap.get('category_name');
    this.category = this.categories.find(c => {
      return c.categoryName === categoryName;
    });
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

}
