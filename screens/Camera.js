import React,{useState,useEffect} from 'react'
import {Text,Button,View,StyleSheet,Platform,Image, Alert} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permission from "expo-permissions"
import { render } from 'react-dom'

const PickImage=()=>{
const [image,setImage] = useState(null)
const [finalOutput,setfinalOutput] = useState([])

return(
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
      </View>
   
)


getPermissionAsync=async()=>{

    if(Platform.OS!=="web"){
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status!=="granted"){
        alert("Sorry we need camera permission")
    }
    }
}

useEffect(()=>{
    this.getPermissionAsync()
})

uploadImage=async(uri)=>{
    const data = new FormData()
    var file_name = uri.split("/")[uri.split("/").length-1]
    var type = `image/${uri.split('.')[uri.split("/").length-1]}`
    const file_upload = {
        uri:uri,
        name:file_name,
        type:type


}

    data.append("digit",file_upload)
    fetch ("",{
        method:"POST",
        body:data,
        headers:{
            "content-type":"multipart/form-data"
        }

        .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
    })

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.data });
            console.log(result.uri)
            this.uploadImage(result.uri);
          }
        } catch (E) {
          console.log(E);
        }
      };



}

}

export default PickImage

