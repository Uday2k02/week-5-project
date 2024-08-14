// dummy data for doctors and appointments
const doctors = [
    { id: 1, name: "Dr. Smith", availableHours: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { id: 2, name: "Dr. Johnson", availableHours: ["9:30 AM", "11:30 AM", "1:30 PM", "3:30 PM"] },
    { id: 3, name: "Dr. Lee", availableHours: ["10:30 AM", "12:30 PM", "2:30 PM", "4:30 PM"] }
];

const appointments = [];

// generate doctor options
const doctorSelect = document.getElementById("doctor-select");
doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.text = doctor.name;
    doctorSelect.appendChild(option);
});

// generate time slot options
const appointmentTimeSelect = document.getElementById("appointment-time");
doctors.forEach((doctor) => {
    doctor.availableHours.forEach((hour) => {
        const option = document.createElement("option");
        option.value = hour;
        option.text = hour;
        appointmentTimeSelect.appendChild(option);
    });
});

// book appointment
document.getElementById("book-appointment").addEventListener("click", (e) => {
    e.preventDefault();
    const patientName = document.getElementById("patient-name").value;
    const doctorId = document.getElementById("doctor-select").value;
    const appointmentDate = document.getElementById("appointment-date").value;
    const appointmentTime = document.getElementById("appointment-time").value;

    if (!patientName || !doctorId || !appointmentDate || !appointmentTime) {
        alert("Please fill out all fields");
        return;
    }

    const doctor = doctors.find((doctor) => doctor.id === parseInt(doctorId));
    if (!doctor.availableHours.includes(appointmentTime)) {
        alert("Time slot not available");
        return;
    }

    const appointment = {
        id: appointments.length + 1,
        patientName,
        doctorName: doctor.name,
        appointmentDate,
        appointmentTime
    };
    appointments.push(appointment);
    updateAppointmentList();
    updateDoctorAvailability(doctorId, appointmentTime);
});

// cancel appointment
document.getElementById("cancel-appointment").addEventListener("click", (e) => {
    e.preventDefault();
    const appointmentId = document.getElementById("appointment-id").value;

    if (!appointmentId) {
        alert("Please enter appointment ID");
        return;
    }

    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === parseInt(appointmentId));
    if (appointmentIndex === -1) {
        alert("Appointment not found");
        return;
    }

    appointments.splice(appointmentIndex, 1);
    updateAppointmentList();
    updateDoctorAvailability(appointments[appointmentIndex].doctorId, appointments[appointmentIndex].appointmentTime);
});

// view appointments
document.getElementById("view-appointments").addEventListener("click", () => {
    updateAppointmentList();
});

// update appointment list
function updateAppointmentList() {
    const appointmentList = document.getElementById("appointment-list");
    appointmentList.innerHTML = "";
    appointments.forEach((appointment) => {
        const listItem = document.createElement("div");
        listItem.className = "appointment-list-item";
        listItem.textContent = `Appointment ID: ${appointment.id}, Patient Name: ${appointment.patientName}, Doctor Name: ${appointment.doctorName}, Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`;
        appointmentList.appendChild(listItem);
    });
}

// update doctor availability
function updateDoctorAvailability(doctorId, appointmentTime) {
    const doctor = doctors.find((doctor) => doctor.id === parseInt(doctorId));
    const doctorCard = document.getElementById(`doctor-${doctorId}`);
    const availableSlots = doctor.availableHours.filter((hour) => hour !== appointmentTime);
    const bookedSlots = doctor.availableHours.filter((hour) => hour === appointmentTime);

    doctorCard.innerHTML = "";
    availableSlots.forEach((slot) => {
        const slotElement = document.createElement("div");
        slotElement.className = "available-slot";
        slotElement.textContent = slot;
        doctorCard.appendChild(slotElement);
    });
    bookedSlots.forEach((slot) => {
        const slotElement = document.createElement("div");
        slotElement.className = "booked-slot";
        slotElement.textContent = slot;
        doctorCard.appendChild(slotElement);
    });
}

// display doctor information
doctors.forEach((doctor) => {
    const doctorCard = document.createElement("div");
    doctorCard.className = "doctor-card";
    doctorCard.id = `doctor-${doctor.id}`;
    doctorCard.innerHTML = `
        <h3>${doctor.name}</h3>
        <p>Total Time Slots: ${doctor.availableHours.length}</p>
        <p>Available Time Slots:</p>
        <ul id="available-slots-${doctor.id}"></ul>
    `;
    document.getElementById("doctors-list").appendChild(doctorCard);

    const availableSlotsList = document.getElementById(`available-slots-${doctor.id}`);
    doctor.availableHours.forEach((hour) => {
        const slotElement = document.createElement("li");
        slotElement.textContent = hour;
        availableSlotsList.appendChild(slotElement);
    });
});

// update doctor availability
function updateDoctorAvailability(doctorId, appointmentTime) {
    const doctor = doctors.find((doctor) => doctor.id === parseInt(doctorId));
    const doctorCard = document.getElementById(`doctor-${doctorId}`);
    const availableSlotsList = document.getElementById(`available-slots-${doctorId}`);
    const bookedSlotsList = document.getElementById(`booked-slots-${doctorId}`);

    availableSlotsList.innerHTML = "";
    bookedSlotsList.innerHTML = "";

    doctor.availableHours.forEach((hour) => {
        if (hour !== appointmentTime) {
            const slotElement = document.createElement("li");
            slotElement.textContent = hour;
            availableSlotsList.appendChild(slotElement);
        } else {
            const slotElement = document.createElement("li");
            slotElement.textContent = hour;
            bookedSlotsList.appendChild(slotElement);
        }
    });
}

// update appointment list
function updateAppointmentList() {
    const appointmentList = document.getElementById("appointment-list");
    appointmentList.innerHTML = "";
    appointments.forEach((appointment) => {
        const listItem = document.createElement("div");
        listItem.className = "appointment-list-item";
        listItem.textContent = `Appointment ID: ${appointment.id}, Patient Name: ${appointment.patientName}, Doctor Name: ${appointment.doctorName}, Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`;
        appointmentList.appendChild(listItem);
    });
}