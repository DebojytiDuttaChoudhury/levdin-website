/* =========================
   SUPABASE CONNECTION
========================= */

const supabaseUrl = "https://nreakvneqlmjsdcqwqnk.supabase.co";
const supabaseKey = "sb_publishable_KuU24INkn7yNftJ0pGoSVw_dZS9svQo";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* =========================
   BOOKING SYSTEM
========================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("bookings")
      .insert([{
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        project_type: document.getElementById("project_type").value,
        status: "New"
      }]);

    if (error) {
      alert("Booking failed");
      console.error(error);
    } else {
      alert("Appointment booked successfully!");
      window.location.href = "https://wa.me/917001064180";
    }
  });
}

/* =========================
   ADMIN LOGIN
========================= */

async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: document.getElementById("adminEmail").value,
    password: document.getElementById("adminPassword").value
  });

  if (error) {
    alert("Login failed");
  } else {
    loadBookings();
  }
}

async function loadBookings() {

  document.getElementById("loginSection").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  let html = "";

  data.forEach(row => {
    html += `
      <div class="admin-card" style="margin-bottom:20px;">
        <strong>${row.name}</strong><br>
        ${row.phone}<br>
        ${row.project_type}<br>
        Status: ${row.status}
      </div>
    `;
  });

  document.getElementById("bookings").innerHTML = html;
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

/* =========================
   SCROLL ANIMATION
========================= */

const faders = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  faders.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < triggerBottom){
      section.classList.add('show');
    }
  });
});
