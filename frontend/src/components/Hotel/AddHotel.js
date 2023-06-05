import React, { useState } from 'react';
import { Form, Button, Alert, Container,Col } from 'react-bootstrap';

const AddHotelForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validations
    if (!name || !address || !contactInformation || !availableRoomTypes) {
      setError('Please fill in all the required fields');
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/hotels/add-hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          name,
          address,
          contactInformation,
          availableRoomTypes,
          amenities,
        }),
      });

      if (response.ok) {
        setSuccess('Hotel added successfully');
        setName('');
        setAddress('');
        setContactInformation('');
        setAvailableRoomTypes([]);
        setAmenities([]);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSuccess(null);
      }
    } catch (error) {
      setError('Failed to add a hotel');
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <div>
          <h2>Add a Hotel</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactInformation">
              <Form.Label>Contact Information (Mail)</Form.Label>
              <Form.Control
                type="email"
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="availableRoomTypes">
              <Form.Label>Available Room Types</Form.Label>
              <Form.Check
                type="checkbox"
                label="Standard"
                value="Standard"
                checked={availableRoomTypes.includes('Standard')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAvailableRoomTypes([...availableRoomTypes, 'Standard']);
                  } else {
                    setAvailableRoomTypes(availableRoomTypes.filter((art) => art !== 'Standard'));
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                label="Luxury"
                value="Luxury"
                checked={availableRoomTypes.includes('Luxury')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAvailableRoomTypes([...availableRoomTypes, 'Luxury']);
                  } else {
                    setAvailableRoomTypes(availableRoomTypes.filter((art) => art !== 'Luxury'));
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                label="Premium"
                value="Premium"
                checked={availableRoomTypes.includes('Premium')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAvailableRoomTypes([...availableRoomTypes, 'Premium']);
                  } else {
                    setAvailableRoomTypes(availableRoomTypes.filter((art) => art !== 'Premium'));
                  }
                }}
              />

            </Form.Group>
            <Form.Group controlId="amenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Check
                type="checkbox"
                label="WiFi"
                value="WiFi"
                checked={amenities.includes('WiFi')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'WiFi']);
                  } else {
                    setAmenities(amenities.filter((amenity) => amenity !== 'WiFi'));
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                label="Daily Cleaning"
                value="Daily Cleaning"
                checked={amenities.includes('Daily Cleaning')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'Daily Cleaning']);
                  } else {
                    setAmenities(amenities.filter((amenity) => amenity !== 'Daily Cleaning'));
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                label="Swimming Pool"
                value="Swimming Pool"
                checked={amenities.includes('Swimming Pool')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'Swimming Pool']);
                  } else {
                    setAmenities(amenities.filter((amenity) => amenity !== 'Swimming Pool'));
                  }
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Hotel
            </Button>
          </Form>
        </div>
      </Col>
    </Container>

  );
};

export { AddHotelForm };
