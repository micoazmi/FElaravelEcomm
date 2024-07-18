import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Group,
} from "@mantine/core";
import api from "../api";
import "@mantine/core/styles.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ItemForm = ({ fetchItems }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", { name, description, quantity, price });
      fetchItems();
      setName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      Swal.fire({
        title: "Success!",
        text: "Item has been added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error adding the item.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Paper shadow="md" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md" ml={"lg"} mt={"lg"}>
        Add New Item
      </Title>
      <form onSubmit={handleSubmit}>
        <Group grow ml={"lg"} mr={"lg"}>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextInput
            label="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Group>
        <TextInput
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          required
          mt="md"
          ml={"lg"}
          mr={"lg"}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          mt="md"
          ml={"lg"}
          mr={"lg"}
        />
        <Button type="submit" color="blue" mt="md" ml={"lg"} mb={"lg"}>
          Add Item
        </Button>
      </form>
    </Paper>
  );
};

export default ItemForm;
