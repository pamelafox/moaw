import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { SidebarComponent } from './sidebar.component';
import { Link } from '../link';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="navbar" [ngClass]="type">
      <div class="navbar-container">
        <button *ngIf="sidebar" class="menu-toggle hide-gt-lg" (click)="toggleSidebar($event)">
          <app-icon name="three-bars" size="24"></app-icon>
        </button>
        <div class="logo" *ngIf="logo">
          <a *ngIf="logoUrl !== undefined; else logoOnly" [href]="logoUrl"><img [src]="logo" alt="logo" /></a>
          <ng-template #logoOnly><img [src]="logo" alt="logo" /></ng-template>
        </div>
        <div class="title text-ellipsis">{{ title }}</div>
        <div class="fill"></div>
        <div class="links text-ellipsis show-gt-md">
          <a *ngFor="let link of links" [href]="link.url" [target]="isExternalLink(link) ? '_blank' : '_self'">
            <app-icon *ngIf="link.icon" [name]="link.icon" size="20" class="link-icon"></app-icon>{{ link.text
            }}<app-icon *ngIf="isExternalLink(link)" name="link-external" size="14" class="external-link"></app-icon>
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @import '../../../variables';

      .navbar {
        position: sticky;
        z-index: 10;
        top: 0;
        display: flex;
        align-items: center;
        background: var(--primary);
        height: var(--navbar-height);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

        button {
          border: 0;
          color: var(--text-light);
          transition: opacity var(--transition-duration);

          &:hover {
            opacity: 0.7;
          }
        }
        
        &.landing {
          height: auto;
          background: var(--background);
          box-shadow: none;
        }
      }

      .navbar-container {
        display: flex;
        flex: 1;
        align-items: center;
        padding: var(--space-xs) var(--space-md);

        .landing & {
          margin: var(--space-lg) auto;
          padding: 0 var(--space-md);
          width: 100%;
          max-width: $breakpoint-lg;
        }
      }

      .title {
        color: var(--text-light);
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.5;

        .landing & {
          color: var(--text);
        }
      }

      .logo img {
        height: 32px;
        vertical-align: middle;
        margin-right: var(--space-md);

        .landing & {
          height: 48px;
        }
      }

      .links {
        margin-left: var(--space-md);
        color: var(--text-light);

        .landing & {
          color: var(--text);
        }

        a {
          color: var(--text-light);

          &:hover {
            text-decoration: none;
            opacity: 0.7;
          }

          + a {
            margin-left: var(--space-lg);
          }

          .landing & {
            color: var(--text);
          }
        }
      }

      .link-icon {
        margin-right: var(--space-xs);
        line-height: 1em;
      }

      .external-link {
        color: var(--text-light);
        opacity: 0.5;

        .landing & {
          display: none;
        }
      }

      .menu-toggle {
        margin-left: calc(-1 * var(--space-md));
      }
    `
  ]
})
export class HeaderComponent {
  @Input() logo: string | undefined;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;
  @Input() links: Link[] = [];
  @Input() sidebar: SidebarComponent | undefined;
  @Input() type: string = '';

  toggleSidebar(event: Event) {
    if (this.sidebar) {
      event.preventDefault();
      event.stopPropagation();
      this.sidebar.toggleOpen();
    }
  }

  isExternalLink(link: Link) {
    return link.url.startsWith('http');
  }
}
