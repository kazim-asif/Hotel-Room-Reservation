import React, { useContext, useState } from 'react';
import { Form, Button, Alert, Container, Col } from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';


const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState();
  const [type, setType] = useState('');
  const [availability, setAvailability] = useState(false);
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem('token');
  const {hotelId} = useContext(HotelNRoomContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validations
    if (!roomNumber || !type || !price || !capacity) {
        setError('Please fill in all the required fields');
        setSuccess(null);
        return;
      }
  

      if (roomNumber < 101) {
        setError('Room no. cannot be less than 101');
        setSuccess(null);
        return;
      }

      if (price < 20) {
        setError('Price cannot be less than 20$');
        setSuccess(null);
        return;
      }
  
      if (capacity < 1) {
        setError('Capacity cannot be less than 1');
        setSuccess(null);
        return;
      }



    try {
      const response = await fetch('http://localhost:3001/rooms/add-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          roomNumber,
          type,
          availability,
          price,
          capacity,
          amenities,
          hotelId,
        }),
      });

      
      if (response.ok) {
        setSuccess('Room added successfully');
        setRoomNumber('');
        setType('');
        setAvailability(false);
        setPrice('');
        setCapacity('');
        setAmenities([]);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSuccess(null);
      }
    } catch (error) {
      setError('Failed to add a room');
      setSuccess(null);
    }
  };

  return (
    <Container >
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <div>
          <h2>Add a Room</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="roomNumber">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="luxury">Luxury</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Check
                type="checkbox"
                label="Availability"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price in $</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
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
                label="TV"
                value="TV"
                checked={amenities.includes('TV')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, 'TV']);
                  } else {
                    setAmenities(amenities.filter((amenity) => amenity !== 'TV'));
                  }
                }}
              />
            </Form.Group>
            {/* <Form.Group controlId="hotelId">
              <Form.Label>Hotel ID</Form.Label>
              <Form.Control
                type="text"
                value={hotelId}
                onChange={(e) => setHotelId(e.target.value)}
                required
              />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Add Room
            </Button>
          </Form>
        </div>
      </Col>
    </Container>
  );
};

export { AddRoomForm } ;
