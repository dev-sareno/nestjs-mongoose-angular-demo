import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-create-block',
  templateUrl: './confirm-create-block.component.html',
  styleUrls: ['./confirm-create-block.component.scss']
})
export class ConfirmCreateBlockComponent implements OnInit {

  blockName: string = '';
  blockAddress: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmCreateBlockComponent>
  ) { }

  ngOnInit(): void { }

  onCancelClicked() {
    this.dialogRef.close();
  }

}
