import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage, MapaPage, OrdenesPage, HistorialPage, ReportesPage, MantenimientoPage, PublicacionPage, ClientesPage } from "../index.paginas";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(private _us: UsuarioProvider) {
  
  }

  tab1 = HomePage;
  tab2 = PublicacionPage
  tab3 = MapaPage;
  tab4 = OrdenesPage;
  tab5 = HistorialPage;
  tab6 = ReportesPage;
  tab7 = MantenimientoPage;
  tab8 = ClientesPage;

}
