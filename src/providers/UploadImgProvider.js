import React, {createContext} from "react";
import { post } from 'axios';

export const UploadImgContext = createContext();

export function UploadImgProvider(props) {
    const apiUrl = "/api/uploads/";

    const getImgURL = (imgURL) => {
        const getURL = apiUrl + `${imgURL}`
        return(getURL)
    }
    const addImg = (file) => {
        const formData = new FormData();
        formData.append('body', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(apiUrl, formData, config)
    }

    return (
        <UploadImgContext.Provider
          value={{ getImgURL, addImg }}
        >
          {props.children}
        </UploadImgContext.Provider>
      );
}
