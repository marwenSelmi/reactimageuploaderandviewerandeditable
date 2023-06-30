import React, { useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

// css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

// Import Doka. For testing purpose only, if you're intrested in using Doka
// in your project please purchase a license at https://pqina.nl/doka/
import "./vendor/doka.min.css";
import { create } from "./vendor/doka.esm.min";

// Register the FilePond plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

function App() {
  const [files, setFiles] = useState([]);
  return (
    <div className="App">
      <FilePond
        files={files}
        allowReorder={true}
        onupdatefiles={setFiles}
        onpreparefile={(file, output) => {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(output);
          document.body.appendChild(img);
        }}
        imageResizeTargetWidth={200}
        imageResizeTargetHeight={144}
        imageResizeUpscale={false}
        imageResizeMode={"contain"}
        imageEditEditor={create({
          cropMinImageWidth: 128,
          cropMinImageHeight: 128
        })}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
