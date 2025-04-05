import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardHeaderComponent } from './shared/card-header/card-header.component';
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from "./shared/menu-bar/menu-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'barber-shop';
  private routeSubscription?: Subscription

  constructor(private readonly router: Router, private readonly activeRoute: ActivatedRoute) {}
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }
  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteTitle(this.activeRoute))
    ).subscribe(title => this.title = title)
  }

  private getRouteTitle(route: ActivatedRoute) : string {
    let child = route

    while(child.firstChild) {
      child = child.firstChild
    }

    return child.snapshot.data['title'] || "Default Title"
  }

}
