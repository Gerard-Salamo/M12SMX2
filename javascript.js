const navLinks = document.querySelectorAll(".naveg-lat a");
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((l) => l.classList.remove("active"));
            const match = document.querySelector(`.naveg-lat a[href="#${entry.target.id}"]`);
            if (match) match.classList.add("active");
          });
        },
        { threshold: 0.35 }
      );
      document.querySelectorAll("section[id]").forEach((s) => {
        if (s.id !== "projecte") sectionObserver.observe(s);
      });

      const toolsGrid = document.getElementById("toolsGrid");
      if (toolsGrid) {
        toolsGrid.addEventListener("click", (e) => {
          const card = e.target.closest(".tool-card");
          if (!card) return;
          const tool = card.dataset.tool;
          if (tool === "player") {
            document.getElementById("playerModal").classList.add("open");
            return;
          }
          toolsGrid.style.display = "none";
          const panel = document.getElementById("panel-" + tool);
          if (panel) panel.classList.add("active");
        });
      }

      document.querySelectorAll("[data-back]").forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.closest(".tool-panel")?.classList.remove("active");
          toolsGrid.style.display = "";
        });
      });

      document.getElementById("qrBtn")?.addEventListener("click", () => {
        const val = document.getElementById("qrInput").value.trim();
        const out = document.getElementById("qrOutput");
        if (!val) {
          out.innerHTML = `<span style="color:var(--red);font-size:13px">Escriu un enllaç primer</span>`;
          return;
        }
        try {
          new URL(val);
        } catch {
          out.innerHTML = `<span style="color:var(--red);font-size:13px">Escriu un enllaç vàlid (ex: https://exemple.com)</span>`;
          return;
        }
        out.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(val)}" alt="Codi QR">`;
      });

      const calcScreen = document.getElementById("calcScreen");
      document.querySelector(".calc-grid")?.addEventListener("click", (e) => {
        const btn = e.target.closest(".calc-key");
        if (!btn) return;
        const { action, val } = btn.dataset;
        if (action === "digit") calcScreen.value += val;
        else if (action === "op") calcScreen.value += val;
        else if (action === "del") calcScreen.value = calcScreen.value.slice(0, -1);
        else if (action === "clear") calcScreen.value = "";
        else if (action === "eval") {
          try {
            calcScreen.value = Function('"use strict";return (' + calcScreen.value + ")")();
          } catch {
            calcScreen.value = "Error";
          }
        }
      });

      document.addEventListener("keydown", (e) => {
        if (!document.getElementById("panel-calc")?.classList.contains("active")) return;
        if (/^[0-9.]$/.test(e.key)) calcScreen.value += e.key;
        else if (["+", "-", "*", "/"].includes(e.key)) calcScreen.value += e.key;
        else if (e.key === "Enter") document.querySelector('[data-action="eval"]').click();
        else if (e.key === "Backspace") calcScreen.value = calcScreen.value.slice(0, -1);
        else if (e.key === "Escape") calcScreen.value = "";
      });

      const playerModal = document.getElementById("playerModal");
      const barraModal = document.getElementById("barraModal");
      const audioModal = document.getElementById("audioModal");
      const iconaModal = document.getElementById("iconaModal");

      function tancarModal() {
        playerModal.classList.remove("open");
        audioModal.pause();
        audioModal.currentTime = 0;
        barraModal.value = 0;
        iconaModal.classList.remove("fa-pause");
        iconaModal.classList.add("fa-play");
      }

      playerModal?.addEventListener("click", (e) => {
        if (e.target === playerModal) tancarModal();
      });

      document.getElementById("modalClose")?.addEventListener("click", tancarModal);

      document.getElementById("btnTancarModal")?.addEventListener("click", tancarModal);

      document.getElementById("btnPerfil")?.addEventListener("click", () => {
        tancarModal();
        document.getElementById("perfil").scrollIntoView({ behavior: "smooth" });
      });

      audioModal.onloadedmetadata = function () {
        barraModal.max = audioModal.duration;
        barraModal.value = 0;
      };

      audioModal.ontimeupdate = function () {
        barraModal.value = audioModal.currentTime;
      };

      barraModal.oninput = function () {
        audioModal.currentTime = barraModal.value;
      };

      function playPauseModal() {
        if (iconaModal.classList.contains("fa-pause")) {
          audioModal.pause();
          iconaModal.classList.remove("fa-pause");
          iconaModal.classList.add("fa-play");
        } else {
          audioModal.play();
          iconaModal.classList.add("fa-pause");
          iconaModal.classList.remove("fa-play");
        }
      }

      document.getElementById("link-projecte").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll("main > section:not(#projecte)").forEach((s) => (s.style.display = "none"));
        document.getElementById("projecte").style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      document.querySelectorAll(".naveg-lat a").forEach((a) => {
        a.addEventListener("click", function (e) {
          const id = this.getAttribute("href").slice(1);
          if (document.getElementById(id) && id !== "projecte") {
            e.preventDefault();
            document.getElementById("projecte").style.display = "none";
            document.querySelectorAll("main > section:not(#projecte)").forEach((s) => (s.style.display = "block"));
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
          }
        });
      });

      document.querySelectorAll(".btn-outline").forEach((b) =>
        b.addEventListener("click", (e) => e.preventDefault())
      );