import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from 'src/app/book-api.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  bookList$!:Observable<any[]>;
  bookTypesList$!:Observable<any[]>;
  bookTypesList:any=[];
  
  bookStatusList$!:Observable<any[]>;
  bookStatusList:any=[];

  //Map to display data associate with foreign keys
  bookTypesMap:Map<number, string> = new Map();
  bookStatusMap:Map<number, string> = new Map();

  constructor(private service: BookApiService) { }

  ngOnInit(): void {
    this.bookList$ = this.service.getBookList();
    this.bookTypesList$ = this.service.getBookTypesList();

    this.refreshBookTypesMap();
    this.refreshBookStatusMap();
  }

  //Variables (properties)

  modalTitle ='';
  activateAddEditBookComponent:boolean = false;
  book:any;

  modalAdd(){
    this.book = {
      id:0,
      status:null,
      title:null,
      author:null,
      description:null,
      bookTypeId:null
    }
    this.modalTitle = "Add Book";
    this.activateAddEditBookComponent = true;
  }
  modalEdit(item:any){
    this.book = item;
    this.modalTitle = "Edit Book";
    this.activateAddEditBookComponent = true;
  }
  delete(item:any){
    if(confirm(`Are you sure you want to delete book ${item.title}`)){
      this.service.deleteBook(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
  
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.bookList$=this.service.getBookList();
      })
    }
  }
  modalClose(){
    this.activateAddEditBookComponent = false;
    this.bookList$ = this.service.getBookList();
  }

  refreshBookTypesMap(){
    this.service.getBookTypesList().subscribe(data => {
      this.bookTypesList = data;

      for(let i=0;i<data.length;i++){
        this.bookTypesMap.set(this.bookTypesList[i].id, this.bookTypesList[i].bookName);
      }
    })
  }
  refreshBookStatusMap(){
    this.service.getStatusList().subscribe(data => {
      this.bookStatusList = data;
      for(let i=0;i<data.length;i++){
        this.bookStatusMap.set(this.bookStatusList[i].id, this.bookStatusList[i].statusOption);
      }
    })
  }
}
