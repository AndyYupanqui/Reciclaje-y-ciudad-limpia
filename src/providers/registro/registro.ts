//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import 'rxjs-compat/add/operator/map';

export interface Usuario{
  id?: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
  usuario: string;
  contraseña: string;
  clave: string;
}

export interface Comentario{
  id?: string;
  id_usuario: DocumentReference;
  id_incidencia: DocumentReference;
  descripcion: string;
  fecha: string;
  hora: string;
}

export interface Reciclaje{
  id?: string;
  id_usuario: DocumentReference;
  tipo_reciclaje: string;
  cantidad: number;
}

export interface Incidencia{
  id?: string;
  id_usuario: string; 
  id_residuo: DocumentReference;
  id_volumen: DocumentReference;
  titulo: string,
  descripcion: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  imagen: string;
  fecha: string;
  hora: string;
}

export interface Recomendacion{
  id?: string;
  imagen: string;
}

export interface Residuo{
  id?: string;
  tipo: string;
  img: string;
}

export interface Volumen{
  id?: string;
  tipo: string;
  img: string;
}


//============================================================================

export interface Estacionamiento{
  id?: string;
  nombre: string;
  direccion: string;
  vacantes: number;
  costo: number;
  espacio: string;
}

export interface Espacio{
  id?: string;
  estado_ocupacion: string;
  estado_reservacion: string;
}

export interface Reserva{
  id?: string;
  espacio: DocumentReference;
  estacionamiento: DocumentReference;
  id_usuario: string;
  estado_pago: string;
  estado: string;
  fecha: string;
  horas: number;
  total: number;
  usuario: DocumentReference;
}


@Injectable()
export class RegistroProvider {
  usuarioCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;
  comentarioCollection: AngularFirestoreCollection<Comentario>;
  comentarios: Observable<Comentario[]>;
  reciclajeCollection: AngularFirestoreCollection<Reciclaje>;
  reciclajes: Observable<Reciclaje[]>;
  incidenciaCollection: AngularFirestoreCollection<Incidencia>;
  incidencias: Observable<Incidencia[]>;
  recomendacionCollection: AngularFirestoreCollection<Recomendacion>;
  recomendaciones: Observable<Recomendacion[]>;
  residuoCollection: AngularFirestoreCollection<Residuo>;
  residuos: Observable<Residuo[]>;
  volumenes: Observable<Volumen[]>;
  volumenCollection: AngularFirestoreCollection<Volumen>;





  estacionamientos: Observable<Estacionamiento[]>;
  espacios: Observable<Espacio[]>;
  reservas: Observable<Reserva[]>;
  estacionamientoCollection: AngularFirestoreCollection<Estacionamiento>;
  espacioCollection: AngularFirestoreCollection<Espacio>;
  reservaCollection: AngularFirestoreCollection<Reserva>;
  user: any;
  espacio: any;
  reserva: any;
  incidencia: any;


  constructor(db: AngularFirestore) {
    this.usuarioCollection = db.collection('Usuario');
    this.comentarioCollection = db.collection('Comentario');
    this.reciclajeCollection = db.collection('Reciclaje');
    this.incidenciaCollection = db.collection('Incidencia');
    this.recomendacionCollection = db.collection('Recomendacion');
    this.residuoCollection = db.collection('Residuo');
    this.volumenCollection = db.collection('Volumen');


//============================================================================================

    this.estacionamientoCollection = db.collection('Estacionamiento');
    this.espacioCollection = db.collection('Espacio');
    this.reservaCollection = db.collection('Reserva');
    this.user = db;
    this.espacio = db;
    this.reserva = db;
    this.incidencia = db;

   
    
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.comentarios = this.comentarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.reciclajes = this.reciclajeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.incidencias = this.incidenciaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.recomendaciones = this.recomendacionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.residuos = this.residuoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.volumenes = this.volumenCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

//==========================================================================================================0



    this.estacionamientos = this.estacionamientoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
      );

    this.espacios = this.espacioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.reservas = this.reservaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }



  getUsuarios(){
    return this.usuarios;
  }
  getUsuario1(id){
    return this.usuarioCollection.doc<Usuario>(id).valueChanges();
  }
  
  getUsuario(clave){
    return this.user.collection('Usuario', ref => ref.where('clave', '==', clave)).valueChanges();
  }
  
  updateUsuario(usuario: Usuario, id: string){
    return this.usuarioCollection.doc(id).update(usuario);
  }
  
  removeUsuario(id){
    return this.usuarioCollection.doc(id).delete();
  }
  
  addUsuario(usuario: Usuario, id: string){
    return this.usuarioCollection.doc(id).set(usuario);
  }

  getComentarios(){
    return this.comentarios;
  }

  updateComentarios(comentario: Comentario, id: string){
    return this.comentarioCollection.doc(id).update(comentario);
  }

  removeComentario(id){
    return this.comentarioCollection.doc(id).delete();
  }
  
  addComentario(comentario: Comentario, id: string){
    return this.comentarioCollection.doc(id).set(comentario);
  }

  addReciclaje(reciclaje: Reciclaje, id: string){
    return this.reciclajeCollection.doc(id).set(reciclaje);
  }

  addIncidencia(incidencia: Incidencia, id: string){
    return this.incidenciaCollection.doc(id).set(incidencia);
  }

  getIncidencias(){
    return this.incidencias;
  }

  getIncidenciasUsuario(id_usuario){
    return this.incidencia.collection('Incidencia', ref => ref.where('id_usuario', '==', id_usuario)).valueChanges();
  }

  updateIncidencias(incidencia: Incidencia, id: string){
    return this.incidenciaCollection.doc(id).update(incidencia);
  }
  
  removeIncidencia(id){
    return this.incidenciaCollection.doc(id).delete();
  }

  getRecomendaciones(){
    return this.recomendaciones;
  }

  getResiduos(){
    return this.residuos;
  }

  getVolumenes(){
    return this.volumenes;
  }

  



//===============================================================================================================

  
  getEstacionamientos(){
    return this.estacionamientos;
  }


  getEspacio(id){
    return this.espacioCollection.doc<Espacio>(id).valueChanges();
  }

  updateEspacio(espacio: Espacio, id: string){
    return this.espacioCollection.doc(id).update(espacio);
  }

  
  getReservas(id_usuario){
    return this.reserva.collection('Reserva', ref => ref.where('id_usuario', '==', id_usuario)).valueChanges();
  }

  getTodasReservas(){
    return this.reservas;
  }

  getReserva(fecha){
    return this.reservaCollection.doc<Reserva>(fecha).valueChanges();
  }
  
  updateReserva(reserva: Reserva, id: string){
    return this.reservaCollection.doc(id).update(reserva);
  }

  updateReservaEstado(id: string){
    this.reservaCollection.doc(id).update({"estado_pago" : "Pago Realizado"});
  }

  updateReservaEstado2(id: string){
    this.reservaCollection.doc(id).update({"estado" : "Finalizado"});
  }
  
  addReserva(reserva: Reserva, id: string){
    return this.reservaCollection.doc(id).set(reserva);
  }

  removeReserva(id){
    return this.reservaCollection.doc(id).delete();
  //   var query = this.reserva.collection('Reserva', ref => ref.where('fecha', '==', id)).valueChanges();
  //   query.subscribe(res => {
  //     console.log(res);
  //   });
  //   // query.get().then(function(querySnapshot) {
  //   //   querySnapshot.forEach(function(doc) {
  //   //     doc.ref.delete();
  //   //   });
  //   // });
  }
}
