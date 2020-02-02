//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import 'rxjs-compat/add/operator/map';

export interface Todo{
  id?: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
  placa: string;
  usuario: string;
  contraseña: string;
  clave: string;
}

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
  todoCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<Todo[]>;
  estacionamientos: Observable<Estacionamiento[]>;
  espacios: Observable<Espacio[]>;
  reservas: Observable<Reserva[]>;
  estacionamientoCollection: AngularFirestoreCollection<Estacionamiento>;
  espacioCollection: AngularFirestoreCollection<Espacio>;
  reservaCollection: AngularFirestoreCollection<Reserva>;
  user: any;
  espacio: any;
  reserva: any;

  constructor(db: AngularFirestore) {
    this.todoCollection = db.collection('Usuario');
    this.estacionamientoCollection = db.collection('Estacionamiento');
    this.espacioCollection = db.collection('Espacio');
    this.reservaCollection = db.collection('Reserva');
    this.user = db;
    this.espacio = db;
    this.reserva = db;
    
    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

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

  getTodos(){
    return this.todos;
  }

  getEstacionamientos(){
    return this.estacionamientos;
  }

  getTodo(id){
    return this.todoCollection.doc<Todo>(id).valueChanges();
  }

  getUsuario(clave){
    return this.user.collection('Usuario', ref => ref.where('clave', '==', clave)).valueChanges();
  }

  getEspacio(id){
    return this.espacioCollection.doc<Espacio>(id).valueChanges();
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

  updateTodo(todo: Todo, id: string){
    return this.todoCollection.doc(id).update(todo);
  }

  updateEspacio(espacio: Espacio, id: string){
    return this.espacioCollection.doc(id).update(espacio);
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

  addTodo(todo: Todo, id: string){
    return this.todoCollection.doc(id).set(todo);
  }

  addReserva(reserva: Reserva, id: string){
    return this.reservaCollection.doc(id).set(reserva);
  }

  removeTodo(id){
    return this.todoCollection.doc(id).delete();
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
