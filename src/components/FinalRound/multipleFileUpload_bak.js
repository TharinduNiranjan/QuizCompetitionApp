import React, { Component } from "react";
import { db, storage } from "../../firebase/firebase";
import "./dropzone.css";
class MultiFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadedFiles: [],
      hightlight: false,
      uploaded: false,
    };
    this.folder_path = "finalRound/user/";
    this.fileInputRef = React.createRef();
    this.onFileChange = this.onFileChange.bind(this);
    this.uploadSubmit = this.uploadSubmit.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.getFirebaseFileList = this.getFirebaseFileList.bind(this);
  }
  componentDidMount() {
    this.getFirebaseFileList();
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
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      newFile["id"] = Math.random();
      newFile["progress"] = 0;
      this.setState((prevState) => {
        const newItems = [...prevState.files];
        newItems.push(newFile);
        return { files: newItems };
      });
    }
    this.setState({ hightlight: false });
  }

  onFileChange(e) {
    console.log(this.state);
    let newFileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      newFile["progress"] = 0;
      newFileList.push(newFile);
      this.setState((prevState) => {
        const newItems = [...prevState.files];
        newItems.push(newFile);
        return { files: newItems };
      });
    }
  }
  //   uploadFiles(files){
  //     const promises = [];
  //     files.forEach((file, index) => {
  //       const uploadTask = storage.ref().child(`finalRound/user/${file.name}`).put(file);
  //       promises.push(uploadTask);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           if (snapshot.state === "running") {
  //             console.log(`Progress: ${progress}%`);
  //             this.updateProgress(index, progress);
  //           }
  //         },
  //         (error) => console.log(error.code),
  //         async () => {
  //           const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //           console.log(downloadURL);
  //           // do something with the url
  //         }
  //       );
  //     });
  //     Promise.all(promises)
  //       .then(() => alert("All files uploaded"))
  //       .catch((err) => console.log(err.code));

  //   }
  uploadSubmit(e) {
    e.preventDefault();
    const promises = [];
    this.state.files.forEach((file, index) => {
      const uploadTask = storage
        .ref()
        .child(this.folder_path + file.name)
        .put(file);
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
        this.setState({ uploaded: true, files: [] });
        this.getFirebaseFileList();
      })
      .catch((err) => console.log(err.code));
  }
  updateProgress = (index, progress) => {
    this.setState((prevState) => {
      const newItems = [...prevState.files];
      newItems[index].progress = progress;
      return { files: newItems };
    });
  };
  removefile(index) {
    this.setState((prevState) => {
      const newItems = [...prevState.files];
      newItems.splice(index, 1);
      return { files: newItems };
    });
  }

  getFirebaseFileList() {
    this.setState({ uploadedFiles: [] });
    storage
      .ref()
      .child("finalRound/user")
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          this.setState((prevState) => {
            const newItems = [...prevState.uploadedFiles];
            newItems.push(itemRef);
            return { uploadedFiles: newItems };
          });
        });
      });
  }
  render() {
    return (
      <div className="col-12">
        <div className="row mb-2">
          {/* Dragzone */}
          <div className={`col-sm-4 Dropzone ${this.state.hightlight ? "Highlight" : ""}`} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop} onClick={this.openFileDialog} style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
            <input ref={this.fileInputRef} className="FileInput" type="file" accept="image/*" multiple onChange={this.onFileChange} />
            <img alt="upload" className="Icon" src="baseline-cloud_upload-24px.svg" />
            <span>Upload Files</span>
          </div>
          <div className="col-sm-8 upload-area">
            <h2> Files to be Uploaded</h2>
            {/* Preview */}
            {this.state.files.map((file, key) => (
              <div key={key} className="file-area">
                <div className="file-name">{file.name}</div>
                <div className="close" onClick={() => this.removefile(key)}>
                  x
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: file.progress + "%" }}>
                    {file.progress}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Upload Button */}
        </div>
        {this.state.uploaded ? (
          <button className="upload-button">Done</button>
        ) : (
          <button className="upload-button" onClick={this.uploadSubmit}>
            Upload All Files
          </button>
        )}
        <h2>Files already Uploaded</h2>
        {this.state.uploadedFiles.map((fileRef, key) => (
          <p key={key}>{fileRef.fullPath.split("/").pop()}</p>
        ))}
      </div>
    );
  }
}
export default MultiFileUpload;
