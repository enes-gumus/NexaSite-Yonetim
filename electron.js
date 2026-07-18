import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let backendProcess;



function startBackend() {


    const backendPath = app.isPackaged

        ? path.join(
            process.resourcesPath,
            "backend"
        )

        : path.join(
            __dirname,
            "backend"
        );



    const pythonPath = path.join(
        backendPath,
        "venv/bin/python"
    );



    backendProcess = spawn(

        pythonPath,

        [
            "-m",
            "uvicorn",
            "app.main:app",
            "--host",
            "127.0.0.1",
            "--port",
            "8000"
        ],

        {
            cwd: backendPath
        }

    );



    backendProcess.stdout.on(

        "data",

        (data)=>{

            console.log(
                `BACKEND: ${data}`
            );

        }

    );



    backendProcess.stderr.on(

        "data",

        (data)=>{

            console.log(
                `BACKEND ERROR: ${data}`
            );

        }

    );


    backendProcess.on(

        "error",

        (error)=>{

            console.log(
                "BACKEND START ERROR:",
                error
            );

        }

    );

}




function createWindow(){


    const win = new BrowserWindow({

        width:1200,

        height:800,

        webPreferences: {

            nodeIntegration:false

        }

    });



    const indexPath = app.isPackaged

        ? path.join(
            process.resourcesPath,
            "app.asar",
            "dist",
            "index.html"
        )

        : path.join(
            __dirname,
            "dist",
            "index.html"
        );



    console.log(
        "Açılacak dosya:",
        indexPath
    );



    win.loadFile(indexPath);



    win.webContents.on(

        "did-finish-load",

        ()=>{

            console.log(
                "Electron sayfa yüklendi"
            );

        }

    );

}





app.whenReady().then(()=>{


    startBackend();



    setTimeout(()=>{


        createWindow();


    },3000);



});






app.on(

    "window-all-closed",

    ()=>{


        if(backendProcess){

            backendProcess.kill();

        }



        if(process.platform !== "darwin"){

            app.quit();

        }


    }

);
