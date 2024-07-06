// const UPLOAD_FOLDER_BASE_URL = "http://localhost:5000/uploads/";

const baseUrl = process.env.REACT_APP_BASE_URL

const UPLOAD_FOLDER_BASE_URL = `${baseUrl}/uploads/`;

const stables = { UPLOAD_FOLDER_BASE_URL };


export default stables;
