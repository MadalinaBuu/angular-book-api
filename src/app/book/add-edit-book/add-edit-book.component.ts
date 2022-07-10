import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from 'src/app/book-api.service';


@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  bookList$!: Observable<any[]>;
  statusList$!:Observable<any[]>;
  bookTypesList$!:Observable<any[]>;

  constructor(private service:BookApiService) { }


  @Input() book:any;
  id:number = 0;
  //status: string = "";
  statusId!:number;
  title: string = "";
  description: string = "";
  bookTypeId!: number;

  
  ngOnInit(): void {
    this.id = this.book.id;
    this.title = this.book.title;
    this.statusId = this.book.statusId;
    this.description = this.book.description;
    this.bookTypeId = this.book.bookTypeId;
    this.statusList$ = this.service.getStatusList();
    this.bookList$ = this.service.getBookList();
    this.bookTypesList$ = this.service.getBookTypesList();
  }

  addBook(){
    var book ={
      statusId:this.statusId,
      title:this.title,
      description:this.description,
      bookTypeId:this.bookTypeId
    }
    this.service.addBook(book).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    })
  }
  updateBook(){
    var book ={
      id:this.id,
      statusId:this.statusId,
      title:this.title,
      description:this.description,
      bookTypeId:this.bookTypeId
    }
    var id:number=this.id;
    this.service.updateBook(id, book).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none";
        }
      }, 4000)
    })
  }
}
