import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Usuario } from './model/usuario';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from './generic-form-validation';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  cadastroForm!: FormGroup;
  user!: Usuario;
  formResult: string = '';
  public MASKS = MASKS;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres',
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF em formato inválido',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // let senha = new FormControl('', [
    //   Validators.required,
    //   CustomValidators.rangeLength([6, 15]),
    // ]);
    // let confirmeSenha = new FormControl('', [
    //   Validators.required,
    //   CustomValidators.rangeLength([6, 15]),
    //   CustomValidators.EqualTo(senha),
    // ]);
    let senha = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let senhaConfirm = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      confirmeSenha: senhaConfirm,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.cadastroForm
      );
    });
  }
  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid)
      this.user = Object.assign({}, this.user, this.cadastroForm.value);
    this.formResult = JSON.stringify(this.cadastroForm.value);
    console.log(this.user);
  }
}
