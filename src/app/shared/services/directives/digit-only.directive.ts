import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any) {
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter, etc
      this.navigationKeys.indexOf(e.key) > -1 ||
      ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // Allow: Ctrl+A
      ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // Allow: Ctrl+C
      ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // Allow: Ctrl+V
      ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // Allow: Ctrl+X
      ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // Allow: Cmd+A (Mac)
      ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // Allow: Cmd+C (Mac)
      ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // Allow: Cmd+V (Mac)
      ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData!
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer!
      .getData('text').replace(/\D/g, '');
    document.execCommand('insertText', false, textData);
  }
}
