import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { CiaDialogComponent } from '../../../../shared/components/cia-dialog/cia-dialog.component';

declare const $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;

  loading: boolean;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identification: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
      this.authService.forgotPassword(this.loginForm.getRawValue()).subscribe(
        (authenticate) => {
          if (authenticate) {
            this.loading = false;
            return this.dialog.showSuccess('Senha enviada para o e-mail cadastrado');
          } else {
            this.loading = false;
            this.dialog.showError('Não foi possível recuperar a senha, por favor, tente novamente');
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
