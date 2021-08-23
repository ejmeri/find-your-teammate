import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { ProfilePlayerService } from '../profile_player/profile_player.service';

declare const $: any;
declare const echarts: any;
declare const Chart: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  loadingScreen: boolean = false;
  loading: boolean = false;

  players: any = { };

  constructor(private service: ProfilePlayerService) {}


  params: any = {
    rank: 'Silver'
  }

  ngOnInit() {
    this.searchPlayers();
  }

  searchPlayers()  {
    this.loading = true;
    this.service.findPlayers(this.params).subscribe(players => {
      if (players) {
        console.log(players);
        
        this.players = players;
      } else {
        return this.dialog.showInfo('Jogadores não encontrados');
      }
      this.loading = false
    }, err => {
      this.loading = false
      return this.dialog.showError(err);
    })
  }
}
