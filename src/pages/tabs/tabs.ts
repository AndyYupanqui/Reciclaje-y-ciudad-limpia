import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage, CategoriasPage, OrdenesPage, HistorialPage, ReportesPage, MantenimientoPage } from "../index.paginas";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(private _us: UsuarioProvider) {
  
  }

  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;
  tab4 = HistorialPage;
  tab5 = ReportesPage;
  tab6 = MantenimientoPage;

}
