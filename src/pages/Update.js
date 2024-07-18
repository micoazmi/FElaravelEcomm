import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const response = await api.get(`/items/${id}`);
      setName(response.data.name);
      setDescription(response.data.description);
      setQuantity(response.data.quantity);
      setPrice(response.data.price);
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/items/${id}`, {
        name,
        description,
        quantity,
        price,
      });
      Swal.fire({
        title: "Success!",
        text: "Item has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the item.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container size="sm" padding="md" mt={"lg"}>
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Title my="md" align="center">
          Update Item
        </Title>
        <form onSubmit={handleUpdate}>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb="md"
            ml={"lg"}
            mr={"lg"}
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb="md"
            ml={"lg"}
            mr={"lg"}
          />
          <TextInput
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            mb="md"
            ml={"lg"}
            mr={"lg"}
          />
          <TextInput
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            mb="md"
            ml={"lg"}
            mr={"lg"}
          />
          <Button type="submit" color="blue" ml={"lg"} mr={"lg"} mb={"lg"}>
            Update Item
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateItem;
