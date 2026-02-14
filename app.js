/* =========================
   SAFE SUPABASE INIT
========================= */

let supabase = null;

if (window.supabase) {
  const supabaseUrl = "https://nreakvneqlmjsdcqwqnk.supabase.co";
  const supabaseKey = "sb_publishable_KuU24INkn7yNftJ0pGoSVw_dZS9svQo";

  supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );
}

/* =========================
   BOOKING SYSTEM
========================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm && supabase) {
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
  if (!supabase) return;

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
  if (!supabase) return;

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
  if (!supabase) return;
  await supabase.auth.signOut();
  location.reload();
}

/* =========================
   SMOOTH SCROLL ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const faders = document.querySelectorAll(".fade-up");

  if (!faders.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  faders.forEach(el => observer.observe(el));

});
