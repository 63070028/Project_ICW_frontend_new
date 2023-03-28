<template>
    <div class="upload_content mt-6" v-if="isEdit">
        <div class="columns mb-3">
            <div class="file is-info has-name">
                <label class="file-label">
                    <input class="file-input" type="file" accept="application/pdf" @change="handleFileChange($event)">
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a {{ upload_category }}
                        </span>
                    </span>
                    <span class="file-name">
                        {{ file.name }}
                    </span>
                </label>
            </div>
            <button class="button ml-3 is-warning" @click="resetFileInput()">Reset</button>
            <button class="button ml-3 is-danger" @click="cancelEdit()">Cancel</button>
        </div>
        <div v-if="errors.length > 0">
            <div class="has-text-danger" v-for="(error, index) in errors" :key="index">
                <h1>{{ error }}</h1>
            </div>
        </div>
        <button class="button mb-3 mt-3 is-success" @click="uploadFile()">Upload</button>
    </div>

    <div v-if="isEdit === false" style="display: flex; flex-direction: column; align-items: flex-end;">
        <button class="button mb-3 mt-3 is-info" @click="isEdit = true">Edit</button>
    </div>

    <!-- pre-review เก่า -->
    <iframe  v-show="isEdit === false" :src="urlOld" width="100%" height="1500">
    </iframe>

    <!-- pre-review อันใหม่ -->
    <div v-if="file.isUploaded" class="mt-6">
        <iframe :src="file.url" v-if="file.isPdf" width="100%" height="1500">
        </iframe>
        <div v-if="!file.isPdf" class="file-extention">
            {{ file.fileExtention }}
        </div>
    </div>


</template>


<script>
import Swal from 'sweetalert2';
import ResumeOld from '../assets/ResumeOld';
export default {
    props: {
        upload_category: {
            type: String,
            required: true
        },
        maxSize: {
            type: Number,
            default: 100,
            required: true,
        }
    },
    data() {
        return {
            file: {
                name: "",
                size: 0,
                type: "",
                fileExtention: "",
                url: "",
                isPdf: false,
                isUploaded: false,
                upload_category: this.upload_category
            },
            isEdit: false,
            errors: [],
            file_test: null,
            urlOld: 'data:application/pdf;base64, ' + ResumeOld

        };
    },

    methods: {
        handleFileChange(e) {
            this.errors = [];
            // Check if file is selected
            if (e.target.files && e.target.files[0]) {
                // Check if file is valid
                if (this.isFileValid(e.target.files[0])) {
                    // Get uploaded file
                    const file = e.target.files[0],
                        // Get file size
                        fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,
                        // Get file extension
                        fileExtention = file.name.split(".").pop(),
                        // Get file name
                        fileName = file.name,
                        // Check if file is an image
                        isPdf = ["pdf"].includes(fileExtention);
                    // Print to console
                    console.log(fileSize, fileExtention, fileName, isPdf);
                    console.log(file)
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.file = {
                            name: fileName,
                            size: fileSize,
                            type: file.type,
                            fileExtention: fileExtention,
                            isPdf: isPdf,
                            url: reader.result,
                            isUploaded: true,
                            upload_category: this.upload_category
                        };
                    }

                    // this.file_test = file;

                } else {
                    console.log("Invalid file");
                }
            }
        },
        isFileSizeValid(fileSize) {
            if (fileSize <= this.maxSize) {
                console.log("File size is valid");
            } else {
                this.errors.push(`File size should be less than ${this.maxSize} MB`);
            }
        },
        isFileTypeValid(fileExtention) {
            if (["pdf"].includes(fileExtention)) {
                console.log("File type is valid");
            } else {
                this.errors.push(`File type should be ${this.accept}`);
            }
        },
        isFileValid(file) {
            this.isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
            this.isFileTypeValid(file.name.split(".").pop());
            if (this.errors.length === 0) {
                return true;
            } else {
                return false;
            }
        },
        resetFileInput() {
            this.$nextTick(() => {
                this.file = {
                    name: "",
                    size: 0,
                    type: "",
                    fileExtention: "",
                    url: "",
                    isPdf: false,
                    isUploaded: false,
                };
            });
        },
        cancelEdit(){
            this.resetFileInput();
            this.isEdit = false;
        },
        uploadFile() {

            // const formData = new FormData();
            // formData.append('file', file);
            console.log(this.file.upload_category)
            //api post

            this.urlOld = this.file.url

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            })
            
        

            setTimeout(()=>{
                this.isEdit = false;
                this.resetFileInput();
            }, 1500);

        }
    }
}
</script>

<style scoped>
.upload_content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
