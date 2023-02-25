import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>("");
  // This is the function that will be called when the button is clicked
  const handleGetMongoDoc = () => {
    console.log("get mongo doc");
    fetch("/api/get-mongo-doc") // This is the route we created in the previous step
      .then((response) => response.json())
      .then((data) => {
        const date = new Date(data.doc.content);
        console.log("Date:", date.toLocaleString());
        setData(date.toLocaleString());
      });
  };

  // This is the function that will be called when the button is clicked
  const handleUpdateMongoDoc = () => {
    console.log("update mongo doc");
    fetch("/api/update-mongo-doc")
      .then((response) => response.json())
      .then((data) => {
        const date = new Date(data.doc.value.content);
        console.log("Date: ", date.toLocaleString());
        setData(date.toLocaleString());
      });
  };

  return (
    <>
      <div>
        <div>
          <button onClick={handleGetMongoDoc}>Get Mongo Doc</button>
          <button onClick={handleUpdateMongoDoc}>Update Mongo Doc</button>
          <div>Data: {data}</div>
        </div>
      </div>
    </>
  );
}
