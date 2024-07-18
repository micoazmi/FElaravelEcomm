import React, { useState, useEffect } from "react";
import { Container, Paper, Box } from "@mantine/core";
import ItemList from "../components/ItemList";
import api from "../api";

const Homepage = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await api.get("/items");
    setItems(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container size="sm" padding="md" mt={"lg"}>
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Box px="lg" py="lg">
          <ItemList items={items} fetchItems={fetchItems} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Homepage;
