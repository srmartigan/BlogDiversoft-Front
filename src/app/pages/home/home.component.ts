import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];

  constructor(private http: HttpService){}

  ngOnInit(): void {
    this.getPosts();
  }


  getPosts() {
    this.http.getPosts().subscribe(posts => {
      posts.forEach((post: { content: any; }) => {
        // @ts-ignore
        post.content = this.addClassToImagesPost(post).firstChild.innerHTML;
        this.posts.push(post);
      })
    }, error => { console.log(error); });
  }

  addClassToImagesPost(post: any) {
    let html= post.content;

    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");

    let images = [];
    // @ts-ignore
    images = doc.firstChild.getElementsByTagName('img');

    for(let i =0; i<images.length; i++) {
      images[i].classList.add('img');
      console.log(images[i]);
    }
    return doc;
  }

  /* Código para añadir clases a las imágenes de los posts
    let html='<p>here is a blog test<img src="https://bucket.s3.ap-south-1.amazonaws.com/83a5e290-8a8d-11ea-8466.jpg"></p>'

    parser = new DOMParser();
    doc = parser.parseFromString(html, "text/html");

    let images = doc.firstChild.getElementsByTagName('img');

    for(let i =0; i<images.length; i++) {
      images[i].classList.add('img-element');
      console.log(images[i]);
    }
   */

}
