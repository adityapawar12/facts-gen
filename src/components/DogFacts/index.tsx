import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import axios from "axios";
import { ChromePicker } from "react-color";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaUndo,
  FaRedo,
  FaFileDownload,
  FaTimes,
  FaLightbulb,
} from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { AiOutlineBgColors } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
// import Hammer from "hammerjs";

const width = 1080;
const height = 1080;

const history = [
  {
    x: 20,
    y: 20,
  },
];
let historyStep = 0;

const DogFacts = () => {
  const stageRef: any = useRef(null);
  const fullRef: any = useRef(null);
  const [position, setPosition] = useState(history[0]);
  const [backgroundColor, setBackgroundColor] = useState("#2C3333");
  const [text, setText] = useState<string>("");
  const [fact, setFact] = useState<string>("");
  const [imageFormat, setImageFormat] = useState<string>("jpeg");
  const [zoom, setZoom] = useState<number>(1);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleZoomIn = () => {
    setZoom(Number((zoom + 0.05).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom(Number((zoom - 0.05).toFixed(2)));
  };

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    setPosition(previous);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    setPosition(next);
  };

  const handleDragEnd = (e: any) => {
    setIsSelected(false);
    history.splice(historyStep + 1, history.length - historyStep - 1);
    const pos = {
      x: e.target.x(),
      y: e.target.y(),
    };
    history.push(pos);
    historyStep += 1;
    setPosition(pos);
  };

  const downloadImage = () => {
    let dataURL: any;
    let link: any;
    if (imageFormat === "jpeg") {
      dataURL = stageRef.current.toDataURL({
        mimeType: "image/jpeg",
        quality: 1,
      });
      link = document.createElement("a");
      link.download = "image.jpeg";
    } else if (imageFormat === "png") {
      dataURL = stageRef.current.toDataURL({
        mimeType: "image/png",
        quality: 1,
      });
      link = document.createElement("a");
      link.download = "image.png";
    }
    link.download = "image.png";
    link.href = dataURL;
    link.click();
  };

  const generateFact = () => {
    axios
      .get("https://dogapi.dog/api/facts")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((res: any) => {
        console.log(res.facts);
        setFact(res.facts[0]);
        setText(res.facts[0]);
      });
  };
  const textRef: any = React.useRef();
  const trRef: any = React.useRef();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClickText = () => {
    setIsSelected((prevIsSelected) => !prevIsSelected);
  };

  useEffect(() => {
    console.log("showSettings");
  }, [showSettings]);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     console.log(window.innerWidth);
  //     return;
  //   };

  //   window.addEventListener("resize", handleWindowResize);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);

  return (
    <div className={`overflow-hidden relative`}>
      <div
        id="fullDiv"
        ref={fullRef}
        className={`flex justify-center align-middle items-center`}
      >
        <div className={`basis-full bg-white flex justify-center items-center`}>
          <div className={`h-screen overflow-y-scroll`}>
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
                {text.length > 0 ? (
                  <Text
                    text={text}
                    fontSize={60}
                    contentEditable
                    // onBlur={handleTextChange}
                    onBlur={(e: any) => setText(e.target.value)}
                    fontFamily={`Calibri`}
                    fill={`white`}
                    align={`center`}
                    verticalAlign={`middle`}
                    draggable={true}
                    x={position.x}
                    ref={textRef}
                    y={position.y}
                    width={1040}
                    height={1040}
                    onClick={handleClickText}
                    onDragEnd={handleDragEnd}
                    onTransformEnd={(e) => {
                      const node = textRef.current;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                    }}
                  />
                ) : null}
                {isSelected && (
                  <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
      <div
        className={`absolute m-2 w-28 left-0 top-0 h-screen flex flex-col justify-start items-center`}
      >
        <div className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded`}>
          <div className={`text-center`}>BG Color</div>
          <div className={`text-center`}>{backgroundColor}</div>
        </div>
        <div className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded`}>
          <div className={`text-center`}>Zoom Level</div>
          <div className={`text-center`}>{zoom}</div>
        </div>
        <div className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded`}>
          <div className={`text-center`}>Image Format</div>
          <div className={`text-center`}>
            {String(imageFormat).toUpperCase()}
          </div>
        </div>
      </div>

      {!showSettings ? (
        <div
          className={`absolute right-0 bottom-4 z-40 font-bold px-0 py-2 mb-2 bg-slate-800 text-white w-10 rounded-l text-center text-lg`}
          onClick={() => {
            console.log("ok");
            setShowSettings(true);
          }}
        >
          <button type={`button`}>
            <IoIosArrowBack />
          </button>
        </div>
      ) : null}

      <div
        className={`absolute m-2 w-28 right-0 top-0 h-screen flex flex-col justify-start items-center`}
      >
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={handleUndo}>
            <FaUndo />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={handleRedo}>
            <FaRedo />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={handleZoomIn}>
            <FaSearchPlus />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={handleZoomOut}>
            <FaSearchMinus />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button
            onClick={() => {
              setZoom(1);
              setTimeout(() => {
                setIsSelected(false);
                downloadImage();
                setZoom(1);
              }, 500);
            }}
            type={`button`}
          >
            <FaFileDownload />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={generateFact}>
            <FaLightbulb />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
        >
          <button type={`button`} onClick={() => setText(fact)}>
            <RxReset />
          </button>
        </div>
        <div
          className={`px-0 py-2 mb-2 bg-slate-800 text-white w-28 rounded text-center text-lg`}
          onClick={() => {
            setShowColorPicker((prevShowColorPicker) => !prevShowColorPicker);
          }}
        >
          <button type={`button`} onClick={() => setText(fact)}>
            <AiOutlineBgColors />
          </button>
        </div>
        {showColorPicker && (
          <ChromePicker
            color={backgroundColor}
            onChange={(updatedColor) => setBackgroundColor(updatedColor.hex)}
          />
        )}
      </div>
      {showSettings ? (
        <div
          className={`bg-slate-900 w-1/3 absolute right-0 top-0 h-screen rounded-l`}
        >
          <div className="flex justify-end m-4">
            <div
              className={`text-slate-900 bg-white w-max p-2 rounded text-2xl `}
              onClick={() => {
                console.log("ok");
                setShowSettings(false);
              }}
            >
              <FaTimes />
            </div>
          </div>
          <form
            className={`flex flex-col justify-start items-stretch w-full py-4`}
          >
            <div className={`flex flex-col w-full px-6`}>
              <label
                htmlFor={`bg-color`}
                className={`text-white font-semibold text-xl mb-2 d-inline`}
              >
                Background Color
              </label>
              <button
                className={`inline w-max p-2 rounded text-gray-800 bg-white focus:text-gray-800 focus:bg-white`}
                type={`button`}
                onClick={() => {
                  setShowColorPicker(
                    (prevShowColorPicker) => !prevShowColorPicker
                  );
                }}
              >
                {showColorPicker ? "Close Color Picker" : "Open Color Picker"}
              </button>
              {showColorPicker && (
                <ChromePicker
                  color={backgroundColor}
                  onChange={(updatedColor) =>
                    setBackgroundColor(updatedColor.hex)
                  }
                />
              )}
            </div>
            <div className={`flex flex-col w-full px-6`}>
              <label
                className={`text-white font-semibold text-xl mb-2`}
                htmlFor={`text`}
              >
                Text
              </label>
              <input
                type={`text`}
                className={`w-full font-normal text-xl mb-2`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className={`flex flex-col w-full px-6`}>
              <label
                className={`text-white font-semibold text-xl mb-2`}
                htmlFor={`format`}
              >
                Format
              </label>
              <select
                name={`format`}
                id={`format`}
                value={imageFormat}
                onChange={(e) => setImageFormat(e.target.value)}
                className={`w-full font-normal text-xl mb-2`}
              >
                <option value={`jpeg`}>JPEG</option>
                <option value={`png`}>PNG</option>
                <option value={`svg`} disabled>
                  SVG
                </option>
              </select>
            </div>
            <div
              className={`flex flex-row justify-center w-full px-6 my-2`}
            ></div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default DogFacts;
