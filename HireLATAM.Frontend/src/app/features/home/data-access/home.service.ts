import { Injectable } from '@angular/core';
import { CoreService } from '../../../core/services/core.service';
import { ApiEndpoints } from '../../../core/constants/api-endpoints';
import { ItemDto } from '../models/itemdto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  enpoints = ApiEndpoints;
  constructor(private coreService: CoreService) { }

  getItemList(): Observable<ItemDto[]>{
    return this.coreService.get(this.enpoints.item.getAllItems);
  }

  sendItem(dto: ItemDto){
    return this.coreService.post(this.enpoints.item.createItem, dto);
  }
}
