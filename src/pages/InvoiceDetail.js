// src/components/InvoiceDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, Container, Box, Text, Title } from "@mantine/core";
import axios from "axios";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString();
};

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/invoices/${id}`
        );
        const invoiceData = response.data;

        // Calculate the total price from each order
        const totalPrice = invoiceData.orders.reduce((sum, order) => {
          return sum + order.total_price;
        }, 0);

        // Update the invoice data with the calculated total price
        setInvoice({ ...invoiceData, total_price: totalPrice });
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <Container size="sm" padding="md" mt={"lg"}>
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Box px="lg" py="lg">
          <Title order={2}>{invoice.invoice_name}</Title>
          <Text>Total Price: {rupiah(invoice.total_price)}</Text>
          <Text>Created At: {formatDate(invoice.created_at)}</Text>
          <Box mt="lg">
            {invoice.orders.map((order) => (
              <Paper
                key={order.id}
                shadow="xs"
                padding="md"
                radius="md"
                withBorder
                mb="sm"
              >
                <Text>
                  <strong>Item Name:</strong> {order.item.name}
                </Text>
                <Text>
                  <strong>Item Description:</strong> {order.item.description}
                </Text>
                <Text>
                  <strong>Item Price:</strong> {rupiah(order.item.price)}
                </Text>
                <Text>
                  <strong>Quantity:</strong> {order.item_qty}
                </Text>
                <Text>
                  <strong>Total Price:</strong> {rupiah(order.total_price)}
                </Text>
              </Paper>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvoiceDetail;
