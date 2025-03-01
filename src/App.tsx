import React from "react";
import { Box, Text, Button, Flex, Spacer, Heading, VStack, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { S } from "framer-motion/dist/types.d-6pKw1mTI";

const MotionBox = motion(Box);

const sections = [
  { id: "about", title: "About Us", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet..." },
  { id: "services", title: "Our Services", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { id: "contact", title: "Contact Us", content: "Reach out to us at contact@example.com for more information." },
];

function App() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box bg="linear-gradient(to right, #ffafbd, #ffc3a0)" minHeight="100vh">
      {/* Navbar */}
      <Box as="nav" bg="rgba(255, 255, 255, 0.7)" p={4} position="fixed" width="100%" zIndex={10}>
        <Flex>
          <Heading color="pink.600" size="lg">HenHacks 2025</Heading>
          <Spacer />
        </Flex>
      </Box>

      {/* Main Section */}
      <Box textAlign="center" pt={20} pb={10} minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Heading size="2xl" color="pink.600" mb={4}>Welcome to Food...</Heading>
        <Text fontSize="xl" color="gray.700" mb={6}>We bring you all the pastel vibes you need.</Text>
      </Box>

      {/* Animated Sections */}
      {sections.map((section, index) => (
        <MotionBox
          key={section.id}
          id={section.id}
          p={10}
          bg={index % 2 === 0 ? "white" : "gray.100"}
          textAlign="center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Container maxW="container.md">
            <Heading color="pink.600" mb={4}>{section.title}</Heading>
            <Text fontSize="lg" color="gray.700">{section.content}</Text>
          </Container>
        </MotionBox>
      ))}

      {/* Footer */}
      <Box bg="rgba(255, 255, 255, 0.8)" p={4} textAlign="center">
        <Text color="gray.600">Created by | All Rights Reserved</Text>
      </Box>
    </Box>
  );
}

export default App;
