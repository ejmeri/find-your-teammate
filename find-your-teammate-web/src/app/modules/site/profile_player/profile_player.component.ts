import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth.store';
import { ProfilePlayerService } from './profile_player.service';
import { CiaDialogComponent } from '../../../../shared/components/cia-dialog/cia-dialog.component';

@Component({
  selector: 'profile_player',
  templateUrl: './profile_player.component.html',
})
export class ProfileComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  loadingScreen: boolean = false;
  loading: boolean = false;

  config: any = {
    height: 250,
    theme: 'modern',
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins:
      'print preview fullpage searchreplace autolink directionality visualblocks visualchars table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
    toolbar:
      'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph',
    templates: [
      { title: 'Test template 1', content: 'Test 1' },
      { title: 'Test template 2', content: 'Test 2' },
    ],
    content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i', '//www.tinymce.com/css/codepen.min.css'],
  };

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

  constructor(private authStore: AuthStore, private profilePlayerService: ProfilePlayerService) {}

  ngOnInit(): void {
    this.user_data.profileName = this.authStore.loggedUser.profileName;
    this.findProfilePlayer();
  }

  visitSteamProfile() {
    window.open(this.profile_player.steamUserUrl, '_blank');
  }

  findProfilePlayer() {
    this.profilePlayerService.findProfilePlayer().subscribe(
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
