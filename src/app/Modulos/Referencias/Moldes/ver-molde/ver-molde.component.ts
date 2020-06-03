import { Component, OnInit, Optional } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Molde } from 'src/app/Modelos/Molde/molde';
import { MoldeService } from 'src/app/Servicios/molde.service';
import { ModulosComponent } from 'src/app/Modulos/menu/modulos/modulos.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-ver-molde',
  templateUrl: './ver-molde.component.html',
  styleUrls: ['./ver-molde.component.css']
})
export class VerMoldeComponent implements OnInit {

  Molde: Molde;

  constructor(
    @Optional() public modulos: ModulosComponent,
    private servicioMolde: MoldeService,
    private persistencia: PersistenceService,
  ) { }

  ngOnInit(): void {
    this.Molde = JSON.parse(sessionStorage.getItem('MoldeSeleccionado')) as Molde;
    this.buscarMolde();
  }

  buscarMolde() {
    this.servicioMolde.getBuscarMolde(this.Molde.idMolde).subscribe(
      data => {
        console.log('Molde:', data);
        this.Molde = data as Molde;
        sessionStorage.setItem('MoldeSeleccionado', JSON.stringify(this.Molde));
      }
    );
  }

  inactivarMolde() {
    $('#inactivarMolde').modal('show');
  }

  editarMolde() {
    $('#editarModel').modal('show');
  }

}
