import React, { useState, useEffect } from "react";
import { Table, Paper, Container, Grid, ActionIcon } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import api from "../api";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [totalAll, setTotalAll] = useState(0);

  useEffect(() => {
    console.log(orders);
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orderWithItem");
        setOrders(response.data.data); // Adjust according to your API response structure
        calculateTotal(response.data.data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total_price;
    });
    setTotalAll(total);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`);
        const updatedOrders = orders.filter((order) => order.id !== id);
        setOrders(updatedOrders);
        calculateTotal(updatedOrders);
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire("Error!", "There was an error deleting the order.", "error");
      }
    }
  };

  return (
    <Container size="sm" padding="md" mt="lg">
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Grid xs={12}>
          <Table striped mt={"lg"} m={"lg"}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Item number</th>
                <th style={{ textAlign: "center" }}>Item Name</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Total Price</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id}>
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td style={{ textAlign: "center" }}>{order.item.name}</td>
                  <td style={{ textAlign: "center" }}>{order.item_qty}</td>
                  <td style={{ textAlign: "center" }}>
                    {rupiah(order.item.price)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {rupiah(order.total_price)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDelete(order.id)}
                    >
                      <MdDelete size={20} />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} style={{ textAlign: "right" }}>
                  Total All
                </td>
                <td style={{ textAlign: "center" }}>{rupiah(totalAll)}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Order;
