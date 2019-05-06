import React, { Component } from 'react';
import './Dropzone.css';

export default class Dropzone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlight: false
        };

        this.fileInputRef = React.createRef();
        // this.openFileDialog = this.openFileDialog.bind(this);
        // this.onFilesAdded = this.onFilesAdded.bind(this);
        // this.onDragOver = this.onDragOver.bind(this);
        // this.onDragLeave = this.onDragLeave.bind(this);
        // this.onDrop = this.onDrop.bind(this);
    }

    // creating these functions as arrow function so we don't have to bind the function to the 'this' context
    openFileDialog = () => {
        if (this.props.disabled) return;
        // access the ref with .current when you create the ref with the React.createRef() API
        this.fileInputRef.current.click();
    };

    // presumably the onFilesAdded prop function (from parent component) will handle the array list of files, ie, post them, etc
    onFilesAdded = (evt) => {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    };

    fileListToArray(list) {
        const array = [];
        for (let i = 0; i < list.length; i++) {
            // list is a FileList object with a method called item() that retrieves the specific file details at given index
            array.push(list.item(i));
        }
        return array;
    }

    onDragOver = (evt) => {
        evt.preventDefault();

        if (this.props.disabled) return;

        this.setState({ highlight: true })
    };

    onDragLeave = () => {
        this.setState({ highlight: false })
    };

    onDrop = (event) => {
        event.preventDefault();

        if (this.props.disabled) return;

        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }

        this.setState({ highlight: false });
    };

    render() {
        return (
            <div
                className={`Dropzone ${this.state.highlight ? "Highlight" : ""}`}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                <img
                    alt="upload"
                    className="Icon"
                    // this file is in /public directory
                    src="baseline-cloud_upload-24px.svg"
                />
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                />
                <span>Upload Files</span>
            </div>
        )
    }
}
