import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, type SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  private _sanitizer = inject(DomSanitizer);

  transform(url: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
