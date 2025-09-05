import axiosInstance from "../axisInstance";

// **************************** EVENT MANAGEMENT **************************** //
// Create Event
export const createEvent = async (formData) => {
  const response = await axiosInstance.post("create-event", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Event
export const updateEvent = async (id, formData) => {
  const response = await axiosInstance.put(`update-event/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Event Status
export const updateEventStatus = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-event-status/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Event by ID
export const getEventById = async (id) => {
  const response = await axiosInstance.get(`get-event-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Events Details
export const getAllEventsList = async (formData) => {
  const response = await axiosInstance.post(
    `get-all-events-details`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await axiosInstance.put(`delete-event/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** EVENT TICKET MANAGEMENT **************************** //
// Create Event Ticket
export const createEventTicket = async (formData) => {
  const response = await axiosInstance.post("create-event-tickets", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Event Ticket
export const updateEventTicket = async (event_id, id, formData) => {
  const response = await axiosInstance.put(
    `update-event-tickets/${event_id}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Event Ticket by ID
export const getEventTicketById = async (id) => {
  const response = await axiosInstance.post(`get-event-ticket-detail/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Events Tickets Details
export const getAllEventsTicketList = async (formData) => {
  const response = await axiosInstance.post(`get-all-event-tickets`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Event Ticket
export const deleteEventTicket = async (id) => {
  const response = await axiosInstance.put(`delete-event-ticket/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
