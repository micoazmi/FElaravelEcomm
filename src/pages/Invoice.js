// src/components/Invoice.js
import React, { useState, useEffect } from "react";
import { Paper, Container, Box, Card, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/invoiceNew"
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/invoices/${id}`);
  };

  return (
    <Container size="sm" padding="md" mt={"lg"}>
      <Paper shadow="xl" padding="md" radius="md" withBorder>
        <Box px="lg" py="lg" m={"lg"}>
          {invoices.map((inv) => (
            <Card
              key={inv.id}
              shadow="sm"
              padding="lg"
              radius="md"
              mt={"lg"}
              withBorder
              onClick={() => handleCardClick(inv.id)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <Text>{inv.invoice_name}</Text>
              <Text mt="xs" color="dimmed" size="sm">
                Created At: {formatDate(inv.created_at)}
              </Text>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Invoice;
