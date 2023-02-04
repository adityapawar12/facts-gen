// import { useRef, useState } from "react";
// import { saveAs } from "file-saver";
// import axios from "axios";

// const DogFacts = () => {
//   const previewCanvasRef: any = useRef(null);
//   const originalCanvasRef: any = useRef(null);
//   const drawButtonRef: any = useRef(null);
//   const [backgroundColor, setBackgroundColor] = useState("#2C3333");
//   const [text, setText] = useState<string>("");
//   const [fact, setFact] = useState<string>("");
//   const [fillImage, setfillImage] = useState<boolean>(false);
//   const [imageFormat, setImageFormat] = useState<string>("jpeg");

//   const downloadImage = () => {
//     const canvas = originalCanvasRef.current;
//     const dataURL = canvas.toDataURL("image/jpeg", 1.0);
//     const blob = dataURLToBlob(dataURL);

//     if (imageFormat === "jpeg") {
//       saveAs(blob, "Dog Fact.jpeg");
//     } else if (imageFormat === "png") {
//       saveAs(blob, "Dog Fact.png");
//     }
//   };

//   const dataURLToBlob = (dataURL: any) => {
//     const parts = dataURL.split(";base64,");
//     const contentType = parts[0].split(":")[1];
//     const raw = window.atob(parts[1]);
//     const rawLength = raw.length;
//     const uInt8Array = new Uint8Array(rawLength);

//     for (let i = 0; i < rawLength; ++i) {
//       uInt8Array[i] = raw.charCodeAt(i);
//     }
//     return new Blob([uInt8Array], { type: contentType });
//   };

//   const drawPreviewImage = () => {
//     const canvas = previewCanvasRef.current as HTMLCanvasElement;
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//     const imageWidth = 540;
//     const imageHeight = 540;

//     canvas.width = imageWidth;
//     canvas.height = imageHeight;

//     ctx.fillStyle = backgroundColor;
//     ctx.fillRect(0, 0, imageWidth, imageHeight);

//     ctx.font = "28px sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillStyle = "#E7F6F2";

//     const words = text.split(" ");
//     let line = "";
//     let lineNumber = 0;

//     for (const word of words) {
//       const testLine = line + word + " ";
//       const testWidth = ctx.measureText(testLine).width;

//       if (testWidth > canvas.width - 50) {
//         ctx.fillText(
//           line,
//           canvas.width / 2,
//           canvas.height / 2 + lineNumber * 30
//         );
//         line = word + " ";
//         lineNumber++;
//       } else {
//         line = testLine;
//       }
//     }
//     ctx.fillText(line, canvas.width / 2, canvas.height / 2 + lineNumber * 30);
//   };

//   const drawOriginalImage = () => {
//     const canvas = originalCanvasRef.current as HTMLCanvasElement;
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//     const imageWidth = 1080;
//     const imageHeight = 1080;

//     canvas.width = imageWidth;
//     canvas.height = imageHeight;

//     ctx.fillStyle = backgroundColor;
//     ctx.fillRect(0, 0, imageWidth, imageHeight);

//     ctx.font = "60px sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillStyle = "#E7F6F2";

//     const words = text.split(" ");
//     let line = "";
//     let lineNumber = 0;

//     for (const word of words) {
//       const testLine = line + word + " ";
//       const testWidth = ctx.measureText(testLine).width;

//       if (testWidth > canvas.width - 50) {
//         ctx.fillText(
//           line,
//           canvas.width / 2,
//           canvas.height / 2 + lineNumber * 50
//         );
//         line = word + " ";
//         lineNumber++;
//       } else {
//         line = testLine;
//       }
//     }
//     ctx.fillText(line, canvas.width / 2, canvas.height / 2 + lineNumber * 50);
//   };

//   const generateFact = () => {
//     axios
//       .get("https://dogapi.dog/api/facts")
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .then((res: any) => {
//         console.log(res.facts);
//         setFact(res.facts[0]);
//         setText(res.facts[0]);
//         drawButtonRef.current.click();
//       });
//   };

//   return (
//     <>
//       <div
//         className={`flex flex-row justify-start items-start h-screen bg-gray-800 pb-6`}
//       >
//         <div className={`basis-1/2 my-2 w-auto h-full border overflow-auto`}>
//           {fillImage ? (
//             <div className="flex justify-center h-full itmes-center align-middle">
//               <canvas
//                 className={`border m-2`}
//                 ref={previewCanvasRef}
//                 width={"540"}
//                 height={"540"}
//               />
//               <canvas
//                 hidden
//                 className={`border m-2`}
//                 ref={originalCanvasRef}
//                 width={"1080"}
//                 height={"1080"}
//               />
//             </div>
//           ) : (
//             <div className="flex justify-center itmes-center align-middle">
//               <canvas
//                 className={`border m-2`}
//                 ref={previewCanvasRef}
//                 width={"540"}
//                 height={"540"}
//               />
//               <canvas
//                 hidden
//                 className={`border m-2`}
//                 ref={originalCanvasRef}
//                 width={"1080"}
//                 height={"1080"}
//               />
//             </div>
//           )}
//         </div>
//         <div className={`basis-1/2 my-2 h-full`}>
//           <form
//             className={`flex flex-col justify-start align-start items-start py-4`}
//           >
//             <div className={`flex flex-col w-full px-6`}>
//               <label
//                 htmlFor="bg-color"
//                 className={`text-slate-200 font-normal text-xl mb-2`}
//               >
//                 Background Color :
//               </label>
//               <input
//                 type="color"
//                 value={backgroundColor}
//                 className={`w-full font-normal text-xl mb-2`}
//                 onChange={(e) => setBackgroundColor(e.target.value)}
//               />
//             </div>
//             <div className={`flex flex-col w-full px-6`}>
//               <label
//                 className={`text-slate-200 font-normal text-xl mb-2`}
//                 htmlFor="text"
//               >
//                 Text:
//               </label>
//               <input
//                 type="text"
//                 className={`w-full font-normal text-xl mb-2`}
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//             </div>
//             <div className={`flex flex-col w-full px-6`}>
//               <label
//                 className={`text-slate-200 font-normal text-xl mb-2`}
//                 htmlFor="format"
//               >
//                 Format:
//               </label>
//               <select
//                 name="format"
//                 id="format"
//                 value={imageFormat}
//                 onChange={(e) => setImageFormat(e.target.value)}
//                 className={`w-full font-normal text-xl mb-2`}
//               >
//                 <option value="jpeg">JPEG</option>
//                 <option value="png">PNG</option>
//                 <option value="svg" disabled>
//                   SVG
//                 </option>
//               </select>
//             </div>
//             <div className={`flex flex-row justify-center w-full px-6 my-2`}>
//               <button
//                 onClick={() => {
//                   drawPreviewImage();
//                   drawOriginalImage();
//                 }}
//                 ref={drawButtonRef}
//                 type={`button`}
//                 className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//               >
//                 Draw Image
//               </button>
//               <button
//                 onClick={downloadImage}
//                 type={`button`}
//                 className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//               >
//                 Download Image
//               </button>
//               <button
//                 onClick={() => {
//                   setfillImage((prevfillImage) => {
//                     console.log(fillImage);
//                     return !prevfillImage;
//                   });
//                 }}
//                 type={`button`}
//                 className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//               >
//                 {fillImage ? "Unfill Image" : "Fill Image"}
//               </button>
//               <button
//                 type={`button`}
//                 className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//                 onClick={generateFact}
//               >
//                 Generate Fact
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DogFacts;
// import { useRef, useState } from "react";
// import { Stage, Layer, Rect, Text } from "react-konva";
// import { saveAs } from "file-saver";
// import axios from "axios";

// const width = 1080;
// const height = 1080;
// const backgroundColor = "black";

// const DogFacts = () => {
//   const stageRef: any = useRef(null);
//   const [backgroundColor, setBackgroundColor] = useState("#2C3333");
//   const [text, setText] = useState<string>("");
//   const [fact, setFact] = useState<string>("");
//   const [fillImage, setfillImage] = useState<boolean>(false);
//   const [imageFormat, setImageFormat] = useState<string>("jpeg");

//   const downloadImage = () => {
//     const dataURL = stageRef.current.toDataURL({
//       mimeType: "image/png",
//       quality: 1,
//     });
//     const link = document.createElement("a");
//     link.download = "image.png";
//     link.href = dataURL;
//     link.click();
//   };

//   const generateFact = () => {
//     axios
//       .get("https://dogapi.dog/api/facts")
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .then((res: any) => {
//         console.log(res.facts);
//         setFact(res.facts[0]);
//         setText(res.facts[0]);
//       });
//   };

//   return (
//     <div>
//       <div className={`flex flex-row justify-center w-full px-6 my-2`}>
//         {/* <button
//           onClick={() => {
//             drawPreviewImage();
//             drawOriginalImage();
//           }}
//           ref={drawButtonRef}
//           type={`button`}
//           className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//         >
//           Draw Image
//         </button> */}
//         <button
//           onClick={downloadImage}
//           type={`button`}
//           className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//         >
//           Download Image
//         </button>
//         <button
//           type={`button`}
//           className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
//           onClick={generateFact}
//         >
//           Generate Fact
//         </button>
//       </div>
//       <div className={`h-96 w-96 overflow-scroll`}>
//         <Stage width={width} height={height} ref={stageRef}>
//           <Layer>
//             <Rect
//               x={0}
//               y={0}
//               width={width}
//               height={height}
//               fill={backgroundColor}
//             />
//             <Text
//               text={text}
//               fontSize={30}
//               fontFamily="Calibri"
//               fill="white"
//               align="center"
//               draggable={true}
//             />
//           </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// };
// export default DogFacts;

{
  /* <div className={`flex flex-row justify-center w-full px-6 my-2`}>
        <button
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
          onClick={generateFact}
        >
          Generate Fact
        </button>
        <button
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
          onClick={handleRedo}
        >
          Redo
        </button>
        <select
          name="format"
          id="format"
          value={imageFormat}
          onChange={(e) => setImageFormat(e.target.value)}
          className={`w-full font-normal text-xl mb-2`}
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="svg" disabled>
            SVG
          </option>
        </select>
        <button
          onClick={() => {
            setZoom(1);
            setTimeout(() => {
              downloadImage();
              setZoom(0.5);
            }, 500);
          }}
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
        >
          Download
        </button>
        <button
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button
          type={`button`}
          className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
      </div> 
      <div>
        <form
          className={`flex flex-col justify-start align-start items-start py-4`}
        >
          <div className={`flex flex-col w-full px-6`}>
            <label
              htmlFor="bg-color"
              className={`text-slate-200 font-normal text-xl mb-2`}
            >
              Background Color :
            </label>
            <input
              type="color"
              value={backgroundColor}
              className={`w-full font-normal text-xl mb-2`}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className={`flex flex-col w-full px-6`}>
            <label
              className={`text-slate-200 font-normal text-xl mb-2`}
              htmlFor="text"
            >
              Text:
            </label>
            <input
              type="text"
              className={`w-full font-normal text-xl mb-2`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={`flex flex-col w-full px-6`}>
            <label
              className={`text-slate-200 font-normal text-xl mb-2`}
              htmlFor="format"
            >
              Format:
            </label>
            <select
              name="format"
              id="format"
              value={imageFormat}
              onChange={(e) => setImageFormat(e.target.value)}
              className={`w-full font-normal text-xl mb-2`}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="svg" disabled>
                SVG
              </option>
            </select>
          </div>
          <div className={`flex flex-row justify-center w-full px-6 my-2`}>
            <button
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
              onClick={generateFact}
            >
              Generate Fact
            </button>
            <button
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
              onClick={handleUndo}
            >
              Undo
            </button>
            <button
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
              onClick={handleRedo}
            >
              Redo
            </button>
            <select
              name="format"
              id="format"
              value={imageFormat}
              onChange={(e) => setImageFormat(e.target.value)}
              className={`w-full font-normal text-xl mb-2`}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="svg" disabled>
                SVG
              </option>
            </select>
            <button
              onClick={() => {
                setZoom(1);
                setTimeout(() => {
                  downloadImage();
                  setZoom(0.5);
                }, 500);
              }}
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
            >
              Download
            </button>
            <button
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
              onClick={handleZoomIn}
            >
              Zoom In
            </button>
            <button
              type={`button`}
              className={`bg-slate-200 text-gray-800 rounded-lg px-4 py-2 mx-2`}
              onClick={handleZoomOut}
            >
              Zoom Out
            </button>
          </div>
        </form>
      </div>
      <div className={`h-[40rem] w-[40rem] overflow-scroll`}>
        <Stage
          width={width}
          height={height}
          ref={stageRef}
          scaleX={zoom}
          scaleY={zoom}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill={backgroundColor}
            />
            <Text
              text={text}
              fontSize={60}
              fontFamily="Calibri"
              fill="white"
              align="center"
              verticalAlign="middle"
              draggable={true}
              x={position.x}
              y={position.y}
              width={1000}
              height={1000}
              onDragEnd={handleDragEnd}
            />
          </Layer>
        </Stage>
      </div> */
}
