import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddProductComponent } from "./add-product/add-product.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Global Aerospace";

  displayedColumns: string[] = [
    "name",
    "dob",
    "hours",
    "action",
  ];
  dataSource: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

  }

  addData() {
    this.dialog
      .open(AddProductComponent, {
        width: "30%",
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          val.id = Number(this.dataSource.length + 1);
          // this.getAllProducts();
          this.dataSource = [...this.dataSource, val];
          console.log(this.dataSource, "");
        }
      });
  }


  editProduct(row: any) {
    this.dialog
      .open(AddProductComponent, {
        width: "30%",
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val.id) {
          const index = this.dataSource.findIndex((item) => item.id === val.id);
          this.dataSource[index].name = val.name;
          this.dataSource[index].dob = val.dob;
          this.dataSource[index].hours = val.hours;
        }
      });
  }

  deleteProduct(id: number) {
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
  }

  }

