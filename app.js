(function () {
  var C = window.YC || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var month = new Date().toLocaleString("en-US", { month: "long" });

  /* ---------- Meta Pixel ---------- */
  if (C.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq("init", C.META_PIXEL_ID); fbq("track", "PageView");
  }
  var track = function (ev, p) { try { window.fbq && fbq("track", ev, p || {}); } catch (e) {} };

  /* ---------- UTM / attribution ---------- */
  var qs = new URLSearchParams(location.search), attr = {};
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid"].forEach(function (k) {
    var v = qs.get(k); if (v) { attr[k] = v; try { sessionStorage.setItem("yc_" + k, v); } catch (e) {} }
    else { try { var s = sessionStorage.getItem("yc_" + k); if (s) attr[k] = s; } catch (e) {} }
  });

  /* ---------- Images ---------- */
  $$(".js-img").forEach(function (im) { if (C.IMG && C.IMG[im.dataset.k]) im.src = C.IMG[im.dataset.k]; im.loading = "lazy"; });
  if (C.IMG && C.IMG.night) $("#final").style.backgroundImage = "url('" + C.IMG.night + "')";

  /* ---------- Contact bits ---------- */
  var tel = (C.PHONE || "").replace(/[^\d+]/g, "");
  $$(".js-phone").forEach(function (a) { if (tel) { a.href = "tel:" + tel; a.hidden = false; if (!a.classList.contains("call")) a.textContent = C.PHONE; } });
  $(".js-contact").innerHTML = (C.PHONE ? '<a href="tel:' + tel + '">' + C.PHONE + "</a><br>" : "") + (C.EMAIL ? '<a href="mailto:' + C.EMAIL + '">' + C.EMAIL + "</a><br>" : "");
  $(".js-ig").href = C.INSTAGRAM || "#";
  $(".js-license").textContent = C.LICENSE || "";
  $("#yr").textContent = new Date().getFullYear();

  /* ---------- Scarcity ---------- */
  var total = +C.SPOTS_TOTAL || 0, left = Math.max(0, Math.min(total, +C.SPOTS_LEFT || 0));
  var spotsTxt = total ? (left ? left + " of " + total + " " + (C.SPOTS_LABEL || "free spots left for") + " " + month
                               : "All " + month + " spots are booked. Join the waitlist for next month")
                       : "Limited free 3D design spots each month";
  $("#barText").innerHTML = total && left ? "Only <b>" + left + " of " + total + "</b> free 3D design spots left for " + month + " &middot; <a href='#get' style='color:#fff'>Claim yours</a>" : spotsTxt;
  $$(".js-left").forEach(function (e) { e.textContent = left ? left : "the"; });

  /* ---------- Countdown to month end ---------- */
  function tick() {
    var n = new Date(), end = new Date(n.getFullYear(), n.getMonth() + 1, 1), d = Math.max(0, end - n);
    $("#cd").textContent = Math.floor(d / 864e5);
    $("#ch").textContent = Math.floor(d / 36e5) % 24;
    $("#cm").textContent = Math.floor(d / 6e4) % 60;
    $("#cs").textContent = Math.floor(d / 1e3) % 60;
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Testimonials / Founding clients ---------- */
  var T = C.TESTIMONIALS || [], tw = $("#tWrap");
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s || ""; return d.innerHTML; };
  if (T.length) {
    $("#tEyebrow").textContent = "From SoCal homeowners";
    $("#tTitle").textContent = "Don't take our word for it.";
    tw.className = "tgrid";
    tw.style.textAlign = "left";
    tw.innerHTML = T.map(function (t) {
      return '<div class="tcard reveal"><div class="stars">' + "★★★★★".slice(0, t.stars || 5) + "</div><p>“" + esc(t.text) + '”</p><div class="who">' + esc(t.name) + (t.city ? " <small>· " + esc(t.city) + "</small>" : "") + "</div></div>";
    }).join("");
  } else {
    tw.innerHTML = '<div class="founding" style="text-align:left"><div><h3>The Founding Client offer</h3>' +
      "<p>We're building our portfolio in Southern California, and we'd rather show you real yards than stock photos. Our first homeowners get extra attention in exchange for letting us share their transformation.</p>" +
      "<ul><li>Priority scheduling for your design and consultation</li><li>An extra design revision round</li><li>A professional before-and-after shoot of your finished yard</li></ul></div>" +
      '<div class="fbox"><div class="big">' + (left || "—") + '</div><p style="margin:8px 0 18px">free design spots left for ' + month + '</p><a class="btn block" href="#get">Become a Founding Client</a></div></div>';
  }

  /* ---------- Before/after slider ---------- */
  var ba = $("#ba");
  if (ba) {
    var top = $(".top", ba), h = $(".handle", ba), drag = false;
    var set = function (x) { var r = ba.getBoundingClientRect(), p = Math.max(0, Math.min(100, (x - r.left) / r.width * 100)); top.style.clipPath = "inset(0 0 0 " + p + "%)"; h.style.left = p + "%"; };
    ba.addEventListener("pointerdown", function (e) { drag = true; set(e.clientX); ba.setPointerCapture(e.pointerId); });
    ba.addEventListener("pointermove", function (e) { if (drag) set(e.clientX); });
    ba.addEventListener("pointerup", function () { drag = false; });
    // gentle auto-demo once in view
    new IntersectionObserver(function (es, o) { es.forEach(function (en) { if (en.isIntersecting) { o.disconnect(); var t0 = performance.now(); (function an(t) { var k = (t - t0) / 2200; if (k > 1 || drag) return; var r = ba.getBoundingClientRect(); set(r.left + r.width * (0.5 + 0.32 * Math.sin(k * Math.PI * 2))); requestAnimationFrame(an); })(t0); } }); }, { threshold: .5 }).observe(ba);
  }

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Forms ---------- */
  var tpl = $("#formTpl"), started = false;
  $$(".formslot").forEach(function (slot, fi) {
    slot.appendChild(tpl.content.cloneNode(true));
    var f = $("form", slot);
    $(".js-spots", slot).textContent = spotsTxt;
    $(".js-meter", slot).style.width = total ? Math.round(left / total * 100) + "%" : "60%";
    $$(".chips", slot).forEach(function (g) {
      $$("input", g).forEach(function (inp, i) {
        var id = "f" + fi + "_" + g.dataset.name + "_" + i;
        inp.type = g.dataset.type; inp.name = g.dataset.name; inp.id = id;
        inp.nextElementSibling.setAttribute("for", id);
      });
    });
    f.addEventListener("focusin", function () { if (!started) { started = true; track("InitiateCheckout"); } });
    var s1 = $(".s1", f), s2 = $(".s2", f), bars = $$(".steps span", f);
    $(".js-next", f).onclick = function () {
      if (!f.querySelector("input[name=city]:checked")) { $(".js-err1", f).textContent = "Pick your area so we know you're in our service zone."; return; }
      $(".js-err1", f).textContent = ""; s1.hidden = true; s2.hidden = false; bars[1].classList.add("on");
      $("[name=first_name]", f).focus();
    };
    $(".js-back", f).onclick = function () { s2.hidden = true; s1.hidden = false; bars[1].classList.remove("on"); };

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (n) { var el = f.elements[n]; return el ? (el.value || "").trim() : ""; };
      var phone = g("phone"), email = g("email"), err = $(".js-err2", f);
      if (!g("first_name")) return err.textContent = "Please add your first name.";
      if (phone.replace(/\D/g, "").length < 10) return err.textContent = "Please add a valid mobile number.";
      if (!/^\S+@\S+\.\S+$/.test(email)) return err.textContent = "Please add a valid email.";
      err.textContent = "";
      var lead = {
        first_name: g("first_name"), last_name: g("last_name"), phone: phone, email: email, zip: g("zip"),
        city: (f.querySelector("input[name=city]:checked") || {}).value || "",
        interests: $$("input[name=interests]:checked", f).map(function (i) { return i.value; }).join(", "),
        timeline: g("timeline"),
        sms_consent: f.elements.sms_consent.checked ? "yes" : "no",
        company: g("company"),
        form: fi === 0 ? "hero" : "final", page: location.href, referrer: document.referrer
      };
      for (var k in attr) lead[k] = attr[k];
      var btn = $(".js-submit", f); btn.disabled = true; btn.textContent = "Sending…";
      try { sessionStorage.setItem("yc_lead", JSON.stringify({ first_name: lead.first_name, city: lead.city, email: email, phone: phone })); } catch (x) {}

      var done = function () { location.href = "thank-you.html"; };
      var direct = function () {
        if (!C.GHL_WEBHOOK_URL) return Promise.reject();
        return fetch(C.GHL_WEBHOOK_URL, { method: "POST", mode: "no-cors", body: new URLSearchParams(lead) });
      };
      fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) })
        .then(function (r) { if (!r.ok) throw 0; })
        .catch(direct)
        .then(done)
        .catch(function () { btn.disabled = false; btn.textContent = "Claim My Free 3D Design"; err.textContent = "Something went wrong. Please try again" + (C.PHONE ? " or call " + C.PHONE : "") + "."; });
    });
  });
})();
