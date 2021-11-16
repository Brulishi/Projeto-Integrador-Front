import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioLogin: CredenciaisDTO = new CredenciaisDTO();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);

    environment.token = '' // Sempre que voltar para a pagina entrar, o token zera e o usuario deve fazer login novamente
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: CredenciaisDTO) => {
      this.usuarioLogin = resp;
      environment.token = this.usuarioLogin.token;
      environment.idUsuario = this.usuarioLogin.idUsuario;
      environment.nome = this.usuarioLogin.nome;
      environment.email = this.usuarioLogin.email;
      environment.tipo = this.usuarioLogin.tipo;

      if (this.usuarioLogin.foto == null) {
        environment.foto ='https://cdn-icons-png.flaticon.com/512/74/74472.png';
      } else {
        environment.foto = this.usuarioLogin.foto;
      }

      // console.log(environment.token)
      // console.log(environment.id)
      // console.log(environment.nome)
      // console.log(environment.email)
      // console.log(environment.tipo)
      // console.log(environment.foto)

      this.router.navigate(['/inicio']);
    }, erro => {
      if (erro.status == 400) {
        alert("Usuário ou senha inválidos!");
      }
    })
  }
  

}
