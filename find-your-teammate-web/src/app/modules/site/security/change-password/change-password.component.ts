import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from "@angular/forms";
import { CiaDialogComponent } from "src/shared/components/cia-dialog/cia-dialog.component";
import { MustMatch } from "src/shared/helpers/must-match.validator";
import { AccessService } from "../accesses/access.service";

@Component({
  selector: "change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("dialog") dialog: CiaDialogComponent;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  loading: boolean = false;
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePasswordForm.controls;
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("newPassword", "confirmPassword"),
      }
    );
  }

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      return;
    }

    this.loading = true;

    this.accessService
      .updatePassword(this.changePasswordForm.getRawValue())
      .subscribe(
        (response) => {
          this.loading = false;
          if (response) {
            console.log(this.changePasswordForm.dirty);
            this.changePasswordForm.reset();
            this.formGroupDirective.resetForm();
            this.dialog.showSuccess("Senha atualizada com sucesso");
          }
        },
        (err) => {
          this.loading = false;
          this.dialog.showError(err);
        }
      );
  }
}
