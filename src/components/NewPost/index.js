import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import NewPostContainer from "./NewPostContainer";
import { useDatabase } from "../../firebase/database";
import { useAuth } from "../../firebase/auth";

const NewPost = ({ setNewPost }) => {
  const { addNewPost } = useDatabase();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
    return () => {
      window.onscroll = function () {};
    };
  }, []);

  const handleClick = (e) => {
    e.target.id === "ExitPost" && setNewPost(false);
  };
  const textlRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await addNewPost(currentUser.uid,textlRef.current.value);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setNewPost(false);
  };

  return (
    <NewPostContainer id="ExitPost" onClick={handleClick}>
      <Card>
        <Card.Body>
          <h2>Create New Post</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="text">
              <Form.Control as="textarea" ref={textlRef} rows={3} />
            </Form.Group>
            <Button disabled={loading} type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </NewPostContainer>
  );
};

export default NewPost;
