export const drawRect=(detections,ctx)=>{
    detections.map((prediction)=>{
          
        //prediction results
        const [x,y,width,height]=prediction["bbox"];
        const text=prediction["class"];
        
        //set styling 
        const color= "yellow"
        ctx.strokeStyle=color
        ctx.font="18px Montserrat"
        ctx.fillStyle= color;

        //draw rectangles and text
        ctx.beginPath();
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()
    })
}