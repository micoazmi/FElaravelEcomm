import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Card, Text, Button, Group, Grid } from "@mantine/core";
import Swal from "sweetalert2";

const ItemList = ({ items, fetchItems }) => {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
      Swal.fire({
        title: "Success!",
        text: "Item has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the item.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Grid gutter="lg">
      {items.length > 0 ? (
        items.map((item) => (
          <Grid.Col span={4} key={item.id}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              mb="sm"
              style={{
                cursor: "pointer",
                transition: "background-color 0.5s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <Group position="apart" mb="xs">
                <Text weight={500}>
                  <Link
                    to={`/item/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.name}
                  </Link>
                </Text>
                <Group>
                  <Button
                    component={Link}
                    to={`/update/${item.id}`}
                    variant="outline"
                    color="blue"
                    size="xs"
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              </Group>
              <Text size="sm">Description: {item.description}</Text>
              <Text size="sm">Stock: {item.quantity}</Text>
              <Text size="sm">Price: {rupiah(item.price)}</Text>
            </Card>
          </Grid.Col>
        ))
      ) : (
        <Text>No items found.</Text>
      )}
    </Grid>
  );
};

export default ItemList;
