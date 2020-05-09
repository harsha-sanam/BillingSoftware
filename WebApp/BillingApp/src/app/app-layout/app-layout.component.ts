import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }

  // NavBar Settings
  private _opened: boolean = false;
  private _modeNum: number = 1;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = true;
  private _closeOnClickBackdrop: boolean = false;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  toggleNavBar() {
    this._opened = !this._opened;
  }
  // NavBar Settings Ends

  links = [
    { title: 'Home', route: '/App/Home' },
    { title: 'Billing', route: '/App/Bill' },
    { title: 'Products', route: '/App/Products' }
  ]; 
}
