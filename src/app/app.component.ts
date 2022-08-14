import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BranchService } from './shared/services/branch.service';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-ui';

  constructor(
    public loader: LoadingBarService,
    private branchSrv: BranchService,
  ) {
    this.warmUp();
  }

  warmUp(): void {
    this.branchSrv.getList().pipe(take(1)).subscribe();
  }
}
