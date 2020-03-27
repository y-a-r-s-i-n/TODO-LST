id = 0;
let divId;
function ekle(){
    let task = document.getElementById("task").value;

    var node = document.createElement("LI");
    node.setAttribute("id","todo-"+id);
    node.setAttribute("class","list-group-item list-group-item-action");

    // text alanı
    let textArea = document.createElement("DIV");
    textArea.setAttribute("class","float-left");
    textArea.setAttribute("id","edit-todo-"+id);
    var textnode = document.createTextNode(task);
    textArea.appendChild(textnode);
    node.appendChild(textArea)

    document.getElementById("yapilacaklar").appendChild(node);
    

    let localLi = document.getElementById("todo-"+id);
    // bitti butonu
    let createAddBut = document.createElement("BUTTON");
    createAddBut.setAttribute('type', 'button');
    createAddBut.setAttribute('onclick', 'add(this)');
    createAddBut.innerHTML = "Bitti";
    createAddBut.setAttribute("class","btn btn-success float-right ml-2");
    localLi.appendChild(createAddBut);
    // düzenleme butonu
    let createModalBut = document.createElement("BUTTON");
    createModalBut.setAttribute('type', 'button');
    createModalBut.setAttribute('data-toggle', 'modal');
    createModalBut.setAttribute('data-target', '#myModal');
    createModalBut.setAttribute('onclick', 'duzenle(this)');
    createModalBut.innerHTML = "Düzenle";
    createModalBut.setAttribute("class","btn btn-info float-right ml-2");
    localLi.appendChild(createModalBut);

    // sil butonu
    let createDeleteBut = document.createElement("BUTTON");
    createDeleteBut.setAttribute('type', 'button');
    createDeleteBut.setAttribute('onclick', 'sil(this)');
    createDeleteBut.innerHTML = "Sil";
    createDeleteBut.setAttribute("class","btn btn-danger float-right ml-2");
    localLi.appendChild(createDeleteBut)

    id = id + 1;
}

let nodeElement;
function duzenle (val) {
   // 
   nodeElement = val.parentNode.id;
    console.log(nodeElement);
   // Modal box'un içindeki kaydet butone ve input
    // İnput
    let inpt = document.createElement('INPUT');
    inpt.setAttribute("type","text");
    inpt.setAttribute("id","kayit");
    inpt.setAttribute("class","form-control mb-3");
    inpt.setAttribute("style","");
    inpt.setAttribute("placeholder","Yeni değer");
    // Kaydet butonu
    let bttn = document.createElement('button');
    bttn.setAttribute("type","button");
    bttn.setAttribute("data-dismiss","modal");
    bttn.setAttribute("class","btn btn-outline-primary");
    bttn.setAttribute("style","margin-left: 40%; margin-right: 40%;");
    bttn.setAttribute("placeholder","Yeni değer");
    bttn.setAttribute("onclick","kaydet(this)");
    bttn.innerHTML = "Kaydet";
    
   // Modalbox div kısımları

   let myModal = document.createElement("DIV");
   myModal.setAttribute("class","modal fade");
   myModal.setAttribute("id","myModal");
   myModal.setAttribute("role","dialog");

   let modalDia = document.createElement("DIV");
   modalDia.setAttribute("class","modal-dialog");

   let modalContex = document.createElement("DIV");
   modalContex.setAttribute("class","modal-content");

   let modalHea = document.createElement("DIV");
   modalHea.setAttribute("class","modal-header");

   let createClose = document.createElement("BUTTON");
   createClose.setAttribute('type', 'button');
   createClose.setAttribute('class', 'close');
   createClose.setAttribute('onclick', 'ModalClose()');
   createClose.setAttribute('data-dismiss', 'modal');
   createClose.innerHTML = "&times;";

   let modalTitle = document.createElement("H4");
   modalTitle.setAttribute("class","modal-title");
   modalTitle.innerText = "Düzenleme Kutusu";

   let modalBody = document.createElement("DIV");
   modalBody.setAttribute("class","modal-body");

   document.getElementById('Modalcontainer').appendChild(myModal);
   myModal.appendChild(modalDia);
   modalDia.appendChild(modalContex);
   modalContex.appendChild(modalHea);
   modalHea.appendChild(modalTitle);
   modalHea.appendChild(createClose);
   modalContex.appendChild(modalBody);
   modalBody.appendChild(inpt);
   modalBody.appendChild(bttn);
   
   


   

}

function ModalClose () {
   document.getElementById("myModal").remove();

}
function kaydet (e) {
   // Modalbox'a girilen verileri kaydetme kısmı
   let divId = nodeElement;
   divId= divId.replace("todo", "edit-todo")
   let newValue = document.getElementById("kayit").value;
   document.getElementById(divId).remove();
   document.getElementById("myModal").remove();
   
   let newDiv = document.createElement("DİV");
   newDiv.setAttribute("id",divId);
   newDiv.innerText = newValue;
   document.getElementById(nodeElement).appendChild(newDiv);

}



function sil(e){
    let parentList = document.getElementById("yapilacaklar");    
    parentList.removeChild(e.parentNode);
}
 
let nodeKayit2;
let cloneLi;
let sayac = 1;
function add(e){
   if (sayac != 1) {
      return alert("Çok hızlı davranıyorsun!");
      
   }

   else {
    // Kopyalama kısmız
    nodeKayit2 = e.parentNode.id;
    console.log(nodeKayit2);
    let valueLi = document.getElementById(nodeKayit2);
    cloneLi = valueLi.cloneNode(true);
    
    let veri = document.getElementById("edit-"+nodeKayit2).innerText;

    localStorage.setItem("trfdata", veri );

    
   
    // Tıklandıktan sonraki label kısmı

    let parentList = document.getElementById("yapilacaklar");    
    // parentList.removeChild(e.parentNode);
    let li = document.createElement('DIV');
    li.setAttribute("class","alert alert-success");
    li.innerText = "Bravoo 😍😍 Bu görevi başardın...";
    parentList.replaceChild(li,e.parentNode);
    sayac = 0;
    setTimeout(() => {
        parentList.removeChild(li);
        sayac=1;
    },3000)

   }

}







// Drag and drop kısmı kodları
(function( name, factory ) {
   
    if( typeof window === "object" ) {
       
       // add to window 
       window[ name ] = factory();
       
       // add jquery plugin, if available  
       if( typeof jQuery === "object" ) {
          jQuery.fn[ name ] = function( options ) {
             return this.each( function() {
                new window[ name ]( this, options );
             });
          };
       }
    }
     
 })( "Sortable", function() {
    
    var _w = window,
        _b = document.body,
        _d = document.documentElement;
    
    // get position of mouse/touch in relation to viewport 
    var getPoint = function( e )
    {
       var scrollX = Math.max( 0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0 ) - ( _d.clientLeft || 0 ), 
           scrollY = Math.max( 0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0 ) - ( _d.clientTop || 0 ), 
           pointX  = e ? ( Math.max( 0, e.pageX || e.clientX || 0 ) - scrollX ) : 0,
           pointY  = e ? ( Math.max( 0, e.pageY || e.clientY || 0 ) - scrollY ) : 0; 
       
       return { x: pointX, y: pointY }; 
    }; 
    
    // class constructor
    var Factory = function( container, options )
    {
       if( container && container instanceof Element )
       {
          this._container = container; 
          this._options   = options || {}; /* nothing atm */
          this._clickItem = null;
          this._dragItem  = null;
          this._hovItem   = null;
          this._sortLists = [];
          this._click     = {};
          this._dragging  = false;
          
          this._container.setAttribute( "data-is-sortable", 1 );
          this._container.style["position"] = "static";
          
          window.addEventListener( "mousedown", this._onPress.bind( this ), true );
          window.addEventListener( "touchstart", this._onPress.bind( this ), true );
          window.addEventListener( "mouseup", this._onRelease.bind( this ), true ); 
          window.addEventListener( "touchend", this._onRelease.bind( this ), true ); 
          window.addEventListener( "mousemove", this._onMove.bind( this ), true );
          window.addEventListener( "touchmove", this._onMove.bind( this ), true );
       }
    };
    
    // class prototype
    Factory.prototype = {
       constructor: Factory,
       
       // serialize order into array list 
       toArray: function( attr )
       {
          attr = attr || "id";
          
          var data = [], 
              item = null, 
              uniq = ""; 
          
          for( var i = 0; i < this._container.children.length; ++i )
          {
             item = this._container.children[ i ], 
             uniq = item.getAttribute( attr ) || "";
             uniq = uniq.replace( /[^0-9]+/gi, "" );
             data.push( uniq );
          }
          return data;
       }, 
       
       // serialize order array into a string 
       toString: function( attr, delimiter )
       {
          delimiter = delimiter || ":"; 
          return this.toArray( attr ).join( delimiter );
       }, 
       
       // checks if mouse x/y is on top of an item 
       _isOnTop: function( item, x, y )
       {
          var box = item.getBoundingClientRect(),
              isx = ( x > box.left && x < ( box.left + box.width ) ), 
              isy = ( y > box.top && y < ( box.top + box.height ) ); 
          return ( isx && isy );
       },
       
       // manipulate the className of an item (for browsers that lack classList support)
       _itemClass: function( item, task, cls )
       {
          var list  = item.className.split( /\s+/ ), 
              index = list.indexOf( cls );
          
          if( task === "add" && index == -1 )
          { 
             list.push( cls ); 
             item.className = list.join( " " ); 
          }
          else if( task === "remove" && index != -1 )
          {
             list.splice( index, 1 ); 
             item.className = list.join( " " ); 
          }
       }, 
       
       // swap position of two item in sortable list container 
       _swapItems: function( item1, item2 )
       {
          var parent1 = item1.parentNode, 
              parent2 = item2.parentNode;
          
          if( parent1 !== parent2 ) 
          {
             // move to new list 
             parent2.insertBefore( item1, item2 );
          }
          else { 
             // sort is same list 
             var temp = document.createElement( "div" ); 
             parent1.insertBefore( temp, item1 );
             parent2.insertBefore( item1, item2 );
             parent1.insertBefore( item2, temp );
             parent1.removeChild( temp );
          }
       },
       
       // update item position 
       _moveItem: function( item, x, y )
       {
          item.style["-webkit-transform"] = "translateX( "+ x +"px ) translateY( "+ y +"px )";
          item.style["-moz-transform"] = "translateX( "+ x +"px ) translateY( "+ y +"px )";
          item.style["-ms-transform"] = "translateX( "+ x +"px ) translateY( "+ y +"px )";
          item.style["transform"] = "translateX( "+ x +"px ) translateY( "+ y +"px )";
       },
       
       // make a temp fake item for dragging and add to container 
       _makeDragItem: function( item )
       {
          this._trashDragItem(); 
          this._sortLists = document.querySelectorAll( "[data-is-sortable]" );
          
          this._clickItem = item; 
          this._itemClass( this._clickItem, "add", "active" ); 
 
          this._dragItem = document.createElement( item.tagName );
          this._dragItem.className = "dragging"; 
          this._dragItem.innerHTML = item.innerHTML; 
          this._dragItem.style["position"] = "absolute";
          this._dragItem.style["z-index"] = "999";
          this._dragItem.style["left"] = ( item.offsetLeft || 0 ) + "px";
          this._dragItem.style["top"] = ( item.offsetTop || 0 ) + "px";
          this._dragItem.style["width"] = ( item.offsetWidth || 0 ) + "px";
          
          this._container.appendChild( this._dragItem ); 
       }, 
       
       // remove drag item that was added to container 
       _trashDragItem: function()
       {
          if( this._dragItem && this._clickItem )
          {
             this._itemClass( this._clickItem, "remove", "active" ); 
             this._clickItem = null; 
             
             this._container.removeChild( this._dragItem ); 
             this._dragItem = null; 
          }
       }, 
       
       // on item press/drag 
       _onPress: function( e )
       {
          if( e && e.target && e.target.parentNode === this._container )
          {
             e.preventDefault();
             
             this._dragging = true;
             this._click = getPoint( e ); 
             this._makeDragItem( e.target ); 
             this._onMove( e );
          }
       },
       
       // on item release/drop 
       _onRelease: function( e )
       {
          this._dragging = false;
          this._trashDragItem(); 
       },
       
       // on item drag/move
       _onMove: function( e )
       {
          if( this._dragItem && this._dragging ) 
          {
             e.preventDefault();
             
             var point     = getPoint( e ); 
             var container = this._container;
 
             // drag fake item 
             this._moveItem( this._dragItem, ( point.x - this._click.x ), ( point.y - this._click.y ) ); 
             
             // keep an eye for other sortable lists and switch over to it on hover 
             for( var a = 0; a < this._sortLists.length; ++a )
             {
                var subContainer = this._sortLists[ a ]; 
                
                if( this._isOnTop( subContainer, point.x, point.y ) ) 
                {
                   container = subContainer;
                }
             }
             
             // container is empty, move clicked item over to it on hover 
             if( this._isOnTop( container, point.x, point.y ) && container.children.length === 0 ) 
             {
                container.appendChild( this._clickItem ); 
                return; 
             }
             
             // check if current drag item is over another item and swap places 
             for( var b = 0; b < container.children.length; ++b )
             {
                var subItem = container.children[ b ]; 
                
                if( subItem === this._clickItem || subItem === this._dragItem )
                {
                   continue; 
                }
                if( this._isOnTop( subItem, point.x, point.y ) ) 
                {
                   this._hovItem = subItem; 
                   this._swapItems( this._clickItem, subItem ); 
                }
             }
          }
       },
       
    };
 
    // export
    return Factory;
 });
 
 
 // helper init function 
 function initSortable( list, sbtn='0' )
 {
    var listObj  = document.getElementById( list ),
        sortable = new Sortable( listObj ); 

         if (sbtn != '0') {
         sbtnObj  = document.getElementById( sbtn ),
         sbtnObj.addEventListener( "click", function( e )
         {
         e.preventDefault(); 
         alert( sortable.toString() ); 
         });
         }
 }
 
 // init lists 
 initSortable( "yapilacaklar");
 // sbt-1 id olarak serialize etmeye yarıyan button yapımında kullanılabilir.

 // Drag and drop kodları bitti











