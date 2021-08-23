import { Component, OnInit, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { ProfilePlayerService } from '../profile_player/profile_player.service';
import { ActivatedRoute } from '@angular/router';
import { RxjsHelpers } from 'src/shared/helpers/rxjs-helpers';

@Component({
  selector: 'visit-player',
  templateUrl: './visit-player.component.html'
})
export class VisitPlayerComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  loadingScreen: boolean = false;
  loading: boolean = false;

  user_data: any = {};
  profile_player: any = {
    stats: {},
    contact: {},
  };

  personalStats: any = {
    matchesPlayed: {},
    timePlayed: {},
    roundsPlayed: {},
    wins: {},
    losses: {},
    kills: {},
    deaths: {},
    kd: {},
    mvp: {},
    shotsAccuracy: {},
    shotsFired: {},
    shotsHit: {},
    headshotPct: {},
  };

  gunStats: Array<any> = [];

  mapsStats: Array<any> = [];
  routeParams$: any;
  userId: any;

   
  constructor( private route: ActivatedRoute,private profilePlayerService: ProfilePlayerService, ) {}


  ngOnInit() {
    this.routeParams$ = this.route.params.subscribe((params: any) => {
      this.userId = params['id'];
      this.findProfilePlayer(this.userId);
    });
  }

  ngOnDestroy() {
    RxjsHelpers.unsubscribe(this.routeParams$);
  }

  visitSteamProfile() {
    window.open(this.profile_player.steamUserUrl, '_blank');
  }

  findProfilePlayer(playerId: string) {
    this.profilePlayerService.findProfileViewPlayer(playerId).subscribe(
      (profile) => {
        if (!profile.stats) {
          profile.stats = {};
        }
        this.profile_player = profile;
        this.findPersonalStats();
      },
      (err) => {
        this.dialog.showError(err);
      }
    );
  }

  updateProfilePlayer() {
    this.loading = true;
    this.profilePlayerService.updateProfilePlayer(this.profile_player).subscribe(
      (updated) => {
        this.loading = false;
        if (updated) {
          return this.dialog.showSuccess('Perfil atualizado com sucesso');
        } else {
          return this.dialog.showSuccess('Erro durante atualização do perfil, por favor, tente novamente');
        }
      },
      (err) => {
        this.loading = false;
        this.dialog.showError(err);
      }
    );
  }

  selectedTab(event: any) {
    console.log(event.index);

    switch (event.index) {
      case 0:
        this.findPersonalStats();
        break;
      case 1:
        this.findGunsStats();
        break;
      case 2:
        this.findMapsStats();
      default:
        break;
    }
  }

  findPersonalStats() {
    if (this.personalStats.timePlayed.displayValue) {
      return;
    }
    this.loadingScreen = true;
    this.profilePlayerService.findPersonalStats(this.profile_player._id, this.profile_player.steamUserId).subscribe(
      (personal) => {
        if (personal) {
          this.personalStats = personal;
        }
        this.loadingScreen = false;
      },
      (err) => {
        this.loadingScreen = false;
        this.dialog.showError(err);
      }
    );
  }

  findMapsStats() {
    if (this.mapsStats.length) {
      return;
    }
    this.loadingScreen = true;

    this.profilePlayerService.findMapsStats(this.profile_player._id, this.profile_player.steamUserId).subscribe(
      (maps) => {
        if (maps) {
          this.mapsStats = maps;
        }
        this.loadingScreen = false;
      },
      (err) => {
        this.loadingScreen = false;
        this.dialog.showError(err);
      }
    );
  }

  findGunsStats() {
    if (this.gunStats.length) {
      return;
    }
    this.loadingScreen = true;
    this.profilePlayerService.findGunsStats(this.profile_player._id, this.profile_player.steamUserId).subscribe(
      (guns) => {
        if (guns) {
          this.gunStats = guns;
        }
        this.loadingScreen = false;
      },
      (err) => {
        this.loadingScreen = false;

        this.dialog.showError(err);
      }
    );
  }

}
