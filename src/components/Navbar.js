// src/components/Navbar.js
import React from "react";
import { Box, Group, Text, Container, Button } from "@mantine/core";
import {
  IconHome,
  IconBox,
  IconShoppingCart,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box
        sx={{ backgroundColor: "#ff5722", color: "#fff", padding: "0.5rem 0" }}
      >
        <Container size="lg">
          <Group position="apart" align="center">
            <Text weight={700} size="xl">
              Shipee Dashboard
            </Text>
            <Group spacing="lg">
              <Button variant="subtle" component={Link} to={"/"}>
                <IconHome size={20} />
                Home
              </Button>
              <Button variant="subtle" component={Link} to={"/add"}>
                <IconBox size={20} />
                Products
              </Button>
              <Button variant="subtle" component={Link} to={"/order"}>
                <IconShoppingCart size={20} />
                Orders
              </Button>
              <Button variant="subtle">
                <IconUsers size={20} />
                Users
              </Button>
              <Button variant="subtle">
                <IconSettings size={20} />
                Settings
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
