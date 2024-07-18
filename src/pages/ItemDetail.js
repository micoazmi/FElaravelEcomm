import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Box,
  Button,
  NumberInput,
  Group,
} from "@mantine/core";
import api from "../api";
import Swal from "sweetalert2";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity, default to 1

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    };

    fetchItem();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!item) return; // Ensure item is fetched
    try {
      const { id } = item;
      const { data } = await api.post("/addToCart", {
        item_id: id,
        item_qty: quantity,
      });
      Swal.fire({
        title: "Success!",
        text: "Item has been added to the cart.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("Error", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error adding the item to the cart.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container size="sm" padding="md" style={{ padding: "2rem" }}>
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Box ml={"lg"} mr={"lg"} mt={"lg"} mb={"lg"}>
          <Title order={2} mb="md">
            {item.name}
          </Title>
          <Text size="lg" mb="md">
            {item.description}
          </Text>
          <Group position="apart" align="center" mb="md">
            <Text>Quantity:</Text>
            <Group align="center">
              <Button onClick={decrementQuantity}>-</Button>
              <NumberInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={item.quantity}
                style={{ width: "60px", textAlign: "center" }}
              />
              <Button onClick={incrementQuantity}>+</Button>
            </Group>
          </Group>
          <Text>Price per item: {rupiah(item.price)}</Text>
          <Button
            fullWidth
            color="green"
            variant="light"
            mt="md"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ItemDetail;
