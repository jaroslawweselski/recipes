import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        firebase.initializeApp({
            apiKey: "AIzaSyB_8c073-yaDDT8ol72522OB1cnIa7xXaQ",
            authDomain: "recipes-8b730.firebaseapp.com"
        });
    }

}
