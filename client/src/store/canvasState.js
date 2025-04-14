import {makeAutoObservable} from 'mobx'


class CanvasState {
    canvas = null
    undoList = []
    redoList = []



    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas){
        this.canvas = canvas
    }

    pushToUndo(data) {
        this.undoList.push(data);
        console.log('push to undo')
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        console.log(this.undoList.length)
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            }
            console.log('undo')
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        console.log(this.undoList.length)
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            }
            console.log('redo')
        }
    }

}

export default new CanvasState();