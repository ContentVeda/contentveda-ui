import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";

@Component({
  selector: "test",
  template: ` <div class="test">Hello</div> `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class Test {}

@NgModule({
  declarations: [Test],
  imports: [CommonModule],
  exports: [Test],
})
export class TestModule {}
