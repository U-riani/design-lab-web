import React, { useState, useEffect } from "react";
import {
  FloatingLabel,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  isSameDay,
  isToday,
  setHours,
  setMinutes,
  addMinutes,
  isAfter,
} from "date-fns";
import {
  useBookVisitMutation,
  useGetBookedTimesQuery,
} from "../data/visitsSlice";

const VisitBookForm = () => {
  // const now  = new Date();

  // console.log(now)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitTime, setVisitTime] = useState(''); // Default time
  const [availableTimes, setAvailableTimes] = useState([]);

  const [bookVisit] = useBookVisitMutation();
  const { data: bookedTimes } = useGetBookedTimesQuery(
    format(visitDate, "yyyy-MM-dd")
  );

  // Generates times in the 11:00 AM to 7:00 PM range in 30-minute intervals
  const getAvailableTimes = () => {
    const times = [];
    let start = setHours(setMinutes(new Date(), 0), 11); // 11:00 AM
    const end = setHours(setMinutes(new Date(), 0), 19); // 7:00 PM

    while (start <= end) {
      times.push(format(start, "HH:mm"));
      start = addMinutes(start, 30); // Add 30-minute intervals
    }

    // If today is selected, only include future times
    if (isToday(visitDate)) {
      const now = new Date();
      return times.filter((time) =>
        isAfter(
          setHours(
            setMinutes(new Date(), time.split(":")[1]),
            time.split(":")[0]
          ),
          now
        )
      );
    }
    return times;
  };

  useEffect(() => {
    // Check if booked times are available
    if (bookedTimes) {
      const bookedForSelectedDate = bookedTimes
        .filter((entry) => isSameDay(new Date(entry.visitDate), visitDate))
        .map((entry) => format(new Date(entry.visitDate), "HH:mm"));

      const allAvailableTimes = getAvailableTimes();
      const filteredTimes = allAvailableTimes.filter(
        (time) => !bookedForSelectedDate.includes(time)
      );
      setAvailableTimes(filteredTimes);
    } else {
      setAvailableTimes(getAvailableTimes());
    }
  }, [bookedTimes, visitDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const visitDateTime = new Date(visitDate);

      const [hours, minutes] = visitTime.split(":").map(Number);
      visitDateTime.setHours(hours, minutes);

      const { data } = await bookVisit({
        name,
        email,
        phone,
        message,
        visitDate: visitDateTime.toISOString(),
      });

      if (data && data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error recording visit:", error);
      alert("Please select time");
    }
  };

  return (
    <Container className="visitor-book-component py-3 py-lg-5">
      <Row className="d-flex justify-content-center justify-content-lg-start">
        <Col md={6} className="form-info p-3 p-lg-5">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formName" label="Name" className="mb-3">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </FloatingLabel>

            <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formPhone"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FloatingLabel>

            <Row className="mb-3">
              <Col className="visit-date-col">
                <FloatingLabel label="Visit Date" controlId="formDate">
                  <DatePicker
                    selected={visitDate}
                    onChange={(date) => setVisitDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()} // Disable past dates
                    className="form-control"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                {/* <Form.Group controlId="formTime">
                  <Form.Label>Visit Time</Form.Label>
                  <select
                    value={visitTime && '--:--'}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="form-control"
                    required
                  >
                    {getAvailableTimes().map((time) => (
                      <option key={time} value={time} disabled={!availableTimes.includes(time)} className={`${!availableTimes.includes(time) ? 'booked-time' : ''}`}>
                        {time}
                      </option>
                    ))}
                  </select>
                </Form.Group> */}
                <FloatingLabel controlId="formTime" label="Visit Time">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="form-control"
                    required
                    value={visitTime}
                  >
                    <option>-- : --</option>
                    {getAvailableTimes().map((time) => (
                      <option
                        key={time}
                        value={availableTimes.includes(time) ? time : null}
                        disabled={!availableTimes.includes(time)}
                        className={`${
                          !availableTimes.includes(time) ? "booked-time" : ""
                        }`}
                      >
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Group controlId="formMessage" className="mb-3">
              {/* <Form.Label>Message</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Enter a message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="submit-button rounded-0 bg-black border-0 btn btn-lg">
              Record Visit
            </Button>
          </Form>
          <div className="contact-info-container p-4  mt-lg-0">
            <div className="contact-info-tel mb-3">
              <h5>Tel</h5>
              <p>+995 599 64 06 41</p>
            </div>
            <div className="contact-info-email mb-3">
              <h5>Email</h5>
              <p>info@design-lab-ge</p>
            </div>
            <div className="contact-info-address">
              <h5>address</h5>
              <p className="mb-0">Tbilisi, Georgia</p>
              <p className="mb-0">Ana Politkovskaia St 3/28</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VisitBookForm;
