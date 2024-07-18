import React, { useState, useEffect } from "react";
import { Container, Paper, Box } from "@mantine/core";
import ItemForm from "../components/ItemForm";
import api from "../api";
import "@mantine/core/styles.css";

const Add = () => {
  const [, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await api.get("/items");
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Container size="sm" padding="md" style={{ padding: "2rem" }}>
        <Paper shadow="xl" padding="md" radius="md" withBorder>
          <Box mb="md" mt="lg" ml="lg" mr="lg">
            <ItemForm mb="md" fetchItems={fetchItems} />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Add;
