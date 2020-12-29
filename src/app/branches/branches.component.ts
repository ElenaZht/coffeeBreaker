import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branches = [
    {id: 0, address: 'Tel Aviv, st. Ben Gurion, 9', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 1, address: 'Tel Aviv, st. Dizenghof, 15', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed  et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 2, address: 'Hifa, st. Itshak Rabin, 30', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 3, address: 'Tel Aviv, st. Moshe Dayan, 9', desc: 'Lorem consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 4, address: 'Tel Aviv, st. Chlenov, 19', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 5, address: 'Tel Aviv, st. HaBima, 38', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et uip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 6, address: 'Bat Yam, st. Ben Gurion, 1', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 7, address: 'Bat Yam, st. Golda Meir, 10', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 8, address: 'Hifa, st. Moshe Sharet, 7', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 10, address: 'Holon, st. Itshak Rabin, 22', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 11, address: 'Holon, st. Sokolov, 3', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 12, address: 'Rishon Lezion, st. Golda Meir, 50', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 13, address: 'Rishon Lezion, st. Rotshild, 5', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 14, address: 'Petah Tikva, st. Moshe Sharet, 74', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 15, address: 'Dimona, st. Itshak Rabin, 2', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 16, address: 'Jerusalim, st. Sokolov, 13', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 17, address: 'Jerusalim, st. Golda Meir, 50', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 18, address: 'Jerusalim, st. Rotshild, 4', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
  ];
  mostPopular = [
    {id: 0, address: 'Tel Aviv, st. Ben Gurion, 9', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 1, address: 'Tel Aviv, st. Dizenghof, 15', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed  et dolore magna aliqua. Ut enim laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'},
    {id: 2, address: 'Hifa, st. Itshak Rabin, 30', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' +
        ' eu fugiat nulla pariatur.'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
