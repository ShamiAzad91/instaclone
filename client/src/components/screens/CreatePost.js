import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("http://localhost:8000/api/createpost", {
        method: "post",
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "created post successfully",
              classes: "#388e3c green darken-2",
            });
            navigate("/");

          }
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "igram-91");
    data.append("cloud_name", process.env.CLOUD_NAME);
    fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // alert("post is created wait few second:)")
        setUrl(data.url);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-field"
      style={{
        maxWidth: "550px",
        margin: "30px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #0d47a1 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={postDetails}
        className="btn waves-effect waves-light #0d47a1 blue darken-1"
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
