## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Demo
Use these private/public key below to play with the demo
```
priveteKey: f29738a17d93d80abe255dd9b12f5a6bfeb064b84c60cf1c7d51d5ef6e9effde
publicKey: 0a8aaee53aac3eba88b359b31c32742c9aeb861b
    
priveteKey: 00260230696b7bfd7757aae2a3a503497e1981bf0983e0705e841b0e4715338c
publicKey: 54e95ef657ac0fe8ac119401b30d6e922c6c08ee
    
priveteKey: 76a21c141147df44b5d7d9404cbe59388721220b3de0520ac263b1b7682191be
publicKey: 352fea06df3288b3b9d5d0a82581f6237d7fc3ec
```