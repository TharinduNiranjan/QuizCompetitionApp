import React, { Component } from "react";
import { db, storage } from "../../firebase/firebase";
import { HighlightOff } from "@material-ui/icons";
import "./multipleFileUpload.css";
class MultiFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToUpload: [],
      uploadedFiles: [],
      hightlight: false,
      uploaded: false,
    };
    this.mounted = true;
    this.folder_path = "finalRound/" + this.props.folderName + "/";
    this.fileInputRef = React.createRef();
    this.onFileChange = this.onFileChange.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.getFirebaseFileList = this.getFirebaseFileList.bind(this);
    console.log("constructor", this.state.uploadedFiles, this.props.folderName);
  }
  componentDidMount() {
    this.mounted = true;
    this.folder_path = "finalRound/" + this.props.folderName + "/";
    this.getFirebaseFileList();
    console.log("mounted", this.state.uploadedFiles, this.props.folderName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.folderName != this.props.folderName) {
      this.mounted = true;
      this.folder_path = "finalRound/" + this.props.folderName + "/";
      this.getFirebaseFileList();
      console.log("updated", this.state.uploadedFiles, this.props.folderName);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  // event handlers
  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }
  onDragOver(evt) {
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  }
  onDragLeave() {
    this.setState({ hightlight: false });
  }
  onDrop(event) {
    event.preventDefault();
    if (this.props.disabled) return;
    const files = event.dataTransfer.files;
    this.setState({ filesToUpload: files, hightlight: false });
    this.uploadFiles(files);
  }
  onFileChange(e) {
    this.setState({ filesToUpload: e.target.files });
    this.uploadFiles(e.target.files);
  }
  uploadFiles(files) {
    // console.log(files);
    const promises = [];
    Object.keys(files).map((index) => {
      const uploadTask = storage
        .ref()
        .child(this.folder_path + files[index].name)
        .put(files[index]);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === "running") {
            console.log(`Progress: ${progress}%`);
            this.updateProgress(index, progress);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log(downloadURL);
          // do something with the url
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        if (this.mounted) {
          this.setState({ filesToUpload: [] });
          this.getFirebaseFileList();
        }
      })
      .catch((err) => console.log(err.code));
  }

  updateProgress = (index, progress) => {
    this.setState((prevState) => {
      const newItems = [...prevState.filesToUpload];
      newItems[index]["progress"] = Math.round((progress + Number.EPSILON) * 100) / 100;
      return { filesToUpload: newItems };
    });
  };
  removefile(itemRef, index) {
    storage.ref().child(itemRef).delete();
    this.setState((prevState) => {
      const newItems = [...prevState.uploadedFiles];
      newItems.splice(index, 1);
      return { uploadedFiles: newItems };
    });
    // firebase get didn't update the front end. Therefore the state change workaround was used
    // this.getFirebaseFileList();
  }

  getFirebaseFileList() {
    storage
      .ref()
      .child(this.folder_path)
      .listAll()
      .then((res) => {
        // console.log(this.state);
        if (this.mounted) {
          this.setState({ uploadedFiles: res.items });
          // console.log("updated state", this.state);
        }
      });
  }
  render() {
    return (
      <div className="col-12">
        <div className="row">
          {/* Dragzone */}
          <div className={`col-sm-4 mb-3 Dropzone ${this.state.hightlight ? "Highlight" : ""}`} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop} onClick={this.openFileDialog} style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
            <input ref={this.fileInputRef} className="FileInput" type="file" accept="image/*" multiple onChange={this.onFileChange} />
            {/* <img alt="upload" className="Icon" src="baseline-cloud_upload-24px.svg" /> */}
            <span> Drag and Drop files here</span>
            <small>OR</small>
            <div className="button">Upload</div>
          </div>
          <div className="col-sm-8 mb-3 upload-area">
            <div className="row file-list">
              {/* Preview */}
              {Object.keys(this.state.filesToUpload).map((key) => (
                <div key={key} className="file-area col-sm-6">
                  <div className="file-name">
                    {this.state.filesToUpload[key].name}
                    <div className="progress">
                      <div className="progress-bar" style={{ width: this.state.filesToUpload[key].progress + "%" }}>
                        {this.state.filesToUpload[key].progress + "%"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {this.state.uploadedFiles.map((fileRef, key) => (
                <div key={key} className="file-area col-sm-6 uploaded">
                  <div className="file-name">{fileRef.fullPath.split("/").pop().slice(0, 19)}</div>
                  <div className="deleteFile" onClick={() => this.removefile(fileRef.fullPath, key)}>
                    <HighlightOff></HighlightOff>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Upload Button */}
        </div>
      </div>
    );
  }
}
export default MultiFileUpload;
