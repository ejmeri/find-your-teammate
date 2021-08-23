import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/shared/helpers/must-match.validator';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AuthService } from '../../../core/auth/auth.service';

declare const $: any;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    @ViewChild('dialog') dialog: CiaDialogComponent;
    
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    hide = true;
    chide = true;
    loading: boolean;
    profile_player: any = {}

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
            cpassword: ['', Validators.required],
            name: ['', Validators.required],
            steamId: ['', Validators.required],
            rank: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'cpassword')
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        //    [Focus input] * /
        $('.input100').each(function () {
            $(this).on('blur', function () {
                if ($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })
        })
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        } else {
            this.loading = true;
            let payload: any = this.loginForm.getRawValue();
            payload.rank = this.profile_player.rank;

            this.authService.new(payload).subscribe(
              (authenticate) => {
                if (authenticate) {
                  this.dialog.showSuccess('Usuário cadastrado com sucesso, faça seu login')
                  this.router.navigate(['/login']);
                } else {
                  this.loading = false;
                  this.dialog.showError('Erro durante cadastro, por favor, tente novamente');
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
