import ImageCropPicker from 'react-native-image-crop-picker';

export async function openPicker() {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    if (image) {
      return image;
    }
  } catch (e) {}
}

export async function openCamera() {
  try {
    const image = await ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });

    if (image) {
      return image;
    }
  } catch (e) {}
}
