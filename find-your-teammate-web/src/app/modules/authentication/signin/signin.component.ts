import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AuthStore } from 'src/app/core/auth/auth.store';

// TODO: HTML TELA DE ESQUECI MINHA SENHA
declare const $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  loading: boolean = false;

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authStore: AuthStore,
  ) {}

  ngOnInit() {
    this.authStore.logoff();

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';

    //    [Focus input] * /
    $('.input100').each(function () {
      $(this).on('blur', function () {
        if ($(this).val().trim() != '') {
          $(this).addClass('has-val');
        } else {
          $(this).removeClass('has-val');
        }
      });
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authService.authenticate(this.loginForm.getRawValue()).subscribe(
        (authenticate) => {
          if (authenticate) {
            this.router.navigate(['/home']);
          } else {
            this.loading = false;
            this.dialog.showError('Usuário inválido');
          }
        },
        (err) => {
          this.loading = false;
          // this.loginForm.get('password').setValue('');
          this.dialog.showError(err);
        }
      );
    }
  }
}
