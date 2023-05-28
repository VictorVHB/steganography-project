function checkload(img) {
    if ( img === null) {
            alert("Image has not been loaded");
            return; }}
            
    fileInput1 = document.getElementById("fileInput1");
    fileInput2 = document.getElementById("fileInput2");
    var Image_to_hide = null;
    var Displayed_image = null;
    var working_image_to_hide = null;
    var working_displayed_image = null;
    
    
          function draw_first_Image() {
    
    Image_to_hide = fileInput1.files[0];
    
      checkload(Image_to_hide)
    
      var reader = new FileReader();
    
      reader.onload = () => {
    
        var dataURL = reader.result;
    
        var img = new Image();
        img.src = dataURL;
    
        img.onload = () => {
          let canvas = document.getElementById("Image_to_hide");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 1300, 480);
        }
      };
      
      reader.readAsDataURL(Image_to_hide);
    }
    
    function draw_displayed_image() {
    
        Displayed_image = fileInput2.files[0];
        checkload(Displayed_image)
      
      var reader = new FileReader();
    
      reader.onload = () => {
    
        var dataURL = reader.result;
     
        var img = new Image();
        img.src = dataURL;
    
        img.onload = () => {
          let canvas = document.getElementById("Displayed_image");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 1300, 480);
        }
      };
      
      reader.readAsDataURL(Displayed_image);
    }
    
    function applySteganography() {
      if (Image_to_hide === null) {
        alert("First image has not been loaded");
        return;
      } else if (Displayed_image === null) {
        alert("Second image has not been loaded");
        return;
      }
    
      working_image_to_hide = fileInput1.files[0];
      working_displayed_image = fileInput2.files[0];
    
      const canvas_element1 = document.getElementById('Image_to_hide');
      const ctx1 = canvas_element1.getContext('2d');
      const img1 = new Image();
    
      img1.src = URL.createObjectURL(working_image_to_hide);
    
      img1.onload = () => {
        ctx1.drawImage(img1, 0, 0, 1300, 480);
    
        const imageData1 = ctx1.getImageData(0, 0, canvas_element1.width, canvas_element1.height);
        const data1 = imageData1.data;
    
        const canvas_element2 = document.getElementById('Displayed_image');
        const ctx2 = canvas_element2.getContext('2d');
        const img2 = new Image();
    
        img2.src = URL.createObjectURL(working_displayed_image);
    
        img2.onload = () => {
          ctx2.drawImage(img2, 0, 0, 1300, 480);
    
          const imageData2 = ctx2.getImageData(0, 0, canvas_element2.width, canvas_element2.height);
          const data2 = imageData2.data;
    
          for (let i = 0; i < data2.length; i += 4) {
            // Extract the color values of the pixels
            let hideRed = data1[i];
            let hideGreen = data1[i + 1];
            let hideBlue = data1[i + 2];
    
            let modifyRed = data2[i];
            let modifyGreen = data2[i + 1];
            let modifyBlue = data2[i + 2];
    
            // Apply the steganography logic to the color values
            let combinedRed = Math.floor(hideRed / 16) * 16 + Math.floor(modifyRed / 16);
            let combinedGreen = Math.floor(hideGreen / 16) * 16 + Math.floor(modifyGreen / 16);
            let combinedBlue = Math.floor(hideBlue / 16) * 16 + Math.floor(modifyBlue / 16);
    
            // Update the modified image pixel with the combined color values
            data2[i] = combinedRed;
            data2[i + 1] = combinedGreen;
            data2[i + 2] = combinedBlue;
          }
    
          const canvas_element3 = document.getElementById('Encrypted_image');
          const ctx3 = canvas_element3.getContext('2d');
    
          // Set the canvas size
          canvas_element3.width = canvas_element2.width;
          canvas_element3.height = canvas_element2.height;
    
          // Create a new ImageData object with the modified pixel data
          const mergedImageData = new ImageData(data2, canvas_element2.width, canvas_element2.height);
    
          // Draw the merged image on the new canvas
          ctx3.putImageData(mergedImageData, 0, 0);
    
         /*  // Convert the canvas image to data URL
          canvas_element3.toBlob(function(blob) {
            const reader = new FileReader();
    
            reader.onloadend = function() {
              // Read the data URL result
              const encryptedDataURL = reader.result;
    
              // Create an image element to display the encrypted image
              const encryptedImg = document.createElement('img');
              encryptedImg.src = encryptedDataURL;
    
              // Append the image to the document or do any other desired operation
              document.body.appendChild(encryptedImg);
            };
    
            // Read the data URL from the canvas blob
            reader.readAsDataURL(blob);
          }); */
        };
      };
    }

    function decode() {
      const canvas_element = document.getElementById('Displayed_image');
      const ctx = canvas_element.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
    
      // Loop through the pixel data
      for (let i = 0; i < data.length; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];
    
        // Apply your decoding logic here to extract the hidden information
        // and modify the red, green, blue values accordingly
    
        // Example: Reconstruct the original values by masking out the least significant bits
        red = red & 0xf0;
        green = green & 0xf0;
        blue = blue & 0xf0;
    
        // Update the pixel data with the modified values
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
      }
    
      // Create a new canvas element for displaying the decoded image
      const decoded_canvas_element = document.createElement('canvas');
      const decoded_ctx = decoded_canvas_element.getContext('2d');
    
      // Set the canvas size
      decoded_canvas_element.width = canvas_element.width;
      decoded_canvas_element.height = canvas_element.height;
    
      // Create a new ImageData object with the modified pixel data
      const decoded_image_data = new ImageData(data, canvas_element.width, canvas_element.height);
    
      // Draw the decoded image on the new canvas
      decoded_ctx.putImageData(decoded_image_data, 0, 0);
    
      // Append the decoded canvas to the document or perform any desired operation
      document.body.appendChild(decoded_canvas_element);
    }
    