import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = "Save";
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      hours: ["", Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls["name"].setValue(
        this.editData.name
      );
      this.productForm.controls["dob"].setValue(this.editData.dob);
      this.productForm.controls["hours"].setValue(this.editData.hours);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.dialogRef.close(this.productForm.value);
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    const updateData = this.productForm.value;
    updateData.id = this.editData.id;
    this.dialogRef.close(updateData);
  }
}
