/**
 * main function
 * @description function of action performed when submit button clicked
 *
 **/
export const handleSubmit = (event) => {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  if (Client.checkURL(formText)) {
    // check what text was put into the form field
    console.log("::: Data Posted :::");
    console.log("::: Form Submitted :::");
    postData("http:localhost:8081/sentiment", { url: formText });
  } else {
    alert("Invalid URL. Please try again.");
  }
};

/**
 *async POST method
 *
 **/
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    document.getElementById("url").innerHTML = `URL: ${newData.url}`;
    document.getElementById("text").innerHTML = `TEXT: ${newData.text}`;
    document.getElementById(
      "polarity"
    ).innerHTML = `POLARITY: ${newData.polarity}`;
    document.getElementById(
      "subjectivity"
    ).innerHTML = `SUBJECTIVITY: ${newData.subjectivity}`;
    document.getElementById(
      "polarity_confidence"
    ).innerHTML = `POLARITY_CONFIDENCE: ${newData.polarity_confidence}`;
    return newData;
  } catch (error) {
    console.log(error);
  }
};
