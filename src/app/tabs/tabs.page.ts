import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { tabButtons } from './tabButtons';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit {
  currentTab: any;

  constructor(
    private actionSheetController: ActionSheetController, private location: Location, private router: Router
  ) {
    this.currentTab = tabButtons[''];
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentTab = tabButtons[event.url];
      }
    })
  }

}
