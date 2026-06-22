import re

with open('/home/essimbi/.gemini/antigravity/brain/a75f17f6-9031-474a-b704-a6cc4ef17a9d/apps_script_wila.js', 'r') as f:
    content = f.read()

start_pattern = "const htmlBody = `"
end_pattern = "    `;\n\n    // Le paramètre \"htmlBody\""

start_idx = content.find(start_pattern)
end_idx = content.find(end_pattern)

new_html_body = """const htmlBody = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>WILA Awards — Billet de participation</title>
<style>
  :root{
    --navy-deep:   #0a1224;
    --navy-mid:    #131f3a;
    --gold:        #e8c989;
    --gold-light:  #f5e3b3;
    --cream:       #f4ead0;
    --red-deep:    #7a1f1f;
    --red-mid:     #a8312f;
    --red-light:   #c9544a;
    --wood:        #3a2a1c;
  }

  *{ box-sizing:border-box; margin:0; padding:0; }

  body{
    background:#05070d;
    display:flex;
    justify-content:center;
    align-items:flex-start;
    padding:40px 20px;
    font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
  }

  .ticket{
    position:relative;
    width:540px;
    aspect-ratio: 780 / 1169;
    border-radius:18px;
    overflow:hidden;
    background:
      radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.05), transparent 40%),
      linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-mid) 45%, var(--navy-deep) 100%);
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    color:#fff;
  }

  /* ---------- Starfield ---------- */
  .stars{
    position:absolute; inset:0;
    background-image:
      radial-gradient(1px 1px at 10% 8%,  #fff, transparent),
      radial-gradient(1px 1px at 25% 14%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 40% 5%, #fff, transparent),
      radial-gradient(1px 1px at 60% 10%, #fff, transparent),
      radial-gradient(1px 1px at 75% 4%,  #fff, transparent),
      radial-gradient(1.5px 1.5px at 88% 12%, #fff, transparent),
      radial-gradient(1px 1px at 15% 22%, #fff, transparent),
      radial-gradient(1px 1px at 50% 18%, #fff, transparent),
      radial-gradient(1px 1px at 95% 20%, #fff, transparent),
      radial-gradient(2px 2px at 32% 9%, var(--gold-light), transparent);
    opacity:0.9;
    pointer-events:none;
  }

  /* Shooting star streak top-left, like the source image */
  .shooting-star{
    position:absolute;
    top:-10px; left:-40px;
    width:260px; height:260px;
    background: linear-gradient(135deg, rgba(232,201,137,0.9) 0%, rgba(232,201,137,0.5) 8%, transparent 45%);
    transform: rotate(-20deg);
    pointer-events:none;
    filter: blur(0.3px);
  }

  /* Soft cloud / nebula glow */
  .nebula{
    position:absolute; inset:0;
    background:
      radial-gradient(circle at 30% 35%, rgba(120,140,180,0.18), transparent 55%),
      radial-gradient(circle at 70% 30%, rgba(90,110,150,0.12), transparent 50%);
    pointer-events:none;
  }

  /* ---------- Content layout ---------- */
  .content{
    position:relative;
    z-index:2;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:38px 34px 0;
    text-align:center;
  }

  .logo-mark{
    width:46px;
    margin-bottom:6px;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
  }

  .brand{
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight:700;
    font-size:46px;
    letter-spacing:10px;
    background: linear-gradient(180deg, var(--gold-light) 0%, var(--gold) 55%, #b8923f 100%);
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
    line-height:1;
  }

  .brand-sub{
    font-family: 'Poppins', sans-serif;
    font-weight:300;
    font-size:22px;
    letter-spacing:6px;
    color: var(--gold-light);
    margin-top:2px;
    margin-bottom:22px;
  }

  .title{
    font-family: 'Playfair Display', Georgia, serif;
    font-weight:800;
    font-size:38px;
    line-height:1.15;
    letter-spacing:1px;
    background: linear-gradient(180deg, var(--gold-light), var(--gold));
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
    margin-bottom:26px;
    text-shadow: 0 4px 18px rgba(0,0,0,0.25);
  }

  .details{
    width:100%;
    max-width:430px;
    font-size:17px;
    line-height:1.9;
    margin-bottom:18px;
  }

  .details .row{ margin-bottom:2px; }
  .details .label{
    color: var(--gold-light);
    font-weight:600;
  }
  .details .value{
    color:#f5f5f5;
    font-weight:500;
  }

  .theme{
    width:100%;
    max-width:430px;
    font-size:15px;
    line-height:1.7;
    color: var(--gold);
    font-weight:600;
    margin-bottom:10px;
  }
  .theme .label{ color: var(--gold-light); font-weight:700; }

  /* ---------- Satin ribbon (SVG) ---------- */
  .ribbon{
    position:absolute;
    left:0;
    right:0;
    bottom:90px;
    height:260px;
    z-index:1;
    pointer-events:none;
  }
  .ribbon svg{ width:100%; height:100%; display:block; }

  /* ---------- Footer: ticket number + QR ---------- */
  .footer{
    position:absolute;
    left:0; right:0; bottom:0;
    height:150px;
    z-index:3;
    background: linear-gradient(180deg, transparent 0%, rgba(20,14,10,0.0) 10%, var(--wood) 38%);
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    padding:0 28px 26px;
  }

  .ticket-number{
    font-family:'Poppins', sans-serif;
    font-weight:700;
    font-size:30px;
    letter-spacing:2px;
    color:#fff;
    writing-mode: vertical-rl;
    text-orientation: upright;
    transform: rotate(180deg);
  }

  .qr-box{
    width:118px;
    height:118px;
    background:#fff;
    border-radius:4px;
    padding:6px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.4);
  }
  .qr-box img{
    width:100%;
    height:100%;
    display:block;
    image-rendering: pixelated;
  }

  @media (max-width: 560px){
    .ticket{ width:92vw; }
    .brand{ font-size:38px; letter-spacing:8px; }
    .title{ font-size:30px; }
    .details{ font-size:15px; }
  }
</style>
</head>
<body>

<div class="ticket">
  <div class="stars"></div>
  <div class="nebula"></div>
  <div class="shooting-star"></div>

  <div class="content">
    <!-- Logo (étoile dorée stylisée) -->
    <svg class="logo-mark" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5e3b3"/>
          <stop offset="100%" stop-color="#b8923f"/>
        </linearGradient>
      </defs>
      <path d="M50 0 C52 18 58 28 78 32 C58 36 52 46 50 64 C48 46 42 36 22 32 C42 28 48 18 50 0 Z" fill="url(#goldGrad)"/>
    </svg>

    <div class="brand">WILA</div>
    <div class="brand-sub">Awards</div>

    <div class="title">BILLET DE<br>PARTICIPATION</div>

    <div class="details">
      <div class="row"><span class="label">Ticket:</span> <span class="value">${data.prenom} ${data.nom}</span></div>
      <div class="row"><span class="label">Date:</span> <span class="value">Vendredi 3 Juillet 2026</span></div>
      <div class="row"><span class="label">Heure:</span> <span class="value">18h00 - 23h00</span></div>
      <div class="row"><span class="label">Lieu:</span> <span class="value">Hôtel Platinum Cocotiers,<br>Douala - Cameroun</span></div>
    </div>

    <div class="theme">
      <span class="label">Thème:</span> Femmes Leaders dans la Supply Chain Africaine — Transformation par l'Innovation
    </div>
  </div>

  <!-- Drapé satin rouge -->
  <div class="ribbon">
    <svg viewBox="0 0 780 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="satin1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#5c1414"/>
          <stop offset="35%" stop-color="#a8312f"/>
          <stop offset="55%" stop-color="#d9685c"/>
          <stop offset="75%" stop-color="#8a2424"/>
          <stop offset="100%" stop-color="#4a1010"/>
        </linearGradient>
        <linearGradient id="satin2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#3a0d0d"/>
          <stop offset="50%" stop-color="#c9544a"/>
          <stop offset="100%" stop-color="#6e1c1c"/>
        </linearGradient>
      </defs>
      <path d="M-50,40 C150,160 350,-20 560,90 C650,135 720,110 830,150
               L830,300 L-50,300 Z" fill="url(#satin1)" opacity="0.95"/>
      <path d="M-50,110 C200,230 300,40 520,150 C630,205 700,170 830,210
               L830,300 L-50,300 Z" fill="url(#satin2)" opacity="0.85"/>
      <path d="M-50,70 C180,190 380,10 600,120 C680,160 740,130 830,170"
               fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
    </svg>
  </div>

  <!-- Pied: numéro de billet + QR code -->
  <div class="footer">
    <div class="ticket-number">${reservationNumber.split('-').pop()}</div>
    <div class="qr-box">
      <img src="${qrCodeUrl}" alt="QR code billet">
    </div>
  </div>
</div>

</body>
</html>`\n"""

new_content = content[:start_idx] + new_html_body + content[end_idx:]

with open('/home/essimbi/.gemini/antigravity/brain/a75f17f6-9031-474a-b704-a6cc4ef17a9d/apps_script_wila.js', 'w') as f:
    f.write(new_content)

