document.addEventListener('DOMContentLoaded', () => {

    // Mock Data for Matches
    const matches = [
        {
            series: "T20 World Cup",
            type: "cricket",
            team1: { name: "India", code: "IND", flagColor: "#00509d" },
            team2: { name: "Australia", code: "AUS", flagColor: "#ffbd00" },
            startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
            price: "₹50 Crores"
        },
        {
            series: "Premier League",
            type: "football",
            team1: { name: "Man Utd", code: "MUN", flagColor: "#da291c" },
            team2: { name: "Chelsea", code: "CHE", flagColor: "#034694" },
            startTime: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
            price: "₹5 Crores"
        },
        {
            series: "T20 Blast",
            type: "cricket",
            team1: { name: "Surrey", code: "SUR", flagColor: "#5e3a12" },
            team2: { name: "Kent", code: "KEN", flagColor: "#1d2951" },
            startTime: new Date(Date.now() + 1000 * 60 * 45), // 45 mins from now
            price: "₹1 Crore"
        },
        {
            series: "La Liga",
            type: "football",
            team1: { name: "Real Madrid", code: "RMA", flagColor: "#ffffff" },
            team2: { name: "Barca", code: "BAR", flagColor: "#a50044" },
            startTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours
            price: "₹10 Crores"
        }
    ];

    const matchesContainer = document.getElementById('matchesContainer');
    const modal = document.getElementById('teamModal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Render Function
    function renderMatches(filterType = "all") {
        matchesContainer.innerHTML = "";

        const filteredMatches = filterType === "all"
            ? matches
            : matches.filter(m => m.type === filterType);

        filteredMatches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'match-card';
            // Add click event to open modal
            card.onclick = () => openModal(match);

            card.innerHTML = `
                <div class="match-header">
                    <span class="series-name">${match.series}</span>
                    <span class="notification"><i class="far fa-bell"></i></span>
                </div>
                <div class="match-teams">
                    <div class="team">
                        <div class="team-flag" style="background-color: ${match.team1.flagColor}">${match.team1.code[0]}</div>
                        <span class="team-name">${match.team1.code}</span>
                        <span class="team-short">${match.team1.name}</span>
                    </div>
                    <div class="vs-badge">VS</div>
                    <div class="team">
                        <div class="team-flag" style="background-color: ${match.team2.flagColor}">${match.team2.code[0]}</div>
                        <span class="team-name">${match.team2.code}</span>
                        <span class="team-short">${match.team2.name}</span>
                    </div>
                </div>
                <div class="match-footer">
                    <div class="timer" data-time="${match.startTime}">
                        <i class="far fa-clock"></i> <span>Loading...</span>
                    </div>
                    <div class="prize-pool">${match.price}</div>
                </div>
            `;
            matchesContainer.appendChild(card);
        });
    }

    // Modal Logic
    function openModal(match) {
        document.getElementById('modalMatchSeries').textContent = match.series;
        document.getElementById('modalTeam1').textContent = match.team1.code;
        document.getElementById('modalTeam2').textContent = match.team2.code;
        modal.classList.add('active');
    }

    closeModalBtn.onclick = () => {
        modal.classList.remove('active');
    };

    // Close on click outside
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    // Filter Logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            // Render
            renderMatches(btn.getAttribute('data-filter'));
        });
    });

    // Initial Render
    renderMatches();

    // Slider Logic
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let scrollAmount = 0;
    const cardWidth = 340; // card width + gap

    nextBtn.addEventListener('click', () => {
        const container = document.querySelector('.matches-container-wrapper');
        const maxScroll = matchesContainer.scrollWidth - container.clientWidth;

        scrollAmount += cardWidth;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;

        matchesContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;

        matchesContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // Countdown Logic
    setInterval(() => {
        const timers = document.querySelectorAll('.timer');
        timers.forEach(timer => {
            const startTime = new Date(timer.getAttribute('data-time'));
            const now = new Date();
            const diff = startTime - now;

            if (diff <= 0) {
                timer.querySelector('span').innerText = "LIVE";
                timer.style.color = "#00ff00";
            } else {
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                let timeString = "";
                if (diff > 1000 * 60 * 60 * 24) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    timeString = `${days}d left`;
                } else {
                    timeString = `${hours}h ${minutes}m ${seconds}s`;
                }

                timer.querySelector('span').innerText = timeString;
            }
        });
    }, 1000);
});

 <script src="script.js"></script>