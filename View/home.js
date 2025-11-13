function home() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>The World Oasis API</title>

  <style>
    body {
      margin: 0;
      background: #0d1117;
      color: #e6edf3;
      font-family: system-ui, sans-serif;
    }

    .mg-bn{

    margin:15px;
    
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    h1, h2, h3 { margin: 0 0 12px 0; }
    p { margin: 0 0 10px 0; line-height: 1.6; }

    .card {
      background: #161b22;
      padding: 20px;
      margin-bottom: 22px;
      border-radius: 12px;
      border: 1px solid #21262d;
    }

    a.button {
      display: inline-block;
      padding: 10px 18px;
      background: #238636;
      color: white;
      border-radius: 8px;
      text-decoration: none;
      margin-right: 8px;
      margin-top: 12px;
      font-weight: 600;
       border-radius: 20px;
    }

    a.button.secondary {
      background: #30363d;
    }
     

    ul { margin: 0; padding-left: 18px; }
  </style>
</head>

<body>
  <div class="container">

    <!-- HEADER -->
    <div class="card">
      <h1>🌍 The World Oasis API</h1>
      <p>Full-stack cabin booking & management system with role-based access, smart booking engine, and admin analytics.</p>


      <a class="button" href="https://documenter.getpostman.com/view/28952830/2sB3WvMJ4J" target="_blank">📘 API Docs</a>

    </div>

    <!-- WHAT APP PROVIDES -->
    <div class="card">
      <h2>🚀 What This App Provides</h2>
      <ul>
        <li>🔑 Secure authentication & sessions</li>
        <li>🛂 Role system: User, Admin, Super Admin</li>
        <li>🏠 Cabin management with pricing & capacity</li>
        <li>📅 Smart booking engine with validations</li>
        <li>👤 User self-service account controls</li>
        <li>📊 Server-side admin dashboard analytics</li>
        <li>⚙️ Adjustable system settings</li>
      </ul>
    </div>

    <!-- HOW TO USE -->
    <div class="card">
      <h2>🧭 How to Use</h2>

      <div class="mg-bn">
        <h3>👤 Users</h3>
        <ul>
            <li>📝 Sign up / Sign in</li>
            <li>🔍 Browse cabins</li>
            <li>📅 Create bookings</li>
            <li>📂 Manage bookings via My Bookings</li>
            <li>✏️ Update profile & password</li>
        </ul>
      </div>

      <div class="mg-bn">
        <h3>🛠️ Admin</h3>
        <ul>
            <li>👥 Manage bookings</li>
            <li>✔️ Check-in / Check-out</li>
            <li>📊 Access dashboard analytics</li>
            <li>🏠 Maintain cabin data</li>
        </ul>
      </div>

      <div class="mg-bn">
        <h3>🏆 Super Admin</h3>
        <ul>
            <li>⚙️ Global system settings</li>
            <li>👥 Users & roles management</li>
            <li>🏠 Full cabin control</li>
            <li>📊 Complete insight access</li>
        </ul>
      </div>
    </div>

    <!-- KEY FEATURES -->
    <div class="card">
      <h2>✨ Key Features</h2>
      <ul>
        <li>🔒 Role-based access control</li>
        <li>🏘️ Cabin CRUD with images, discounts & pricing</li>
        <li>📅 Booking engine: conflict-free, validated, capacity-aware</li>
        <li>💰 Automatic pricing & totals</li>
        <li>📊 One-call dashboard metrics (facet pipeline)</li>
        <li>⚙️ System settings: min/max nights, breakfast price</li>
        <li>👤 User profile & password management</li>
      </ul>
    </div>

    <!-- SPECIAL FACTS -->
    <div class="card">
      <h2>🧠 Special Facts</h2>
      <ul>
        <li>🔐 User & Admin booking routes fully isolated</li>
        <li>🕵️ 404 masking for unauthorized resource access</li>
        <li>🚀 Aggregated insights in a single request</li>
        <li>🖼️ Cloudinary integration for images</li>
        <li>📦 Clean, modular REST API structure</li>
      </ul>
    </div>

    <!-- SUMMARY -->
    <div class="card">
      <h2>🎉 In Summary</h2>
      <p>
        A modern, secure, scalable booking platform with strong business logic,
        smooth user experience, powerful admin tools, and real-time analytics.
      </p>
    </div>

    <footer style="text-align:center; margin-top:20px; color:#8b949e;">
      © The World Oasis — API & Platform
    </footer>
  </div>
</body>
</html>
`;
}

module.exports = home;
