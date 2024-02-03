import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ItemDto } from '../../models/itemdto';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from '../../data-access/home.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule,
            DialogModule, FormsModule, InputTextModule,
            ToastModule, InputTextareaModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [MessageService]
})
export class HomePageComponent implements OnInit{
  private ItemSubscription?: Subscription;
  itemModel$?: Observable<ItemDto[]>;
  model: ItemDto;
  first = 0;
  rows = 10;
  visible = false;
  isLoading = false;

  constructor(private homeService: HomeService,  private messageService: MessageService){
    this.model = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.itemModel$ = this.homeService.getItemList();
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
}

  isLastPage(): boolean {
      return this.itemModel$ ? this.first === this.itemModel$.subscribe.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.itemModel$ ? this.first === 0 : true;
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit(){
    this.isLoading = true;

    console.log(this.model);
      this.ItemSubscription = this.homeService.sendItem(this.model)
        .subscribe({
          next: (response) => {
            this.model = {
              name: '',
              description: ''
            }
            this.isLoading = false
            this.visible = false;
            this.itemModel$ = this.homeService.getItemList();
          },
          error: (error) => {
            console.log(error);
            this.isLoading = false
            this.messageService.add({ severity: 'error', summary: error.status, detail: "An error ocurred!" });
          }
        });
  }

}
