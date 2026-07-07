/* ============================================================
   KARAZ HOOKAH LOUNGE — site interactions
   Vanilla JS, no dependencies. Progressive + accessible.
   ============================================================ */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    var setNav = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("no-scroll", open);
    };
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Gallery filter ---------- */
  var filterBar = document.querySelector(".gallery-filter");
  var items = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      filterBar.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      var cat = btn.getAttribute("data-filter");
      items.forEach(function (it) {
        var show = cat === "all" || it.getAttribute("data-cat") === cat;
        it.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  if (lb && items.length) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lightbox__cap");
    var current = 0;
    var lastFocus = null;

    var visibleItems = function () {
      return items.filter(function (it) { return !it.classList.contains("is-hidden"); });
    };
    var show = function (idx) {
      var list = visibleItems();
      if (!list.length) return;
      current = (idx + list.length) % list.length;
      var node = list[current];
      var full = node.getAttribute("data-full");
      if (!full) return;
      var cap = node.getAttribute("data-cap") || "";
      lbImg.src = full;
      lbImg.alt = cap;
      lbCap.textContent = cap;
    };
    // background regions to make inert while the modal is open (keeps SR/keyboard out)
    var pageRegions = function () { return document.querySelectorAll("body > header, body > main, body > footer"); };
    var open = function (node) {
      var list = visibleItems();
      lastFocus = document.activeElement;
      show(list.indexOf(node));
      lb.classList.add("open");
      document.body.classList.add("no-scroll");
      pageRegions().forEach(function (el) { el.setAttribute("inert", ""); });
      lb.querySelector(".lightbox__close").focus();
    };
    var close = function () {
      lb.classList.remove("open");
      document.body.classList.remove("no-scroll");
      pageRegions().forEach(function (el) { el.removeAttribute("inert"); });
      lbImg.src = "";
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (it) {
      it.setAttribute("role", "button");
      it.setAttribute("tabindex", "0");
      var cap = it.getAttribute("data-cap");
      if (cap) it.setAttribute("aria-label", "View photo: " + cap);
      it.addEventListener("click", function () { open(it); });
      it.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(it); }
      });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

    // keep keyboard focus inside the modal while it is open (the dialog has 3 controls)
    var lbFocusables = function () {
      return [
        lb.querySelector(".lightbox__close"),
        lb.querySelector(".lightbox__prev"),
        lb.querySelector(".lightbox__next")
      ].filter(Boolean);
    };
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "Tab") {
        var f = lbFocusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1], active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !lb.contains(active)) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last || !lb.contains(active)) { e.preventDefault(); first.focus(); }
        }
      }
    });
  }

  /* ---------- Highlight today's hours ---------- */
  var today = new Date().getDay(); // 0 = Sun ... 6 = Sat
  var todayRow = document.querySelector('.hours-table tr[data-day="' + today + '"]');
  if (todayRow) todayRow.classList.add("today");

  /* ---------- Menu tabs (ARIA tablist) ---------- */
  var menuTabs = document.querySelector(".menu-tabs");
  if (menuTabs) {
    var tabs = Array.prototype.slice.call(menuTabs.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".menu-panel"));
    var activateTab = function (id, focus) {
      if (!document.getElementById("panel-" + id)) return;
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-tab") === id;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) {
        p.classList.toggle("is-active", p.id === "panel-" + id);
      });
    };
    menuTabs.addEventListener("click", function (e) {
      var b = e.target.closest('[role="tab"]');
      if (!b) return;
      var id = b.getAttribute("data-tab");
      activateTab(id, false);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
    menuTabs.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); activateTab(tabs[n].getAttribute("data-tab"), true); }
    });
    var fromHash = (location.hash || "").replace("#", "");
    if (fromHash) activateTab(fromHash, false);
  }
})();
